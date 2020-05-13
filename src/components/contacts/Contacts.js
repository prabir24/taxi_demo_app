import React from "react";
import "./Contacts.css";

function Contacts() {
  return (
    <div style={{ marginTop: "60px" }}>
      <div className="container">
        <form
          onSubmit={() => {
            window.alert("Under developing!");
          }}
        >
          {/* <Button
            className="btn-dark"
            color="primary"
            variant="contained"
            onClick={() => {
              window.history.back();
            }}
          >
            Back
          </Button> */}
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your first name.."
          />

          <input
            type="text"
            id="lname"
            name="lastname"
            placeholder="Your last name.."
          />
          <select id="country" name="country">
            <option value="select">--Select Country--</option>
            <option value="bangladesh">Bangladesh</option>
            <option value="india">India</option>
            <option value="sweden">Sweden</option>
          </select>

          <textarea
            id="subject"
            name="subject"
            placeholder="Write your comment.."
            style={{ height: "200" }}
          ></textarea>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default Contacts;
