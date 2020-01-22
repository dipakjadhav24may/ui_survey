import React from "react";
import * as ROUTE from "../../utils/routes";
import { withRouter } from "react-router-dom";

const UserTable = ({ users, orgId, groupId, history }) => {
  const onClickHandler = user => {
    const singlePageRoute =
      ROUTE.ASSESSMENTS + "/" + user.userId + "/" + orgId + "/" + groupId;
    history.push(singlePageRoute);
  };
  return (
    <table className="table table-striped border-bottom border-right border-left">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user, index) => {
            return (
              <tr key={user.userId} onClick={() => onClickHandler(user)}>
                <th scope="row">{index + 1}</th>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default withRouter(UserTable);
