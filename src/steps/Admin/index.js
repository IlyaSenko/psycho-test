import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import {connect} from 'react-redux';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Link} from 'react-router-dom';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import BounceLoader from "react-spinners/BounceLoader";
import Paper from '@material-ui/core/Paper';
import sections from "../Result/sections.js";
import {postDeleteStudent} from '../../actions'
import "./index.scss";

function createData(date, name, birth, group, course, year, sex, profile, intellect1, intellect2, intellect3, intellect4, intellect5, intellect6, intellect7, intellect8, intellect9, _id) {
  return { date, name, birth, group, course, year, sex, profile, intellect1, intellect2, intellect3, intellect4, intellect5, intellect6, intellect7, intellect8, intellect9, _id };
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
  position: relative;
  top: 40vh;
`;

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.students.map(student => {
        return createData(...Object.values(student.user))
      }),
      courses: [],
      loaded: false
    }
  }

  setData = propes => {
    let list = propes.students.map(student =>  {
      let userData = Object.entries(student.user).map(([key, value]) => {
         return value;
      });
      let pluses = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
      };
      Object.entries(student.sections).map(([number, section]) => {
        let counter = 0
        Object.values(section).map(q => {
          if(q === '+') {
            counter++;
            pluses[number] = counter;
          }
        })
      })
      var sortable = [];
      for (var vehicle in pluses) {
          sortable.push([vehicle, pluses[vehicle]]);
      }
      sortable.sort(function(a, b) {
          return b[1] - a[1];
      });
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
      profile = profile.join(', ')
      let intellects = sortable.map(([number, value]) => {
        return Object.keys(sections[number])[0] + ', ' + value * 10;
      })
      return createData(...userData, profile, ...intellects, student._id)

    })

    let courses = [];

    list.forEach(item => {
      if(courses.find(course => course.course === item.course)) {
        courses = courses.map(course => {
          if(course.course === item.course) {
            return {
              date: item.date,
              course: item.course,
              group: item.group,
              year: item.year,
              quantity: course.quantity + 1,
              itrospective: item.profile.includes('ІНТРОСПЕКТИВНИЙ') ? course.itrospective + 1 : course.itrospective,
              analytic: item.profile.includes('АНАЛІТИЧНИЙ') ? course.analytic + 1 : course.analytic,
              interactive: item.profile.includes('ІНТЕРАКТИВНИЙ') ? course.interactive + 1 : course.interactive
            }
          }
          return course;
        })
      } else {
        courses.push({
          date: item.date,
          course: item.course,
          group: item.group,
          year: item.year,
          quantity: 1,
          itrospective: item.profile.includes('ІНТРОСПЕКТИВНИЙ') ? 1 : 0,
          analytic: item.profile.includes('АНАЛІТИЧНИЙ') ? 1 : 0,
          interactive: item.profile.includes('ІНТЕРАКТИВНИЙ') ? 1 : 0
        })
      }
    })
    courses = courses.map(course => {
      let profiles = {itrospective: course.itrospective, analytic: course.analytic, interactive: course.interactive}
      var toSort = [];
      for (var vehicle in profiles) {
          toSort.push([vehicle, profiles[vehicle]]);
      }
      toSort.sort(function(a, b) {
          return b[1] - a[1];
      });
      toSort = toSort.map(([key, value], ) => {
        if(key === "analytic") {
          return 'АНАЛІТИЧНИЙ, ' + value
        } else if(key === "itrospective") {
          return 'ІНТРОСПЕКТИВНИЙ, ' + value
        } else if(key === "interactive") {
          return 'ІНТЕРАКТИВНИЙ, ' + value
        }
      })
      return {
        ...course,
        profile1: toSort[0],
        profile2: toSort[1],
        profile3: toSort[2]
      }
    })
    this.setState({list, courses})
  }

  componentWillReceiveProps(nextProps) {
    this.setData(nextProps)
    this.setState({loaded: true})
  }

  componentDidMount() {
    if(this.props.students.length) {
      this.setData(this.props)
      this.setState({loaded: true})
    }
  }

  render() {
    if(!this.state.loaded) {
      return (<BounceLoader
          css={override}
          size={150}
          color={"#123abc"}
        />)
    } else return (
      <div className="Admin">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Дата проходження</TableCell>
                <TableCell align="right">Ім’я Прізвище</TableCell>
                <TableCell align="right">Дата народження</TableCell>
                <TableCell align="right">Група </TableCell>
                <TableCell align="right">Курс </TableCell>
                <TableCell align="right">Рік вступу</TableCell>
                <TableCell align="right">Стать</TableCell>
                <TableCell align="right">Інтелектуальний профіль</TableCell>
                <TableCell align="right">Вид інтелекту </TableCell>
                <TableCell align="right">Вид інтелекту </TableCell>
                <TableCell align="right">Вид інтелекту </TableCell>
                <TableCell align="right">Вид інтелекту </TableCell>
                <TableCell align="right">Вид інтелекту </TableCell>
                <TableCell align="right">Вид інтелекту </TableCell>
                <TableCell align="right">Вид інтелекту </TableCell>
                <TableCell align="right">Вид інтелекту </TableCell>
                <TableCell align="right">Вид інтелекту </TableCell>
                <TableCell align="right">Результат </TableCell>
                <TableCell align="right">Видалити </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.list.map((row, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {new Date(row.date).toLocaleDateString('ua-UA')}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{new Date(row.birth).toLocaleDateString('ua-UA')}</TableCell>
                  <TableCell align="right">{row.group}</TableCell>
                  <TableCell align="right">{row.course}</TableCell>
                  <TableCell align="right">{row.year}</TableCell>
                  <TableCell align="right">{row.sex}</TableCell>
                  <TableCell align="right">{row.profile}</TableCell>
                  <TableCell align="right">{row.intellect1}</TableCell>
                  <TableCell align="right">{row.intellect2}</TableCell>
                  <TableCell align="right">{row.intellect3}</TableCell>
                  <TableCell align="right">{row.intellect4}</TableCell>
                  <TableCell align="right">{row.intellect5}</TableCell>
                  <TableCell align="right">{row.intellect6}</TableCell>
                  <TableCell align="right">{row.intellect7}</TableCell>
                  <TableCell align="right">{row.intellect8}</TableCell>
                  <TableCell align="right">{row.intellect9}</TableCell>
                  <TableCell align="right">
                    <Link to={`/result/${row._id}`}> Таблиця</Link>
                  </TableCell>
                  <TableCell align="center">
                    <FontAwesomeIcon onClick={() => this.props.postDeleteStudent({_id: row._id})} icon={faTrash} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Дата проходження</TableCell>
                <TableCell align="right">Курс </TableCell>
                <TableCell align="right">Група </TableCell>
                <TableCell align="right">Рік вступу</TableCell>
                <TableCell align="right">Кількість Студентів</TableCell>
                <TableCell align="right">Інтелектуальний профіль</TableCell>
                <TableCell align="right">Інтелектуальний профіль</TableCell>
                <TableCell align="right">Інтелектуальний профіль</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.courses.map((course, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {new Date(course.date).toLocaleDateString('ua-UA')}
                  </TableCell>
                  <TableCell align="right">{course.course}</TableCell>
                  <TableCell align="right">{course.group}</TableCell>
                  <TableCell align="right">{course.year}</TableCell>
                  <TableCell align="right">{course.quantity}</TableCell>
                  <TableCell align="right">{course.profile1}</TableCell>
                  <TableCell align="right">{course.profile2}</TableCell>
                  <TableCell align="right">{course.profile3}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }

}

export default connect(
  state => ({
    students: state.students
  }),
  {
    postDeleteStudent
  }
)(Admin);
