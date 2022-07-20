import React from "react";
import Header from "../components/Header";
import ReleaseForm from "../components/Release/Form";
import { useNavigate } from "react-router-dom";

export default function NewReleaseContainer() {
  let history = useNavigate();
  const onSave = () => {
    history("/");
  };

  return (
    <div>
      <Header />
      <div className="release_container">
        <ReleaseForm onSave={onSave}></ReleaseForm>
      </div>
    </div>
  );
}
