import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import {addStudent} from "../../repository/studentsApi";
import {getStudyPrograms} from "../../repository/studyProgramsApi";
import './AddNewStudent.css';
import { Redirect } from 'react-router';

class AddNewStudent extends Component {

    constructor(props) {
        super(props);
        this.state= {
            studyPrograms: [],
            redirect: false,
            indexForRedirect: null,
            validationMessage: ""
        };
    }

    onFormSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();

        this.addStudent({
            index: formSubmitEvent.target.index.value,
            name: formSubmitEvent.target.firstName.value,
            lastName: formSubmitEvent.target.lastName.value,
            studyProgramName: formSubmitEvent.target.studyProgram.value
        });

    };

    render() {

        if(this.state.redirect) {
            const url = `/students/${this.state.indexForRedirect}`;
            return <Redirect to={url} />;
        }

        const studyProgramOptions = this.getStudyProgramsOptions();

        return (

            <div id="form-wrapper" className="list-group-item">
                <form onSubmit={this.onFormSubmit}>

                    <div id="avatar">
                        <span><i className="fa fa-user fa"></i></span>
                    </div>

                    { this.state.validationMessage &&
                        <h5 className="text-danger">{this.state.validationMessage}</h5>
                    }

                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" className="form-control" name="firstName" id="FirstName"
                                   autoComplete="off"
                                   placeholder="Enter First Name"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" className="form-control" name="lastName" id="LastName" autoComplete="off"
                                   placeholder="Enter Last Name"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" className="form-control" name="index" id="Index" autoComplete="off"
                                   placeholder="Enter Index"/>
                        </div>
                    </div>

                    {this.state.studyPrograms &&
                    <div className="form-group row">
                        <label className="col-md-4 pt-1" htmlFor="StudyProgram">Study Program:</label>
                        <div className="col-md-8">
                            <select className="form-control" name="studyProgram" id="StudyProgram">
                                {studyProgramOptions}
                            </select>
                        </div>
                    </div>
                    }

                    <div id="kopce-div" className="form-group row">
                        <div className="col-md-4 pt-1">
                            <NavLink to="/students" style={{ textDecoration: 'none' }}>
                                <button className="btn btn-primary btn-lg">Back to List</button>
                            </NavLink>
                        </div>
                        <div className="col-md-4 offset-4">
                            <button  type="submit" className="btn btn-primary btn-lg kopce">Create</button>
                        </div>
                    </div>

                </form>
            </div>
        );
    }

    componentDidMount() {
        this.loadStudyPrograms();
    }

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

    addStudent = (student) => {
        addStudent(student)
            .then(response => {
                if(!response.ok) {
                    throw response
                }
                this.setState({
                    redirect: true,
                    indexForRedirect: student.index
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
};

export default AddNewStudent;