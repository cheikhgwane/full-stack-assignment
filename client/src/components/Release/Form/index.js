import React, { useState } from "react";
import { ReactComponent as CheckIcon } from "../../../assets/checkmark_icon.svg";

export default function ReleaseForm({ release, onSave }) {
  const [state, setState] = useState();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState((state) => ({ ...state, [name]: value }));
  };

  return (
    <form>
      <div className="form_group">
        <div className="form_item">
          <label htmlFor="name"> Release</label>
          <input
            name="name"
            id="name"
            placeholder="Release name"
            type="text"
            onChange={handleChange}
            defaultValue={release && release.name}
          />
        </div>
        <div>
          <label htmlFor="date"> Date</label>
          <input
            name="date"
            onChange={handleChange}
            id="date"
            type="text"
            defaultValue={release && release.date}
          />
        </div>
      </div>
      <div>{release ? release.steps.map((step, index) => <p></p>) : ""}</div>
      <div className="form_footer">
        <div>
          <label htmlFor="name"> Additional remarks / tasks</label>
          <textarea
            rows={10}
            cols={30}
            name="name"
            id="name"
            type="text"
            onChange={handleChange}
            defaultValue={release && release.name}
          />
        </div>
        <div className="submit">
          <button className="blue_button icon_button">
            Save
            <span style={{ marginLeft: 5 }}>
              <CheckIcon />
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
