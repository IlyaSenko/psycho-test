import React, { Component } from 'react';
import Chart from 'chart.js';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import BarChart from './BarChart';
import sections from "./sections.js";
import { css } from "@emotion/core";
import {Link} from 'react-router-dom'
import BounceLoader from "react-spinners/BounceLoader";
import {clearData} from '../../actions/index.js'
import "./index.scss"

const colorsToPick = {
  1: 'red',
  2: 'orange',
  3: 'yellow',
  4: 'green',
  5: 'blue',
  6: 'pink',
  7: 'purple',
  8: 'black',
  9: 'aquamarine'
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
  position: relative;
  top: 40vh;
`;

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      sortable: [],
      colors: [],
      profile: [],
      student: {}
    }
  }

  sortSections = () => {
    var sortable = [];
    let toSort = this.state;
    delete toSort.sortable;
    delete toSort.colors;
    delete toSort.profile;
    delete toSort.student;
    for (var vehicle in toSort) {
        sortable.push([vehicle, toSort[vehicle]]);
    }
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    let colors = sortable.map(([name, number]) => colorsToPick[name]);
    let highest = [];
    sortable.map((item, i) => {
      if(i === 0) {
        highest.push(item)
      } else {
        if (item[1] === highest[0][1]) highest.push(item)
      }
    })
    let profile = []
    highest.map(([name, number]) => {
      if((name === '4' || name === '8' || name === '9') && profile.indexOf('ІНТРОСПЕКТИВНИЙ') < 0) {
        profile.push('ІНТРОСПЕКТИВНИЙ')
      } else if ((name === '3' || name === '2' || name === '1') && profile.indexOf('АНАЛІТИЧНИЙ') < 0) {
        profile.push('АНАЛІТИЧНИЙ')
      } else if ((name === '7' || name === '6' || name === '5') && profile.indexOf('ІНТЕРАКТИВНИЙ') < 0) {
        profile.push('ІНТЕРАКТИВНИЙ')
      }
    })

    this.setState({sortable, colors, profile})
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.students)
    let student = nextProps.students.find(stud => {
      console.log(stud._id, nextProps.location.pathname.replace('/result/', ''))
      if(stud._id === nextProps.location.pathname.replace('/result/', '')) return true;
    })
    this.setState({student});
    console.log(student);
    Object.entries(student.sections).map(([number, section]) => {
      let counter = 0
      Object.values(section).map(q => {
        if(q === '+') {
          counter++;
          this.setState({[number]: counter}, () => {
              this.sortSections();
          })
        }
      })
    })
  }

  componentDidMount() {
    if(this.props.students.length) {
      let student = this.props.students.find(stud => {
        console.log(stud._id, this.props.location.pathname.replace('/result/', ''))
        if(stud._id === this.props.location.pathname.replace('/result/', '')) return true;
      })
      this.setState({student});
      console.log(student);
      Object.entries(student.sections).map(([number, section]) => {
        let counter = 0
        Object.values(section).map(q => {
          if(q === '+') {
            counter++;
            this.setState({[number]: counter}, () => {
                this.sortSections();
            })
          }
        })
      })
    }
  }

  render() {
    if(!this.props.students.length) {
      return (<BounceLoader
          css={override}
          size={150}
          color={"#123abc"}
        />)
    } else return (
      <div className="Result">
        <h1>{this.state.profile.map((profile, i) => {
          if(i === 0) {
            return profile
          } else if(i === 1) {
            return ', ' + profile
          } else return ' та ' + profile
        })} ІНТЕЛЕКТУАЛЬН{this.state.profile.length > 1 ? 'І' : 'ИЙ'} ПРОФІЛ{this.state.profile.length > 1 ? 'І' : 'Ь'}</h1>
        <BarChart
          labels={this.state.sortable.map(([name, number]) => name)}
          data={this.state.sortable.map(([name, number]) => number * 10)}
          colors={this.state.colors}
        />
        <div className="Result__sections">
          {this.state.sortable.map(([name, number]) => (
            <div className="Result__sections__item">
              <div className="Result__sections__item__color" style={{'backgroundColor': colorsToPick[name]}}>{name}</div>
              <div className="Result__sections__item__text">
                <p><span>{Object.keys(sections[name])[0]} </span>
                – {Object.values(sections[name])[0]}</p>
              </div>
            </div>
          ))}
        </div>
        <Button variant="contained" className="Result__restart" onClick={this.props.clearData}>
          <Link to="/">Пройти ще раз</Link>
        </Button>
      </div>
    );
  }

}

export default connect(
  state => ({
    students: state.students,
    sections: state.sections
  }),
  {clearData}
)(Result);
