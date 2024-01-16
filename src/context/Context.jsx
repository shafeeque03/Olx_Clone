import React, { useState } from "react";

export const AuthContext = React.createContext('authccccccc');
export const FirebaseContext = React.createContext('firecontttttt');

export default function Context({ children }) {
  const [user, setUser] = useState("heloo");
  return (
    <AuthContext.Provider value={{ user,setUser }}>{children}</AuthContext.Provider>
  );
}
