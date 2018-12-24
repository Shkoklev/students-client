import React, { Component } from 'react';
import StudentItem from "../StudentItem/StudentItem";
import ReactPaginate from 'react-paginate';
import {getAllStudents} from "../../repository/studentsApi";
import './StudentsList.css';
import { NavLink } from 'react-router-dom';

class StudentsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            pagesSize: 5,
            students: []
        }
    }

     render() {

        const offset = this.state.pageNum * this.state.pagesSize;
        const nextPageOffset = offset + this.state.pagesSize;
        const pageCount = Math.ceil(this.state.students.length / this.state.pagesSize);

        const students = this.getStudentsPage(offset, nextPageOffset);

         return (

            <div className="lista">
                <h1>Students</h1>
                <ul className="list-group">
                 {students}
                </ul>
                <ReactPaginate previousLabel={"previous"}
                               nextLabel={"next"}
                               breakLabel={<a href="/#">...</a>}
                               breakClassName={"break-me"}
                               pageCount={pageCount}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={this.handlePageClick}
                               containerClassName={"pagination"}
                               subContainerClassName={"pages pagination"}
                               activeClassName={"active"}/>
                <div id="add-student">
                    <NavLink to="/students/addNewStudent" style={{ textDecoration: 'none' }}>
                            <button className="btn btn-primary btn-lg">
                                Add Student
                            </button>
                    </NavLink>
                </div>
            </div>
        )

    }

    componentDidMount() {
        this.loadStudents();
    }

    loadStudents = () => {
        getAllStudents()
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    students: data
                })
            });
    };

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({pageNum: selected});
    };

    getStudentsPage = (offset, nextPageOffset) => {
        return this.state.students
            .map((student,index) => {
                return <StudentItem student={student}
                                    key = {index}
                                 />
            })
            .filter((task, index) => {
                return index >= offset && index < nextPageOffset;
            });
    };
}

export default StudentsList;