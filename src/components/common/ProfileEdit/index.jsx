import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { editProfile } from "../../../api/FirestoreAPI";
import "./index.scss";

export default function ProfileEdit({ onEdit, currentUser }) {
  const [editInputs, setEditInputs] = useState(currentUser);
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
  };

  const updateProfileData = async () => {
    await editProfile(currentUser?.id, editInputs);
    await onEdit();
  };

  return (
    <div className="profile-card">
      <div className="edit-btn">
        <AiOutlineClose className="close-icon" onClick={onEdit} size={25} />
      </div>

      <div className="profile-edit-inputs">
        
        <label>Full Name</label>
        <input
          onChange={getInput}
          className="common-inputs"
          placeholder="Full Name"
          value={editInputs.Fullname}
          name="Fullname"
        />
       <label>Branch</label>
        <input
          onChange={getInput}
          className="common-inputs"
          placeholder="Branch"
          name="Branch"
          value={editInputs.Branch}
        />
        <label>Year of Study</label>
        <input
          onChange={getInput}
          className="common-inputs"
          placeholder="Year of Study"
          name="YOS"
          value={editInputs.YOS}
        />
       <label>Phone</label>
        <input
          onChange={getInput}
          className="common-inputs"
          placeholder="Phone"
          name="phone"
          value={editInputs.phone}
        />
      <label>GitHub</label>
              <input
                onChange={getInput}
                className="common-inputs"
                placeholder="GitHub"
                name="GitHub"
                value={editInputs.GitHub}
       />
       <label>LinkedIn</label>
              <input
                onChange={getInput}
                className="common-inputs"
                placeholder="LinkedIn"
                name="LinkedIn"
                value={editInputs.LinkedIn}
       />
      
      </div>
      
      <div className="save-container">
        <button className="save-btn" onClick={updateProfileData}>
          Save
        </button>
      </div>
    </div>
  );
}
