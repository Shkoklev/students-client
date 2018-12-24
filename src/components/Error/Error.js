import React, { Component } from 'react';
import './Error.css'

class Error extends Component {

    render() {

        const message = this.getMessage();

        return (
            <div className="error">
                <h1>{message}</h1>
            </div>
        );
    }

    getMessage() {
        if(this.props.pathDoesNotExist) {
            return this.props.pathDoesNotExist;
        }
        if(this.props.studentNotFound) {
            return this.props.studentNotFound;
        }
        if(this.props.studyProgramNotFound) {
            return this.props.studyProgramNotFound;
        }
    }
};

export default Error;