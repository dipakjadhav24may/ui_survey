import React from "react";
import * as ROUTE from "../../utils/routes";
import {withRouter} from 'react-router-dom';

const GroupTable = ({ groups, orgName,orgId,history }) => {
   const onClickHandler = group => {
    const singlePageRoute = ROUTE.USERS + "/" + orgId+"/"+group.groupId;
    history.push(singlePageRoute);
  };
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
              <tr key={group.groupId} onClick={()=>onClickHandler(group)}>
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

export default withRouter(GroupTable);
