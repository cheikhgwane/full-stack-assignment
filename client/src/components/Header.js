import React from "react";
import { Link } from "react-router-dom";

export default function Header({ text, render }) {
  return (
    <div className="table_header">
      <Link to="/">
        <p style={{ marginTop: "10" }}> All Releases {text && ">"}</p>
      </Link>
      <p>{text}</p>
      {render}
    </div>
  );
}
