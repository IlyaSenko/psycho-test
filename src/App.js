import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import UserInfo from './steps/UserInfo';
import Test from './steps/Test';
import Result from './steps/Result';
import Admin from './steps/Admin';
import {getAllStudents} from './actions/index.js'
import './App.css';

class App extends Component {
  componentDidMount() {
    fetch(`/api/studentsdb`)
      .then(response => response.json())
      .then(state => {
        console.log(state)
        this.props.getAllStudents(state)
      })
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={UserInfo} />
            <Route path="/test" component={Test} />
            <Route path="/result" component={Result} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  () => ({}),
  {
    getAllStudents
  }
)(App);
