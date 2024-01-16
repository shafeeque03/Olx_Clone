import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import FirebaseContext from "../../context/Context";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, getFirestore, addDoc } from "firebase/firestore";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");

  const firebase = useContext(FirebaseContext);
  const db = getFirestore(firebase);

  var uid = "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    let uid; // Declare uid here to make it accessible in the following .then block

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        uid = result.user.uid; // Assign uid here
        return updateProfile(result.user, { displayName: username }); // Return the promise
      })
      .then(() => {
        return addDoc(collection(db, "users"), {
          id: uid, // Use the assigned uid
          username: username,
          number: number,
        });
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
    navigate("/login");
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to={"/login"} className="custom-link">
          Login
        </Link>
      </div>
    </div>
  );
}