import React from "react";
import { Link } from "react-router-dom";

export default function Header({ text, render }) {
  return (
    <div className="table_header">
      <div>
        <Link to="/">
          <p style={{ marginTop: "10" }}>All Releases</p>
        </Link>
        <span>{text && ">" + text}</span>
      </div>

      <div className="table_button">{render}</div>
    </div>
  );
}
