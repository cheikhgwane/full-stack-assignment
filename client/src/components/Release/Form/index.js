import React, { useState } from "react";
import { ReactComponent as CheckIcon } from "../../../assets/checkmark_icon.svg";
import { ThreeDots } from "react-loader-spinner";
import { CREATE_RELEASE } from "../../../graphql/mutations";
import { useMutation } from "@apollo/client";

export default function ReleaseForm({ release, onSave }) {
  const [state, setState] = useState({
    name: null,
    date: null,
    loading: false,
  });

  const [AddRelease, { data, loading, error }] = useMutation(CREATE_RELEASE);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState((state) => ({ ...state, [name]: value }));
  };

  const handleSave = (event) => {
    const { loading, ...formValues } = state;
    setState((state) => ({ ...state, loading: true }));
    AddRelease({ variables: { release: formValues } }).then((res) => {
      onSave(res);
    });
  };

  const displayError = (message) => {
    window.alert(message);
    window.location.reload();
  };

  if (error) return displayError(error.message);

  return loading ? (
    <ThreeDots className="loader" color="#337ab7" height={60} width={60} />
  ) : (
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
