import React from "react";
import ReleaseListContainer from "../containers/ReleaseListContainer";

export default function ReleaseListView() {
  return (
    <div className="home_view">
      <div className="home_view_header">
        <h1>ReleaseCheck</h1>
        <p>Your all-in-one release checklist tool</p>
      </div>
      <ReleaseListContainer />
    </div>
  );
}
