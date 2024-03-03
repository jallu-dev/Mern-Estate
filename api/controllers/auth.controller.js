import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errHandler from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    return res.status(201).json("User created successfully");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errHandler(404, "User not found"));
    } else {
      const validPassword = await bcryptjs.compare(
        password,
        validUser.password
      );
      if (validPassword) {
        res.status(201).json("User found");
      } else {
        //res.status(401).json("wrong credentials");
        console.log(next);
        return next(errHandler(404, "Wrong Credential"));
      }
    }
  } catch (err) {
    next(err);
  }
};
