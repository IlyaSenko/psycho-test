import React, { Component } from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {addUserDataSection} from '../../actions/index.js'
import { KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import "./index.scss"

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: Date.now(),
      name: "",
      birth: null,
      group: "",
      course: "",
      year: "",
      sex: ""
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.birth !== null)
    if(Object.values(this.state).every(value => value !== "") && this.state.birth !== null && this.state.birth != 'Invalid Date') {
      let data = this.state;
      delete data.submitted;
      this.props.addUserDataSection(data);
      this.setState({redirect:true});
    } else {
      this.setState({submitted: true})
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleDataChange = birth => {
    this.setState({birth})
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to='/test' />
    }
    return (
      <div className="UserInfo">
        <h1>Визначення множинних інтелектів</h1>
        <h4>(методика Вальтера МакКензі)</h4>
        <form onSubmit={this.handleSubmit} className="UserInfo__form">
          <TextField value={this.state.name} error={this.state.submitted && this.state.name === ""} name="name" onChange={this.handleChange} label="Ім'я і Прізвище" />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              name="birth"
              format="MM/dd/yyyy"
              margin="normal"
              error={this.state.submitted && (this.state.birth === null || this.state.birth == 'Invalid Date')}
              id="date-picker-inline"
              label="Дата народження"
              value={this.state.birth}
              onChange={this.handleDataChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField value={this.state.group} error={this.state.submitted && this.state.group === ""} name="group" onChange={this.handleChange} label="Група" />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Курс</InputLabel>
            <Select
              error={this.state.submitted && this.state.course === ""}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              placeholder="Курс"
              value={this.state.course}
              onChange={this.handleChange}
              name="course"
            >
              <MenuItem value='1'>1</MenuItem>
              <MenuItem value='2'>2</MenuItem>
              <MenuItem value='3'>3</MenuItem>
              <MenuItem value='4'>4</MenuItem>
              <MenuItem value='5'>5</MenuItem>
              <MenuItem value='6'>6</MenuItem>
            </Select>
          </FormControl>
          <TextField value={this.state.year} error={this.state.submitted && this.state.year === ""} name="year" onChange={this.handleChange} label="Рік вступу" />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Стать</InputLabel>
            <Select
              error={this.state.submitted && this.state.sex === ""}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              placeholder="Стать"
              value={this.state.sex}
              onChange={this.handleChange}
              name="sex"
            >
              <MenuItem value='Чоловіча'>Чоловіча</MenuItem>
              <MenuItem value='Жіноча'>Жіноча</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">Підтвердити</Button>
        </form>
      </div>
    );
  }

}

export default connect(
  state => ({
    user: state.user
  }),
  {
    addUserDataSection
  }
)(UserInfo);
