import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ONE_RELEASE } from "../graphql/queries";
import { ReactComponent as DeleteIcon } from "../assets/delete_icon.svg";
import { ThreeDots } from "react-loader-spinner";
import { DELETE_RELEASE, UPDATE_RELEASE } from "../graphql/mutations";
import Header from "../components/Header";
import ReleaseForm from "../components/Release/Form";

export default function ReleaseDetailsContainer() {
  let history = useNavigate();
  const { id } = useParams();
  const [release, setRelease] = useState({});
  const [displayLoader, setDisplayLoader] = useState(true);

  const { loading, error, data } = useQuery(GET_ONE_RELEASE, {
    variables: { id },
  });

  const [updateRelease] = useMutation(UPDATE_RELEASE);
  const [deleteRelease] = useMutation(DELETE_RELEASE);

  useEffect(() => {
    if (!loading && !error) {
      const { release } = data;
      setRelease(release);
      setDisplayLoader(false);
    }
  }, [loading]);

  const onSave = (formValues) => {
    setDisplayLoader(true);
    const steps = formValues.steps.map((step) =>
      Object.assign({}, { name: step.name, state: step.state.toUpperCase() })
    );
    updateRelease({
      variables: { release: { id: formValues.id, info: formValues.info, steps: steps } },
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        alert("An error occured while trying to update release" + error.message);
      });
  };

  const onDelete = (id) => {
    if (window.confirm(`DO you really want to delete release ${id} ?`) == true) {
      setDisplayLoader(true);
      deleteRelease({ variables: { id: id } })
        .then((res) => {
          alert(`Release ${id} successfully deleted`);
          window.location.href = "/";
        })
        .catch((err) => {
          alert("An error occured while trying to delete release" + error.message);
        });
    }
  };

  const DeleteButton = ({ id }) => (
    <button className="blue_button icon_button" onClick={() => onDelete(id)}>
      Delete
      <span style={{ marginLeft: 5 }}>
        <DeleteIcon />
      </span>
    </button>
  );

  return (
    <div className="release_container">
      <Header text={release && release.name} render={<DeleteButton id={release.id} />} />
      <div>
        {displayLoader && !error ? (
          <ThreeDots className="loader" color="#337ab7" height={60} width={60} />
        ) : (
          <ReleaseForm release={release} update={true} onSave={onSave}></ReleaseForm>
        )}
      </div>
    </div>
  );
}
