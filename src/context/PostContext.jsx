import React, { useState } from "react";

export const PostContext = React.createContext(null);

const Post = ({ children }) => {
  const [postDetails, setPostDetails] = useState(''); // Move useState inside the functional component

  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
};

export default Post;

