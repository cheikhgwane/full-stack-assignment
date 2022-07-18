import React, { useEffect, useState } from "react";
import ReleaseList from "../components/Release/List";
import { useQuery } from "@apollo/client";
import { ReactComponent as AddIcon } from "../assets/add_icon.svg";
import { GET_RELEASES } from "../graphql/queries";

const columns = ["Release", "Date", "Status", " ", ""];

export default function ReleaseListContainer() {
  const [releaseList, setReleaseList] = useState([]);
  const [displayLoader, setDisplayLoader] = useState(false);
  const { loading, error, data } = useQuery(GET_RELEASES);

  useEffect(() => {
    if (!loading) {
      if (error && Object.keys(error).length !== 0) {
        setDisplayLoader(true);
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
      <div className="table_header">
        <p style={{ marginTop: "10" }}> All Releases</p>
        <button className="blue_button icon_button">
          New release
          <span style={{ marginLeft: 5 }}>
            <AddIcon />
          </span>
        </button>
      </div>

      <div>
        <ReleaseList columns={columns} releases={releaseList}></ReleaseList>
      </div>
    </div>
  );
}
