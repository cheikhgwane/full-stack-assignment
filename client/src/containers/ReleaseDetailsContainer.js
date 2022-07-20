import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ONE_RELEASE } from "../graphql/queries";
import { ReactComponent as DeleteIcon } from "../assets/delete_icon.svg";

import Header from "../components/Header";
import ReleaseForm from "../components/Release/Form";

export default function ReleaseDetailsContainer() {
  const { id } = useParams();
  const [release, setRelease] = useState({});
  const { loading, error, data } = useQuery(GET_ONE_RELEASE, {
    variables: { id },
  });

  useEffect(() => {
    if (!loading && !error) {
      const { release } = data;
      setRelease(release);
    }
  }, [loading]);

  const onDelete = (id) => {
    console.log(id);
  };

  const DeleteButton = () => (
    <button className="blue_button icon_button" onClick={onDelete}>
      Delete
      <span style={{ marginLeft: 5 }}>
        <DeleteIcon />
      </span>
    </button>
  );

  return (
    <div className="release_container">
      <Header text={release && release.name} render={DeleteButton} />
      <div>{release ? <ReleaseForm release={release}></ReleaseForm> : "Loading..."}</div>
    </div>
  );
}
