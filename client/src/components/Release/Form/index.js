import React, { useEffect, useState } from "react";
import { ReactComponent as CheckIcon } from "../../../assets/checkmark_icon.svg";

export default function ReleaseForm({ release, update, onSave, loading }) {
  const [state, setState] = useState({
    name: release.name,
    date: release.date,
    info: release.info,
    steps: [],
    loading: loading,
  });

  useEffect(() => {
    if (update) {
      const { __typename, ...data } = release;
      setState((state) => ({ ...state, ...data }));
    }
  }, [release]);

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    if (type === "checkbox") {
      let steps = [...state.steps];
      const step = { ...steps[value], state: checked ? "ON" : "OFF" };
      steps[value] = step;
      return setState({ ...state, steps: steps });
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
            disabled={update}
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
            disabled={update}
            defaultValue={release && release.date}
          />
        </div>
      </div>
      <div className="step_container">
        {Object.keys(release).length != 0
          ? release.steps.map((step, index) => {
              return (
                <div className="step" key={index}>
                  <input
                    type="checkbox"
                    name="steps"
                    value={index}
                    defaultChecked={step.state.toLowerCase() === "on"}
                    onChange={handleChange}
                  />
                  <label style={{ fontWeight: "initial", fontSize: 12 }}>{step.name}</label>
                </div>
              );
            })
          : ""}
      </div>
      <div className="form_footer">
        <div>
          <label htmlFor="name"> Additional remarks / tasks</label>
          <textarea
            rows={10}
            cols={30}
            name="info"
            id="name"
            type="text"
            onChange={handleChange}
            defaultValue={release && release.info}
          />
        </div>
        <div className="submit">
          <button
            disabled={update ? false : !state.name || !state.date || !state.steps}
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
