import React, { useEffect, useContext } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import { AuthContext, FirebaseContext } from "./context/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from "./context/PostContext";

function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const auth = getAuth(firebase);

  useEffect(() => {
    //if the user logged or not showing this 
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUser(user);
      } else {
        // User is signed out.
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "create",
      element: <Create/>,
    },
    {
      path: "view",
      element: <View/>,
    },
  ]);
  return (
<Post>
  <RouterProvider router={router} />
</Post>
  )
}

export default App;
