import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
import HeadBar from "../HeadBar";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PaymentPage() {
  const [items, setItems] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");
  let navigate = useNavigate();

  const validateForm = () => {
    if (cardNumber === "" || expirationDate === "" || cvv === "") {
      toast.error("Please fill in all fields.");
    } else if (!isValidCardNumber(cardNumber)) {
      toast.error("Please enter a valid card number.");
    } else if (!isValidExpirationDate(expirationDate)) {
      toast.error("Please enter a valid expiration date.");
    } else if (!isValidCVV(cvv)) {
      toast.error("Please enter a valid CVV.");
    } else {
      toast.success("Payment successful!");
      navigate("/mycourses");
    }
  };

  const isValidCardNumber = (cardNumber) => {
    const pattern = /^[0-9]{16}$/;
    return pattern.test(cardNumber);
  };

  const isValidExpirationDate = (expirationDate) => {
    const pattern = /^(0[1-9]|1[0-2])\/?(19[8-9]\d|20[0-4]\d|2050)$/;
    return pattern.test(expirationDate);
  };

  const isValidCVV = (cvv) => {
    const pattern = /^[0-9]{3}$/;
    return pattern.test(cvv);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const q = query(collection(firestore, "item")); // Replace 'item' with your collection name
        const querySnapshot = await getDocs(q);
        const itemData = querySnapshot.docs.map((doc) => doc.data());
        setItems(itemData);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="Payment-main">
      <HeadBar className="Headbar" />
      <div className="Payment-sub">
        <div className="Payment-left">Checkout</div>
        <div className="leftpart"></div>
        <div className="middle">
          <div className="container">
            <h2>Payment Details</h2>
            <div className="form-group">
              <label htmlFor="card-number">Card Number</label>
              <input
                type="text"
                id="card-number"
                placeholder="Enter card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="expiration-date">Expiration Date</label>
              <input
                type="text"
                id="expiration-date"
                placeholder="Enter expiration date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="password"
                id="cvv"
                placeholder="Enter CVV"
                value={cvv}
                onChange={(e) => setCVV(e.target.value)}
              />
            </div>
            <button className="btn" onClick={validateForm}>
              OK
            </button>
          </div>
        </div>
        <div className="Payment-right">
          <div className="Payment-right-sub">Summary</div>
          <div className="Payment-right-down">
            {items.map((item) => (
              <div key={item.id}>
                <p className="Selected-course">{item.CourseName}</p>
                <div className="Bill-top">
                  <p className="Org-amt">
                    <div className="line-1">
                      <span className="label">Original Price:</span>&#8377;
                      <span className="Amt">{item.Price}</span>
                    </div>
                    <div className="line-2">
                      <span className="label1">Discounts:</span>&#8377;
                      <span className="Amt">0</span>
                    </div>
                    <hr className="line-divider" />
                    <div className="Total">
                      <span className="label3">Grand Total:</span>&#8377;
                      <span className="Amt">{item.Price}</span>
                    </div>
                    <div className="disclaimer">By completing your purchase you agree to these Terms of Service.</div>
                  </p>
                </div>
                <button className="Buy-btn" onClick={() => validateForm()}>
                  Purchase
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
