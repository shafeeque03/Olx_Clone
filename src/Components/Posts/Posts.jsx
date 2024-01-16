import React, { useContext, useState, useEffect } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../context/Context";
import firebaseApp from "../../firebase/config";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { PostContext } from "../../context/PostContext";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const db = getFirestore(firebaseApp);
  const usersCollection = collection(db, "products");
  const navigate = useNavigate();

  useEffect(() => {
    const data = [];
    getDocs(usersCollection)
      .then((querySnapshot) => {
        // Loop through the documents in the collection
        querySnapshot.forEach((doc) => {
          // Access data in each document using doc.data()
          const userData = doc.data();
          data.push(userData);
        });
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching collection:", error);
      });
  }, []);
  console.log(products);

  const limitedProducts = products.slice(0, 4).reverse();

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {limitedProducts.map((product) => {
            return (
              <div
                className="card"
                key={product.id}
                onClick={() => {
                  setPostDetails(product);
                  navigate("/view");
                }}
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.imgUrl} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map((product) => {
            return (
              <div
                className="card"
                key={product.id}
                onClick={() => {
                  setPostDetails(product);
                  navigate("/view");
                }}
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.imgUrl} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;
