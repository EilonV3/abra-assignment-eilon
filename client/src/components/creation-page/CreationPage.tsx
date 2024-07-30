import { useState } from "react";
// import axios from "axios";
// import { HOST_WITH_PORT } from "../../consts.ts";
import { addNewPlace } from "../../api/api";
// @ts-ignore
import styles from "./CreationPage.module.css";
import { fromAddress, setKey } from "react-geocode";
import { GOOGLE_API_KEY } from "../../consts";
import { Link } from "react-router-dom";
interface ResponseMessage {
  text: string;
  type: string;
}
export const CreationPage: React.FC = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Restaurant");
  const [address, setAddress] = useState("");
  const [responseMessage, setResponseMessage] = useState<ResponseMessage>({
    type: "",
    text: "",
  });
  setKey(GOOGLE_API_KEY);
  const handleInputChange = (setter: any) => (e: any) => {
    setter(e.target.value);
  };

  // @ts-ignore
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let getLat, getLng;
    await fromAddress(address)
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        getLat = lat;
        getLng = lng;
      })
      .catch(console.error);
    const newRequest = {
      name,
      type,
      address: { lat: getLat, lng: getLng },
    };

    try {
      addNewPlace(newRequest);
      // @ts-ignore
      setResponseMessage({
        type: "success",
        text: "Request Created Successfully!",
      });
      // Clear form fields after successful submission
      setName("");
      setType("Restaurant");
      setAddress("");
    } catch (error) {
      setResponseMessage({ type: "error", text: "Error Creating Request" });
      console.error("Error creating request", error);
    }
  };

  return (
    <>
      <h1 className={styles.title}>Add a new place</h1>
      <div className={styles.formcontainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formgroup}>
            <label>Name:</label>
            <input
              type="text"
              maxLength={25}
              value={name}
              onChange={handleInputChange(setName)}
              required
            />
          </div>
          <div className={styles.formgroup}>
            <label>Type:</label>
            <select value={type} onChange={handleInputChange(setType)}>
              <option value="restaurant">Restaurant</option>
              <option value="hotel">Hotel</option>
              <option value="Park">Park</option>
            </select>
          </div>
          <div className={styles.formgroup}>
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={handleInputChange(setAddress)}
              required
            />
          </div>
          <button type="submit" className={styles.submitbutton}>
            Add this place!
          </button>
        </form>
      </div>
      {responseMessage && (
        <div
          className={
            responseMessage.type == "success"
              ? styles.responsemessagesuccess
              : responseMessage.type == "error"
                ? styles.responsemessageerror
                : ""
          }
        >
          {responseMessage.text}
        </div>
      )}
      <Link to="/places" className="welcome-button">
        Show All places!!
      </Link>
    </>
  );
};
