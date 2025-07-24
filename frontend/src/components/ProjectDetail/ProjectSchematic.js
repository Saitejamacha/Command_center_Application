import React from "react";
// import { Table } from "@material-ui/core";

const ProjectSchematic = ({ project, sites }) => {
  return (
    <div className="schematic-container">
      <h3>Project Schematic</h3>

      <div className="schematic-grid">
        <div className="schematic-table">
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Engineering & Design</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Land Acquisition</td>
                <td className="completed">100%</td>
              </tr>
              <tr>
                <td>PPA Signed</td>
                <td className="completed">100%</td>
              </tr>
              <tr>
                <td>Permits Secured</td>
                <td className="completed">100%</td>
              </tr>
              <tr>
                <td>Completed</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="development-permitting">
          <h4>Development & Permitting</h4>
          <ul>
            <li className="completed">Land Acquisition (Completed)</li>
            <li>PAP</li>
            <li className="completed">Signed (Completed)</li>
            <li className="completed">Permits Secured (Completed)</li>
          </ul>
        </div>

        <div className="engineering-design">
          <h4>Engineering & Design</h4>
          <ul>
            <li className="completed">Design Approval (Completed)</li>
            <li className="completed">
              Engineering Complete (Grid Connection)
            </li>
            <li>Layout Finalized 75% (July 7)</li>
          </ul>
        </div>
      </div>

      <div className="site-list">
        <h4>Project Sites</h4>
        <ul>
          {sites.map((site) => (
            <li key={site.id}>
              {site.name} - {site.location}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectSchematic;
