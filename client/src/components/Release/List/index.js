import React from "react";
import { ReactComponent as ViewIcon } from "../../../assets/view_icon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/delete_icon.svg";
import "./index.css";
import { Link } from "react-router-dom";

export default function ReleaseList({ columns, releases, onViewClick, onDeleteClick }) {
  return (
    <table>
      <thead>
        <tr>{columns && columns.map((column, id) => <th key={id}> {column}</th>)}</tr>
      </thead>
      <tbody>
        {releases.map((release, id) => (
          <tr key={id}>
            <td>{release["name"]}</td>
            <td>{release["date"]}</td>
            <td>{release["status"]}</td>
            <td>
              <div className="actionButton">
                View
                <Link to={`/release/${release.id}`}>
                  <button className="transparent_button">
                    <ViewIcon />
                  </button>
                </Link>
              </div>
            </td>
            <td>
              <div className="actionButton">
                Delete
                <button className="transparent_button" onClick={() => onDeleteClick(release.id)}>
                  <DeleteIcon />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
