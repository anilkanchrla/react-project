
// import React, { useState, useEffect } from "react";
// import { db } from "../../confi/config";
// import { collection, addDoc, getDoc, getDocs } from "firebase/firestore";

// const BuyerDashboard = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     address: "",
//     phone: "",
//     image: ""
//   });


//   // useEffect(() => {
//   //   setShowModal(true);
//   // }, []);

//   const showModel=()=>{
//     setShowModal(true);
//   }

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     alert("Form submitted successfully!");
//     setShowModal(false);
//   };
//   const storeData = async () => {
//     try {
//       await addDoc(collection(db, "buyers"), formData); // save to "buyers" collection
//       alert("Data stored successfully!");
//       setShowModal(false);
//     } catch (error) {
//       console.error("Error storing data:", error);
//       alert("Failed to store data!");
//     }
//   };
//   const showBuyers = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "buyers"));
//       const buyersList = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       showBuyers(buyersList);
//     } catch (error) {
//       console.error("Error fetching buyers:", error);
//     }
//   };

//   return (
//     <div>

//       <h2>Buyer Dashboard</h2>
//       <button onClick={showModel}>fill this sheet</button>  <button onClick={showBuyers}>all buyers</button>


//       {/* Modal */}
//       {showModal && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <div
//             style={{
//               background: "white",
//               padding: "20px",
//               borderRadius: "10px",
//               minWidth: "350px",
//               textAlign: "center",
//             }}
//           >
//             <h2>📝 Buyer Form</h2>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter your name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 style={{ display: "block", margin: "10px auto", padding: "8px", width: "90%" }}
//               />
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Enter your address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//                 style={{ display: "block", margin: "10px auto", padding: "8px", width: "90%" }}
//               />
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Enter your phone number"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//                 style={{ display: "block", margin: "10px auto", padding: "8px", width: "90%" }}
//               />
//               <input type="file"  name="image" placeholder="upload img" required
//               style={{ display: "block", margin: "10px auto", padding: "8px", width: "90%" }} 
//               />
//               <button
//                 type="submit" onClick={storeData}
//                 style={{
//                   padding: "10px 20px",
//                   marginTop: "10px",
//                   backgroundColor: "lightblue",
//                   border: "none",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Submit
//               </button>
//             </form>
//             <button
//               onClick={closeModal}
//               style={{
//                 marginTop: "10px",
//                 backgroundColor: "gray",
//                 color: "white",
//                 border: "none",
//                 padding: "8px 15px",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               Close
//             </button>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BuyerDashboard;





import React, { useState, useEffect } from "react";
import { db } from "../../confi/config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const BuyerDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [buyers, setBuyers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    image: ""
  });

  // read logged in user from localStorage when component mounts
  useEffect(() => {
    try {
      const raw = localStorage.getItem("loggedInUser");
      if (raw) {
        const user = JSON.parse(raw);
        // choose a sensible display name: prefer user.name then email prefix
        const nameFromStorage =
          user?.name ||
          (typeof user?.email === "string" ? user.email.split("@")[0] : "");
        setUserName(nameFromStorage);
        // prefill form name with logged in name
        setFormData((prev) => ({ ...prev, name: nameFromStorage }));
      }
    } catch (err) {
      console.error("Failed to parse loggedInUser from localStorage", err);
    }
  }, []);

  const showModel = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };



  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      // save file temporarily
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };


  // handle form submit -> call storeData
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    await storeData();
  };


  const storeData = async () => {
    try {
      let imageUrl = "";

      if (formData.image) {
        const storage = getStorage();
        const storageRef = ref(storage, `buyers/${Date.now()}_${formData.image.name}`);
        await uploadBytes(storageRef, formData.image);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "buyers"), {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        image: imageUrl, // ✅ store URL instead of File
      });

      alert("Data stored successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error storing data:", error);
      alert("Failed to store data!");
    }
  };


  // fetch all buyers and put into state
  const fetchBuyers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "buyers"));
      const buyersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setBuyers(buyersList);
      // you can also open a modal or render them below
      console.log("buyersList:", buyersList);
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {userName ? (
        <p style={{ fontSize: "18px" }}>
          Welcome Home, <strong>{userName}</strong> 👋
        </p>
      ) : (
        <p>Welcome, guest</p>
      )}

      <div style={{ marginTop: "12px" }}>
        <button onClick={showModel} style={{ marginRight: 8 }}>
          Fill this sheet
        </button>
        <button onClick={fetchBuyers}>All buyers</button>
      </div>

     

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {buyers.map((buyer) => (
          <div
            key={buyer.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px",
              width: "250px",
              background: "#f9f9f9",
              boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{buyer.name}</h3>
            <p><strong>Address:</strong> {buyer.address}</p>
            <p><strong>Phone:</strong> {buyer.phone}</p>

            {buyer.image && (
              <img
                src={buyer.image}
                alt={buyer.name}
                style={{ width: "100%", borderRadius: "8px", marginTop: "10px" }}
              />
            )}

          </div>
        ))}
      </div>


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
            alignItems: "center"
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              minWidth: "350px",
              textAlign: "center"
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
              <input
                type="file"
                name="image"
                placeholder="upload img"
                onChange={handleChange}
                style={{ display: "block", margin: "10px auto", padding: "8px", width: "90%" }}
              />

              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  marginTop: "10px",
                  backgroundColor: "lightblue",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
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
                cursor: "pointer"
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

export default BuyerDashboard;




