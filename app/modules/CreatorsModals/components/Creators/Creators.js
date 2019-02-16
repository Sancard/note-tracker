// @flow
import React from 'react';
import * as styles from './Creators.css';
import NoteButton from '../../../../shared/NoteButton/NoteButton';

type taskProps = {
  modalTrigger: () => void,
  handleInputChange: () => void,
  valid: boolean,
  onCreateTask: () => void
};

type projectProps = {
  modalTrigger: () => void,
  handleInputChange: () => void,
  valid: boolean,
  onCreateProject: () => void
};


export const TaskCreator = (props: taskProps) => {
  return (
    <React.Fragment>
      <div className={styles.header}>
        <h2>Create new task</h2>
        <button type="button" onClick={() => props.modalTrigger(false)}><i className="fas fa-times"/></button>
      </div>
      <form className={[styles.form, 'container'].join(' ')}>
        <div>
          <input type="text"
                 name="name"
                 required
                 onChange={props.handleInputChange}
                 placeholder="Enter task name"/>
        </div>
        <div>
          <input type="number"
                 name="estimatedHours"
                 min="1"
                 onChange={props.handleInputChange}
                 placeholder="Enter estimated hours"/>
        </div>
        <div>
          <textarea placeholder="Task description" name="description" onChange={props.handleInputChange}/>
        </div>
        <NoteButton padding="10px 20px" disabled={!props.valid} type="button" onClick={props.onCreateTask}>Create new task</NoteButton>
      </form>
    </React.Fragment>
  );
};


export const ProjectCreator = (props: projectProps) => {
  return (
    <React.Fragment>
      <div className={styles.header}>
        <h2>Create new project</h2>
        <button type="button" onClick={() => props.modalTrigger(false)}><i className="fas fa-times"/></button>
      </div>
      <form className={[styles.form, 'container'].join(' ')}>
        <div>
          <input type="text"
                 name="name"
                 required
                 onChange={props.handleInputChange}
                 placeholder="Enter project name"/>
        </div>
        <div>
          <input placeholder="Tag (e.g. company name)" name="tag" onChange={props.handleInputChange}/>
        </div>
        <NoteButton padding="10px 20px" disabled={!props.valid} type="button" onClick={props.onCreateProject}>Create new project</NoteButton>
      </form>
    </React.Fragment>
  );
};

