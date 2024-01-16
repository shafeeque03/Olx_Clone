import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext, FirebaseContext } from "../../context/Context";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import firebaseApp from "../../firebase/config";
import { getStorage } from "firebase/storage";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { nanoid } from 'nanoid'

const Create = () => {
  const storage = getStorage(firebaseApp);

  const firebase = useContext(FirebaseContext);
  const db = getFirestore(firebase);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const date = new Date();

  const handleSubmit = (e) => {
    const storageRef = ref(storage, `image/${image.name}`);
    uploadBytes(storageRef, image)
    getDownloadURL(storageRef)
      .then((imgUrl) => {
        console.log("Image uploaded successfully:", imgUrl);
        //create products fire store
        addDoc(collection(db, "products"), {

          id:nanoid(),
          name,
          category,
          price,
          imgUrl,
          userId: user.uid,
          createdAt: date.toDateString(),

        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  return (
    <Fragment>
      <Header />
      <>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="fname"
            name="Name"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="fname"
            name="category"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="fname"
            name="Price"
          />
          <br />

          <br />
          <img
            src={image ? URL.createObjectURL(image) : "https://thenounproject.com/api/private/icons/2616532/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0"}
            alt="Posts"
            width="200px"
            height="200px"
          ></img>

          <br />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </>
    </Fragment>
  );
};

export default Create;
