import React, { Component } from 'react';
import './StudentDetails.css';
import { getStudentByIndex, deleteStudent, updateStudent} from "../../repository/studentsApi";
import { getStudyPrograms } from "../../repository/studyProgramsApi";
import {NavLink} from "react-router-dom";
import { Redirect } from 'react-router';
import Error from "../Error/Error";

class StudentDetails extends Component {

    constructor(props) {
        super(props);
        this.state= {
            student: {},
            studyPrograms: [],
            redirect: false,
            studentNotFound: false,
            studentNotFoundMessage: ""
        };
    }

    onFormSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();
        this.updateStudent({
            index: this.state.student.index,
            name: formSubmitEvent.target.firstName.value,
            lastName: formSubmitEvent.target.lastName.value,
            studyProgramName: this.state.student.studyProgram.name
        });
    };

    render() {

        if(this.state.redirect) {
            return <Redirect to="/students" exact/>;
        }

        const studyProgramOptions = this.getStudyProgramsOptions();

        if(this.state.studentNotFound) {
            return <Error studentNotFound={this.state.studentNotFoundMessage} />
        }

        return (
            <div id="form-wrapper" className="list-group-item">
                <form onSubmit={this.onFormSubmit}>

                    <div id="avatar">
                        <span><i className="fa fa-user fa"></i></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Index">Index: {this.state.student.index}</label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="FirstName">First Name: {this.state.student.name}</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="firstName" id="FirstName"
                                   autoComplete="off"
                                   placeholder="Edit First Name"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="LastName">Last Name: {this.state.student.lastName}</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="lastName" id="LastName"
                                   autoComplete="off"
                                   placeholder="Edit Last Name"/>
                        </div>
                    </div>

                    {this.state.student.studyProgram  && this.state.studyPrograms &&
                    <div className="form-group row">
                        <label className="col-md-4 pt-1" htmlFor="StudyProgram">Study Program:</label>
                        <div className="col-md-8">
                            <select value={this.state.student.studyProgram.name} className="form-control" name="studyProgram" id="StudyProgram"
                            onChange={(e) => this.onStudyProgramChange(e)} >
                                {studyProgramOptions}
                            </select>
                        </div>
                    </div>
                    }
                    <div id="kopce-div" className="form-group row">
                        <div className="col-md-4">
                            <NavLink to="/students" style={{ textDecoration: 'none' }}>
                                <button className="btn btn-primary btn-lg">Back to List</button>
                            </NavLink>
                        </div>
                        <div className="col-md-6 offset-2">
                            <button type="submit" className="btn btn-secondary btn-lg kopce">Submit</button>
                            <button onClick={this.deleteStudentByIndex} type="button"  className="btn btn-danger btn-lg kopce">Delete</button>
                        </div>
                    </div>

                </form>
            </div>

        );
    }

    componentDidMount() {
        this.loadStudent();
        this.loadStudyPrograms();
    }

    onStudyProgramChange(e) {
        let updatedStudent = Object.assign({}, this.state.student);
        updatedStudent.studyProgram.name = e.target.value;
        this.setState({
            student: updatedStudent
        });
    }

    loadStudent = () => {
        let index = this.props.match.params.index;
        getStudentByIndex(index)
            .then(response => {
                if(!response.ok) {
                    throw response
                }
                return response.json()
            })
            .then((data) => {
                this.setState({
                    student: data
                });
            })
            .catch( err => {
                err.text().then( errorMessage => {
                    const bodyAsJson = JSON.parse(errorMessage);
                    const message = bodyAsJson.message;
                    this.setState({
                        studentNotFound: true,
                        studentNotFoundMessage: message
                    });

                })
            });
    };

    loadStudyPrograms = () => {
        getStudyPrograms()
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    studyPrograms: data
                });
            });
    };

    getStudyProgramsOptions = () => {
        return this.state.studyPrograms
            .map((studyProgram,index) => {
                    return <option key={index} value={studyProgram.name}>{studyProgram.name}</option>
            });
    };

    deleteStudentByIndex = () => {
        let index = this.state.student.index;
        deleteStudent(index)
            .then(() => {
                this.setState({
                    redirect: true
                });
            });
    };

    updateStudent = (student) => {
        updateStudent(student)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    student: data
                });
            });
    }
}

export default StudentDetails;