import React, { useState } from "react";
import { ReactComponent as CheckIcon } from "../../../assets/checkmark_icon.svg";

export default function ReleaseForm({ release, onSave, loading }) {
  const [state, setState] = useState({
    name: null,
    date: null,
    loading: loading,
  });

  const handleChange = ({ target }) => {
    const { name, value, type } = target;
    if (type === "checkbox") {
    }
    setState((state) => ({ ...state, [name]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    setState((state) => ({ ...state, loading: true }));
    const { loading, ...formValues } = state;
    onSave(formValues);
  };

  return (
    <form>
      <div className="form_group">
        <div className="form_item">
          <label htmlFor="name"> Release</label>
          <input
            name="name"
            id="name"
            required
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
            min={new Date().toISOString().split("T")[0]}
            type="date"
            defaultValue={release && release.date}
          />
        </div>
      </div>
      <div>
        {release
          ? release.steps.map((step, index) => (
              <input
                key={index}
                type="checkbox"
                checked={step.state.toLowerCase() === "on"}
                name={step.name}
                onChecked={handleChange}
              />
            ))
          : ""}
      </div>
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
          <button
            disabled={!state.name || !state.date}
            className="blue_button icon_button"
            onClick={handleSave}
          >
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
