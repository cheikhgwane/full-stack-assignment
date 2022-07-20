import React from "react";
import Header from "../components/Header";
import ReleaseForm from "../components/Release/Form";
import { useNavigate } from "react-router-dom";
import { CREATE_RELEASE } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { ThreeDots } from "react-loader-spinner";

export default function NewReleaseContainer() {
  let history = useNavigate();

  const [AddRelease, { data, loading, error }] = useMutation(CREATE_RELEASE);

  const handleSave = (formValues) => {
    console.log(formValues);
    AddRelease({ variables: { release: formValues } }).then((res) => {
      history("/");
    });
  };

  const displayError = (message) => {
    window.alert(message);
    window.location.reload();
  };

  if (error) return displayError(error.message);

  return (
    <div>
      <Header />
      <div className="release_container">
        {loading ? (
          <ThreeDots className="loader" color="#337ab7" height={60} width={60} />
        ) : (
          <ReleaseForm onSave={handleSave}></ReleaseForm>
        )}
      </div>
    </div>
  );
}
