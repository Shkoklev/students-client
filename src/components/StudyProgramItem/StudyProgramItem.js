import './StudyProgramItem.css';
import React, {  } from 'react';

import { NavLink } from 'react-router-dom';

const studyProgramItem = (props) => {

    return (
        <NavLink to={`/study_programs/${props.studyProgram.id}`} style={{ textDecoration: 'none' }}>
            <li id="item" className="list-group-item">
                <div id="red">
                    <h4>{props.studyProgram.name}</h4>
                </div>
            </li>
        </NavLink>
    )
};

export default studyProgramItem;