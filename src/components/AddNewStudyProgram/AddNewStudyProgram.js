import './AddNewStudyProgram.css';
import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import { Redirect } from 'react-router';
import {addStudyProgram} from "../../repository/studyProgramsApi";

class AddNewStudyProgram extends Component {

    constructor(props) {
        super(props);
        this.state= {
            redirect: false,
            idForRedirect: null,
            validationMessage: ""
        };
    }

    onFormSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();

        this.addNewStudyProgram({
            name: formSubmitEvent.target.name.value,
        });

    };

    render() {

        if(this.state.redirect) {
            const url = `/study_programs/${this.state.idForRedirect}`;
            return <Redirect to={url} />;
        }

        return (

            <div id="form-wrapper" className="list-group-item">
                <form onSubmit={this.onFormSubmit}>

                    <h4 id="top-div">Add Study Program: </h4>

                    { this.state.validationMessage &&
                    <h5 className="text-danger">{this.state.validationMessage}</h5>
                    }

                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" className="form-control" name="name" id="name"
                                   autoComplete="off"
                                   placeholder="Enter name"/>
                        </div>
                    </div>


                    <div id="kopce-div" className="form-group row">
                        <div className="col-md-4 pt-1">
                            <NavLink to="/study_programs" style={{ textDecoration: 'none' }}>
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

    addNewStudyProgram = (studyProgram) => {
        addStudyProgram(studyProgram)
            .then(response => {
                if (!response.ok) {
                    throw response
                }
                return response.json()
            }).then((data) => {
                this.setState({
                    redirect: true,
                    idForRedirect: data.id
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

export default AddNewStudyProgram;