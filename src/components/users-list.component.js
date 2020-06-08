import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

let Users = props => (
    <tr>
        <td>{props.user._id}</td>
        <td>{props.user.username}</td>
        <td>
            <Link to={"/edit-user/"+props.user._id}>Edit</Link>
        </td>
    </tr>
)

export default class UsersList extends Component
{
    constructor(props)
    {
        super(props);

        this.usersList = this.usersList.bind(this);

        this.state = {
            users: []
        };
    }

    componentDidMount()
    {
        axios.get('http://localhost:5000/user/')
        .then(res => {
            this.setState({
                users: res.data
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    usersList()
    {
        return this.state.users.map((currentUser, index) => {
            return <Users user={currentUser} key={index} />
        })
    }

    render()
    {
        return(
            <div className="container-fluid">
                <table className="table table-responsive-sm">
                    <thead className="thead-light">
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.usersList()}
                    </tbody>
                </table>
            </div>
        )
    }
}