import React, { Component } from "react";
import { getOrgUserAction } from "../redux/actions/dataActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Layout from "../components/common/layout";
import UserForm from "../components/user/userForm";
import UserItem from "../components/user/userItem";

class User extends Component {
    state = {
        users: []
    };

    componentDidMount() {
        const {
      user: { token },
            match: {
        params: { orgId, groupId }
      }
    } = this.props;
        this.props.getOrgUserAction(orgId,groupId, token);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.data.organisation !== this.props.data.organisation) {
            this.setState({ users: nextProps.data.organisation.users });
        }
    }

    render() {
        const { users } = this.state;
        console.log("Users===", users)

        return (
            <Layout showHF={true}>
                <div className="container mt-5 px-0">
                    <div className="row">
                        <div className="col-sm-8 mb-5">
                            <h2 className="text-center mb-4">Group Users</h2>
                            <ul className="list-group c-organistionList">
                                {users && users.map(user => {
                                    return (
                                        <li
                                            className="list-group-item"
                                            style={{ border: "none" }}
                                            key={user.userId}
                                        >
                                            <UserItem user={user} />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="col-sm-4">
                            <UserForm />
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    ui: state.ui,
    data: state.data
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ getOrgUserAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);
