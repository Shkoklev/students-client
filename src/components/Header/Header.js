import React, {  } from 'react';
import './Header.css';
import {NavLink} from "react-router-dom";

const header = (props) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <div className="navbar-header">
                    <p className="navbar-brand"><span className="fa fa-graduation-cap fa-2x"></span>FINKI</p>
                </div>
                <ul className="nav">
                    <NavLink to="/students" style={{ textDecoration: 'none' }}>
                      <li>Students</li>
                    </NavLink>
                    <NavLink to="/study_programs" style={{ textDecoration: 'none' }}>
                        <li>Study Programs</li>
                    </NavLink>
                </ul>
            </div>
        </nav>
    );

};

export default header;