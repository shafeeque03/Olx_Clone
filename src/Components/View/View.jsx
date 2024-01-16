import { useState, useEffect, useContext } from "react";
import { PostContext } from "../../context/PostContext";
import { FirebaseContext } from "../../context/Context";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import firebaseApp from "../../firebase/config";
import "./View.css";

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    const { userId } = postDetails;

    if (userId) {
      // Check if userId is defined
      const q = query(collection(db, "users"), where("id", "==", userId));

      getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setUserDetails(doc.data());
          });
        })
        .catch((error) => {
          console.error("Error querying documents:", error);
        });
    }
  }, []);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.imgUrl} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails && userDetails.username}</p>
          <p>{userDetails && userDetails.number}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
