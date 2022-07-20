import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_RELEASES } from "../graphql/queries";
import { Link } from "react-router-dom";
import { ReactComponent as AddIcon } from "../assets/add_icon.svg";
import ReleaseList from "../components/Release/List";
import Header from "../components/Header";
import { DELETE_RELEASE } from "../graphql/mutations";

const columns = ["Release", "Date", "Status", " ", ""];

const NewReleaseButton = () => (
  <Link to="/create">
    <button className="blue_button icon_button">
      New release
      <span style={{ marginLeft: 5 }}>
        <AddIcon />
      </span>
    </button>
  </Link>
);

export default function ReleaseListContainer() {
  const [releaseList, setReleaseList] = useState([]);
  const [deleteRelease] = useMutation(DELETE_RELEASE);
  const { loading, error, data } = useQuery(GET_RELEASES);

  const onDelete = (id) => {
    if (window.confirm(`DO you really want to delete release ${id} ?`) == true) {
      deleteRelease({ variables: { id: id } })
        .then((res) => {
          alert(`Release ${id} successfully deleted`);
          window.location.reload();
        })
        .catch((err) => {
          alert("An error occured while trying to delete release" + error.message);
        });
    }
  };

  useEffect(() => {
    if (!loading) {
      if (error && Object.keys(error).length !== 0) {
      } else {
        const { allReleases } = data;
        setReleaseList(preProcessData(allReleases));
      }
    }
  }, [loading]);

  const preProcessData = (data) => {
    return data.map((release) => {
      return {
        id: release.id,
        name: release.name,
        date: release.date,
        status:
          release.status &&
          release.status.substr(0, 1).toUpperCase() + release.status.substr(1).toLowerCase(),
      };
    });
  };
  return (
    <div>
      <Header text={""} render={<NewReleaseButton />} />
      <div>
        <ReleaseList
          columns={columns}
          releases={releaseList}
          onDeleteClick={onDelete}
        ></ReleaseList>
      </div>
    </div>
  );
}
