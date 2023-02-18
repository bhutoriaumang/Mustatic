import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { app } from "../config/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { validateUser } from "../api";
import { actionTypes } from "../context/reducer";
import { LoginBg } from "../assets/video";

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, googleProvider).then((userCred) => {
      setAuth(true);
      window.localStorage.setItem("auth", "true");

      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then((token) => {
            validateUser(token).then((data) => {
              dispatch({
                type: actionTypes.SET_USER,
                user: data,
              });
            });
          });
          navigate("/", { replace: true });
        } else {
          console.log("User is not logged in");
          setAuth(false);
          dispatch({
            type: actionTypes.SET_USER,
            user: null,
          });
          window.localStorage.setItem("auth", "false");
          navigate("/login");
        }
      });
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <video
        src={LoginBg}
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
        <div className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
          <div
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
            onClick={loginWithGoogle}
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
