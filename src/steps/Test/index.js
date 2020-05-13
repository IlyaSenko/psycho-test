import React, { Component } from 'react';
import {connect} from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import {updateSection, postUser} from '../../actions/index.js'
import {Redirect} from 'react-router-dom';
import questions from "./questions.js";
import "./index.scss"

function Dropdown(props) {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">+/-</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        placeholder="+/-"
        onChange={props.callback}
        name={props.name}
        value={props.questions[props.name]}
      >
        <MenuItem value='+'>+</MenuItem>
        <MenuItem value='-'>-</MenuItem>
      </Select>
    </FormControl>

  )
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
  position: relative;
  top: 40vh;
`;

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: 1,
      redirect: "forbidden",
      questions: {
          1:"",
          2:"",
          3:"",
          4:"",
          5:"",
          6:"",
          7:"",
          8:"",
          9:"",
          10:""
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user._id !== undefined) {
      this.setState({redirect: "ok"})
    }
  }

  handleSelect = e => {
    let questions = Object.assign({}, this.state.questions);
    questions[e.target.name] = e.target.value;
    this.setState({
      questions
    })

    this.props.updateSection({
      sectionNumber: this.state.section,
      questions: questions
    })
  }

  handleGoBack = () => {
    this.setState({
      section: this.state.section - 1,
      questions: this.props.sections[this.state.section - 1]
    })
  }

  handleSubmit = (e) => {
    if(this.state.section === 9) {
      this.props.postUser({
        user: this.props.user,
        sections: this.props.sections
      })
      this.setState({redirect: "loading"})
    }
    e.preventDefault()
    this.setState({
      section: this.state.section + 1,
      questions: this.props.sections[this.state.section + 1] ?
      this.props.sections[this.state.section + 1] : {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
        10: ""
      }
    })
  }

  render() {
    if(this.props.user.name === undefined) {
      return <Redirect to='/' />
    }
    if(this.state.redirect === "loading") {
      return (<BounceLoader
          css={override}
          size={150}
          color={"#123abc"}
        />)
    } else if (this.state.redirect === "ok"){
      return <Redirect to={`/result/${this.props.user._id}`} />
    } else {
      return (
        <div className="Test">
          <h1>Інструкція: Поставте «+», якщо твердження, яке на Вашу думку найкраще
            Вас описує, або «–», якщо твердження не зовсім Вам відповідає.</h1>
          <h2>Секція № {this.state.section}</h2>
          <form onSubmit={this.handleSubmit}>
            {Object.keys(this.state.questions).map(q => (
              <div className="Test__item">
                <h4>{questions[this.state.section][q]}</h4>
                <Dropdown questions={this.state.questions} name={q} callback={this.handleSelect} />
              </div>
            ))}
            <div className="Test__buttons">
              {this.state.section > 1 ? (
                <Button onClick={this.handleGoBack} variant="contained">Назад</Button>
              ) : null}
              {Object.values(this.state.questions).every(q => q !== "") ? (
                <Button type="submit" variant="contained">{this.state.section === 9 ? "Завершити" : "Уперед"}</Button>
              ) : null}
            </div>
          </form>
        </div>
      );
    }
  }

}
export default connect(
  state => ({
    sections: state.sections,
    user: state.user
  }),
  {
    updateSection,
    postUser
  }
)(Test);
