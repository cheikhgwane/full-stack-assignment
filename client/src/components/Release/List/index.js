import React from "react";
import { ReactComponent as ViewIcon } from "../../../assets/view_icon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/delete_icon.svg";
import "./index.css";

export default function ReleaseList({ columns, releases, onViewClick, onDeleteClick }) {
  return (
    <table celled>
      <thead>{columns && columns.map((column, id) => <th key={id}> {column}</th>)}</thead>
      <tbody>
        {releases.map((release, id) => (
          <tr key={id}>
            <td>{release["name"]}</td>
            <td>{release["date"]}</td>
            <td>{release["status"]}</td>
            <td>
              <div className="actionButton">
                View
                <button className="transparent_button" onClick={() => onViewClick(release.id)}>
                  <ViewIcon />
                </button>
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
