import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login, Home, Dashboard, MusicPlayer } from "./components";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { AnimatePresence } from "framer-motion";
import { shazamSongs, validateUser } from "./api/index";
import { useStateValue } from "./context/StateProvider";
import { actionTypes } from "./context/reducer";
import { motion } from "framer-motion";

function App() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [{ user, isSongPlaying }, dispatch] = useStateValue();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    shazamSongs();
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((token) => {
          validateUser(token).then((data) => {
            try {
              dispatch({
                type: actionTypes.SET_USER,
                user: data,
              });
            } catch (error) {
              console.log(error);
            }
          });
        });
      } else {
        setAuth(false);
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="min-w-[680px] h-auto bg-primary flex justify-center items-center">
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/*" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-0 w-full h-26 inset-x-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex justify-center items-center"
          >
            <MusicPlayer />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}

export default App;
