import React from "react";
import Header from "../components/Header";
import ReleaseForm from "../components/Release/Form";
import { CREATE_RELEASE } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { ThreeDots } from "react-loader-spinner";

export default function NewReleaseContainer() {
  const [AddRelease, { data, loading, error }] = useMutation(CREATE_RELEASE);

  const handleSave = (formValues) => {
    AddRelease({ variables: { release: formValues } }).then((res) => {
      window.location.href = "/";
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
