import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

let Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>Edit</Link> | <a href="#" onClick={() => props.deleteExercise(props.exercise._id)}>Delete</a>
        </td>
    </tr>
)

export default class ExerciseList extends Component
{
    constructor(props)
    {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        this.exerciseList = this.exerciseList.bind(this);

        this.state = {
            exercise: []
        };
    }

    componentDidMount()
    {
        axios.get('http://localhost:5000/exercise/')
        .then(res => {
            this.setState({
                exercise: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    deleteExercise(id)
    {
        axios.delete('http://localhost:5000/exercise/'+id)
        .then(res => console.log(res.data));

        this.setState({
            exercise: this.state.exercise.filter(el => el._id != id)
        });
    }

    exerciseList()
    {
        return this.state.exercise.map((currentExercise, index) => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={index} />;
        });
    }

    render()
    {
        return(
            <div className="container-fluid">
                <h3 className="container-fluid">Exercise Log</h3>
                <table className="table table-responsive-sm">
                    <thead className="thead-light">
                        <tr>
                            <th>User</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        );
    }
}