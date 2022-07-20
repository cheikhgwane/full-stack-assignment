import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ONE_RELEASE } from "../graphql/queries";
import { ReactComponent as DeleteIcon } from "../assets/delete_icon.svg";
import { ThreeDots } from "react-loader-spinner";
import { UPDATE_RELEASE } from "../graphql/mutations";
import Header from "../components/Header";
import ReleaseForm from "../components/Release/Form";

export default function ReleaseDetailsContainer() {
  let history = useNavigate();
  const { id } = useParams();
  const [release, setRelease] = useState({});
  const { loading, error, data } = useQuery(GET_ONE_RELEASE, {
    variables: { id },
  });

  const [updateRelease, { response, updating, updateErrors }] = useMutation(UPDATE_RELEASE);

  useEffect(() => {
    if (!loading && !error) {
      const { release } = data;
      setRelease(release);
    }
  }, [loading]);

  const onSave = (formValues) => {
    const steps = formValues.steps.map((step) =>
      Object.assign({}, { name: step.name, state: step.state.toUpperCase() })
    );
    updateRelease({
      variables: { release: { id: formValues.id, info: formValues.info, steps: steps } },
    })
      .then((res) => {
        history("/");
      })
      .catch((error) => {
        alert("An error occured" + error.message);
        window.location.reload();
      });
  };

  const onDelete = (id) => {
    console.log(id);
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
        {loading && !error ? (
          <ThreeDots className="loader" color="#337ab7" height={60} width={60} />
        ) : (
          <ReleaseForm release={release} update={true} onSave={onSave}></ReleaseForm>
        )}
      </div>
    </div>
  );
}
