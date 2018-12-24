import ReactPaginate from 'react-paginate';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './StudyProgramsList.css';
import StudyProgramItem from "../StudyProgramItem/StudyProgramItem";
import {getStudyPrograms} from "../../repository/studyProgramsApi";

class StudyProgramsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            pagesSize: 5,
            studyPrograms: []
        }
    }

    render() {

        const offset = this.state.pageNum * this.state.pagesSize;
        const nextPageOffset = offset + this.state.pagesSize;
        const pageCount = Math.ceil(this.state.studyPrograms.length / this.state.pagesSize);

        const studyPrograms = this.getStudyProgramsPage(offset, nextPageOffset);

        return (
            <div className="lista">
                <h1>Study Programs</h1>
                <ul className="list-group">
                    {studyPrograms}
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
                <div id="add-study-program">
                    <NavLink to="/study_programs/addNewStudyProgram" style={{ textDecoration: 'none' }}>
                        <button className="btn btn-primary btn-lg">
                            Add Study Program
                        </button>
                    </NavLink>
                </div>
            </div>
        )
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
                })
            });
    };

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({pageNum: selected});
    };

    getStudyProgramsPage = (offset, nextPageOffset) => {
        return this.state.studyPrograms
            .map((studyProgram,index) => {
                return <StudyProgramItem studyProgram={studyProgram}
                                    key = {index}
                />
            })
            .filter((task, index) => {
                return index >= offset && index < nextPageOffset;
            });
    };
}

export default StudyProgramsList;