import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_RELEASES } from "../graphql/queries";
import { Link } from "react-router-dom";
import { ReactComponent as AddIcon } from "../assets/add_icon.svg";
import ReleaseList from "../components/Release/List";
import Header from "../components/Header";

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
  const { loading, error, data } = useQuery(GET_RELEASES);

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
        <ReleaseList columns={columns} releases={releaseList}></ReleaseList>
      </div>
    </div>
  );
}