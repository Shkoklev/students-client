import React, {  } from 'react';
import './StudentItem.css';

import { NavLink } from 'react-router-dom';

const studentItem = (props) => {

    return (
        <NavLink to={`/students/${props.student.index}`} style={{ textDecoration: 'none' }}>
            <li id="item" className="list-group-item">
                    <div id="red">
                         <h4>{props.student.name} {props.student.lastName}</h4>
                    </div>
            </li>
        </NavLink>
    )
};

export default studentItem;
