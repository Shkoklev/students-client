import React, { Component } from 'react';
import './App.css';
import StudentsList from "../StudentsList/StudentsList";
import StudentDetails from "../StudentDetails/StudentDetails";
import AddNewStudent from "../AddNewStudent/AddNewStudent";
import StudyProgramsList from "../StudyProgramsList/StudyProgramsList"
import StudyProgramDetails from "../StudyProgramDetails/StudyProgramDetails"
import Header from "../Header/Header";
import Error from "../Error/Error";
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import AddNewStudyProgram from "../AddNewStudyProgram/AddNewStudyProgram";
//const _ = require('lodash');

class App extends Component {

  render() {

    return (

        <BrowserRouter>
          <div className="container">

               <Header/>

              <div className="pozadina">
                   <Switch>
                       <Redirect from ="/" to="/students" exact/>
                       <Route path='/students' component={StudentsList} exact />
                       <Route path='/students/addNewStudent' component={AddNewStudent} exact />
                       <Route path='/students/:index' component={StudentDetails} exact />
                       <Route path='/study_programs' component={StudyProgramsList} exact />
                       <Route path='/study_programs/addNewStudyProgram' component={AddNewStudyProgram} exact />
                       <Route path='/study_programs/:id' component={StudyProgramDetails} exact />
                       <Route render={(props) => <Error {...props} pathDoesNotExist="Error: Path does not exist!" /> } />
                   </Switch>
              </div>

          </div>
        </BrowserRouter>

    );
  }

}

export default App;

