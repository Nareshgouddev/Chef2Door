
import { useState } from "react";
import contactUs from "../assets/contactUs.png";


const Contact = () => {
  const [message, setMessage] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(true);
  };
  return (
    <div className="contact-page">
      <div className="contact-img-wrapper">
        <img src={contactUs} alt="Contact us" />
      </div>
      <div className="contact-form-wrapper">
        <h1>Contact us</h1>
        <form onSubmit={handleSubmit} className="contact-form">
          <input className="contact-input" type="text" placeholder="Name" required />
          <input className="contact-input" type="email" placeholder="Email" required />
          <textarea className="contact-input" placeholder="Type your Message here..." required></textarea>
          <button className="btn-contact-submit" type="submit">Submit</button>
          {message && (
            <span className="contact-success-msg">Thanks for contacting CHEF:2 DOOR, We will reply ASAP.</span>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;

