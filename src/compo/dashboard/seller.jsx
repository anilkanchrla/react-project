
import React, { useState, useEffect } from "react";
import { db } from "../../confi/config";
import { collection, addDoc, getDoc, getDocs } from "firebase/firestore";

const SellerDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    image: ""
  });

  
  // useEffect(() => {
  //   setShowModal(true);
  // }, []);

  const showModel=()=>{
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
    setShowModal(false);
  };
  const storeData = async () => {
    try {
      await addDoc(collection(db, "buyers"), formData); // save to "buyers" collection
      alert("Data stored successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error storing data:", error);
      alert("Failed to store data!");
    }
  };
  const showBuyers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "buyers"));
      const buyersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      showBuyers(buyersList);
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };

  return (
    <div>

      <h2>Seller Dashboard</h2>
      <button onClick={showModel}>fill this sheet</button>  <button onClick={showBuyers}>all buyers</button>


      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              minWidth: "350px",
              textAlign: "center",
            }}
          >
            <h2>📝 Buyer Form</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ display: "block", margin: "10px auto", padding: "8px", width: "90%" }}
              />
              <input
                type="text"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                required
                style={{ display: "block", margin: "10px auto", padding: "8px", width: "90%" }}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                style={{ display: "block", margin: "10px auto", padding: "8px", width: "90%" }}
              />
              <input type="file"  name="image" placeholder="upload img" required
              style={{ display: "block", margin: "10px auto", padding: "8px", width: "90%" }} 
              />
              <button
                type="submit" onClick={storeData}
                style={{
                  padding: "10px 20px",
                  marginTop: "10px",
                  backgroundColor: "lightblue",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </form>
            <button
              onClick={closeModal}
              style={{
                marginTop: "10px",
                backgroundColor: "gray",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
