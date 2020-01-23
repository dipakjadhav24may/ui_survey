import React, { Fragment } from "react";
import * as ROUTE from "../../utils/routes";
import { withRouter, Link } from "react-router-dom";

const UserTable = ({ users, selectedUsers, onSelectHandler, history }) => {
  return (
    <Fragment>
      <table className="table table-striped border-bottom border-right border-left">
        <thead>
          <tr>
            <th scope="col">
              <div className="form-check">
                <input
                  className="form-check-input position-static"
                  type="checkbox"
                  name={`check-box-all`}
                  id={`user-all`}
                  checked={selectedUsers.length === users.length}
                  onChange={() => onSelectHandler(users, "all")}
                />
              </div>
            </th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => {
              let checked = false;
              let checkedUser = selectedUsers.filter(
                userSL => userSL.userId === user.userId
              );
              if (checkedUser.length) {
                checked = true;
              }
              return (
                <tr key={user.userId}>
                  <th scope="row">
                    <div className="form-check">
                      <input
                        className="form-check-input position-static"
                        type="checkbox"
                        name={`check-box-${user.userId}`}
                        id={`user-${user.userId}`}
                        checked={checked}
                        onChange={() => onSelectHandler(user, "single")}
                      />
                    </div>
                  </th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link to={ROUTE.ASSESSMENTS + "/" + user.userId}>
                      <span>assessments</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default withRouter(UserTable);
