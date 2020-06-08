import React, { Component } from 'react';
import axios from 'axios';

export default class EditUser extends Component
{
    constructor(props)
    {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ''
        };
    }

    componentDidMount()
    {
        axios.get('http://localhost:5000/user/' + this.props.match.params.id)
        .then(res => {
            this.setState({
                username: res.data.username
            });
            console.log(res.data);
        })
        .catch(err => console.log(err));
    }

    onChangeUsername(e)
    {
        this.setState({
            username: e.target.value
        });
        console.log(this.state.username);
    }

    onSubmit(e)
    {
        e.preventDefault();

        const user = {
            username: this.state.username
        };

        axios.post('http://localhost:5000/user/update/' + this.props.match.params.id, user)
        .then(res => {
            window.location='/users';
        })
        .catch(err => console.log(err));
    }

    render()
    {
        return (
            <div className="container-fluid">
                <h3>Edit User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input className="form-control" onChange={this.onChangeUsername} value={this.state.username} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success">Update User</button>
                    </div>
                </form>
            </div>
        )
    }
}