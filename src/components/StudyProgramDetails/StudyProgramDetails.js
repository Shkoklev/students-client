import './StudyProgramDetails.css';
import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import { Redirect } from 'react-router';
import Error from "../Error/Error";
import {getStudentsByStudyProgram} from "../../repository/studentsApi";
import {deleteStudyProgramById, getStudyProgramById, updateStudyProgram} from "../../repository/studyProgramsApi";

class StudyProgramDetails extends Component {

    constructor(props) {
        super(props);
        this.state= {
            studyProgram: {},
            students: [],
            redirect: false,
            studyProgramNotFound: false,
            studyProgramNotFoundMessage: "",
            validationMessage: ""
        };
    }

    onFormSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();
        this.updateStudyProgram({
            id: this.state.studyProgram.id,
            name: formSubmitEvent.target.name.value
        });
    };

    render() {

        if(this.state.redirect) {
            return <Redirect to="/study_programs" exact/>;
        }

        if(this.state.studyProgramNotFound) {
            return <Error studyProgramNotFound={this.state.studyProgramNotFoundMessage} />
        }


        const students = this.getStudentsMappedInList();

        return (
            <div id="form-wrapper" className="list-group-item">
                <form onSubmit={this.onFormSubmit}>

                    <div id="top-div" className="form-group">
                        <label htmlFor="FirstName">Name: {this.state.studyProgram.name}</label>
                        
                        <div className="input-group">
                            <input type="text" className="form-control" name="name" id="name"
                                   autoComplete="off"
                                   placeholder="Edit name"/>
                        </div>
                    </div>

                    { this.state.validationMessage &&
                    <h5 className="text-danger">{this.state.validationMessage}</h5>
                    }

                    { this.state.students.length>0 &&
                    <div className="form-group">
                        <label htmlFor="FirstName">Students: </label>
                        <div className="input-group">
                            <ul>
                                {students}
                            </ul>
                        </div>
                    </div>
                    }

                    <div id="kopce-div" className="form-group row">
                        <div className="col-md-4">
                            <NavLink to="/study_programs" style={{ textDecoration: 'none' }}>
                                <button className="btn btn-primary btn-lg">Back to List</button>
                            </NavLink>
                        </div>
                        <div className="col-md-6 offset-2">
                            <button type="submit" className="btn btn-secondary btn-lg kopce">Submit</button>
                            <button onClick={this.deleteStudyProgramById} type="button"  className="btn btn-danger btn-lg kopce">Delete</button>
                        </div>
                    </div>

                </form>
            </div>
        )
    }

    componentDidMount() {
        this.loadStudyProgram();
        this.loadStudents();
    }

    getStudentsMappedInList = () => {
        if(this.state.students.length > 0) {
            return this.state.students
                .map((student,index) => {
                    return <li key={index} value={student.name}>{student.name} {student.lastName}</li>
                });
        }
    };

    loadStudyProgram = () => {
        let id = this.props.match.params.id;
        getStudyProgramById(id)
            .then(response => {
                if(!response.ok) {
                    throw response
                }
                return response.json()
            })
            .then((data) => {
                this.setState({
                    studyProgram: data
                });
            })
            .catch( err => {
                err.text().then( errorMessage => {
                    const bodyAsJson = JSON.parse(errorMessage);
                    const message = bodyAsJson.message;
                    console.log(message);
                    this.setState({
                        studyProgramNotFound: true,
                        studyProgramNotFoundMessage: message
                    });

                })
            });
    };

    loadStudents = () => {
        let id = this.props.match.params.id;
        getStudentsByStudyProgram(id)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    students: data
                });
            });
    };

    deleteStudyProgramById = () => {
        let id = this.props.match.params.id;
        deleteStudyProgramById(id)
            .then((response) => {
                if(!response.ok) {
                    throw response
                }
                this.setState({
                    redirect: true
                });
            })
            .catch( err => {
                err.text().then( errorMessage => {
                    const bodyAsJson = JSON.parse(errorMessage);
                    const message = bodyAsJson.message;
                    this.setState({
                        validationMessage: message
                    });
                })
            });
    };

    updateStudyProgram = (studyProgram) => {
        updateStudyProgram(studyProgram)
            .then(response => {
                if(!response.ok) {
                    throw response
                }
                return response.json()
            })
            .then((data) => {
                this.setState({
                    studyProgram: data
                });
            })
            .catch( err => {
                err.text().then( errorMessage => {
                    const bodyAsJson = JSON.parse(errorMessage);
                    const message = bodyAsJson.message;
                    this.setState({
                        validationMessage: message
                    });

                })
            });
    }
}

export default StudyProgramDetails;