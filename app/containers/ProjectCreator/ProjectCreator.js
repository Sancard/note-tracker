import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as styles from './ProjectCreator.css';
import NoteButton from '../../components/NoteButton/NoteButton';
import { guidGenerator } from '../../utils/utilities';
import { projectNewProject } from '../../store/actions';

class ProjectCreator extends Component {

  state = {
    uuid: guidGenerator(),
    name: '',
    createdAt: Date.now(),
    valid: false
  };

  handleInputChange = (event) => {
    const { target } = event;
    this.setState({ [target.name]: target.value });

    if (this.state.name) {
      this.setState((prevState) => ({
        ...prevState,
        valid: true
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        valid: false
      }));
    }

  };

  onCreateProject = () => {
    if(!this.state.valid) {
      return;
    }
    this.props.newProject(this.state);
    this.props.history.push('/');
  };


  render() {
    return (
      <form className={[styles.form, 'container'].join(' ')}>
        <button type="button" onClick={() => this.props.history.goBack()}>back</button>
        <h2>Create new project</h2>
        <div>
          <input type="text"
                 name="name"
                 required
                 onChange={this.handleInputChange}
                 placeholder="Enter project name"/>
        </div>
        <div>
          <input placeholder="Tag (e.g. company name)" name="tag" onChange={this.handleInputChange}/>
        </div>
        <NoteButton disabled={!this.state.valid} type="button" onClick={this.onCreateProject}>Create new project</NoteButton>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    newProject: (task) => dispatch(projectNewProject(task))
  };
};

export default connect(
  null, mapDispatchToProps)(ProjectCreator);

