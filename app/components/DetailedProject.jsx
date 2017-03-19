import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import FileList from "FileList";
import * as actions from 'actions';

var DetailedProject = React.createClass({

  componentWillUnmount () {
    var {dispatch} = this.props;
    dispatch(actions.setActiveProject(''));
  },

  render () {
    var {title, createdAt, description, files} = this.props;

    return (
      <div className="project">
        <h4>{title}</h4>
        <p className="date-created">Created on {moment.unix(createdAt).format('MMM Do, YYYY')}</p>
        <p className="project-description">{description}</p>
        <div className="row">
          <div className="column small-2">
            <p className="files">Files:</p>
          </div>
          <div className="column small-10">
            <FileList files={files}/>
          </div>
        </div>
      </div>
    )
  }
});

export default connect((state) => {
  var newProject;
  state.projects.forEach((project) => {
    if(project.id === state.activeProjectId){
      //console.log('project:', project);
      newProject = project;
    }
  });
  //console.log('newProject:', newProject);
  return newProject;

})(DetailedProject);

//{renderFileList()}
