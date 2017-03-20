import React from 'react';
import {connect} from 'react-redux';
import {firebaseRef, firebaseStorageRef} from 'app/firebase';
import {Link, hashHistory} from 'react-router';
import moment from 'moment';

import * as actions from 'actions';
import ProjectControlBar from 'ProjectControlBar';

export var Project = React.createClass({

  handleSetActiveProject () {
    var {id, dispatch} = this.props;
    dispatch(actions.setActiveProject(id));
  },

  handleDeleteProject () {
    var {dispatch, id, files} = this.props;
    dispatch(actions.startDeleteProject(id, files));
  },

  handleEditProject () {
    this.handleSetActiveProject();
    hashHistory.push('/edit_project');
  },

  render () {
    var {title, createdAt, id, description, fileUrl, editModeStatus} = this.props;

    var renderControlBar = () => {
      if(editModeStatus){
        return (
          <ProjectControlBar onDelete={this.handleDeleteProject} onEdit={this.handleEditProject}/>
        )
      }
    }

    return (
      <div className="project">
        <div className="row">
          <Link to="/detailed_project" onClick={this.handleSetActiveProject} className="button expanded hollow">
            <h4>{title}</h4>
            <p className="date-created">Created on {moment.unix(createdAt).format('MMM Do, YYYY')}</p>
            <p className="brief-description">{description}</p>
          </Link>
        </div>
        {renderControlBar()}
      </div>
    );
  }
});

export default connect()(Project);
//<p>File url: {fileUrl}</p>
//<p>File name: {fileName}</p>
//<a href={fileUrl} className="button tiny success">Download</a>
