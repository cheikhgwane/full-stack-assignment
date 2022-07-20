import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import NewRelease from "./NewRelease";
import ReleaseListView from "./ReleaseListView";
import ReleaseView from "./ReleaseView";

export default function ReleaseApp() {
  return (
    <div className="home_view">
      <div className="home_view_header">
        <h1>ReleaseCheck</h1>
        <p>Your all-in-one release checklist tool</p>
      </div>
      <div className="home_view_content">
        <Routes>
          <Route path="/" element={<ReleaseListView />} />
          <Route path="/release/:id" element={<ReleaseView />} />
          <Route path="/create" element={<NewRelease />} />
        </Routes>
      </div>
    </div>
  );
}
