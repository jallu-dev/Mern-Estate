import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

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
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res
          .cookie("access-token", token, { httpOnly: true })
          .status(201)
          .json(rest);
      } else {
        return next(errHandler(404, "Wrong Credential"));
      }
    }
  } catch (err) {
    next(err);
  }
};

export const google = async (req, res, next) => {
  const { name, email, photo } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = existingUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email,
        password: hashedPassword,
        photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.log("The Error is: " + error);
  }
};
