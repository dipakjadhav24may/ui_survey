import React from "react";

const UserTable = ({ users, orgName }) => {
  return (
    <table className="table table-striped border-bottom border-right border-left">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">User Name</th>
          <th scope="col">Organisation Name</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user, index) => {
            return (
              <tr key={user.userId}>
                <th scope="row">{index + 1}</th>
                <td>{"UserName Here"}</td>
                <td>{orgName && orgName}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default UserTable;
