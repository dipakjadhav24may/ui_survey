import React from "react";

const GroupTable = ({ groups, orgName }) => {
  return (
    <table className="table table-striped border-bottom border-right border-left">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Group Name</th>
          <th scope="col">Organisation Name</th>
        </tr>
      </thead>
      <tbody>
        {groups &&
          groups.map((group, index) => {
            return (
              <tr key={group.groupId}>
                <th scope="row">{index + 1}</th>
                <td>{group.groupName}</td>
                <td>{orgName && orgName}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default GroupTable;
