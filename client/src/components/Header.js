import React from "react";
import { Link } from "react-router-dom";

export default function Header({ text, render }) {
  return (
    <div className="table_header">
      <Link to="/">
        <p style={{ marginTop: "10" }}>
          All Releases <span style={{ textDecoration: "None" }}>{text && ">" + text}</span>
        </p>
      </Link>
      <div className="table_button">{render}</div>
    </div>
  );
}
