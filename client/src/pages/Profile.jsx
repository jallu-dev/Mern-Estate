import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const onSignOutHandler = () => {
    dispatch(signOut());
    navigate("/sign-in");
  };
  console.log(currentUser);
  return (
    <div>
      {!currentUser ? (
        navigate("/sign-in")
      ) : (
        <button type="button" onClick={onSignOutHandler}>
          SignOut
        </button>
      )}
    </div>
  );
}
