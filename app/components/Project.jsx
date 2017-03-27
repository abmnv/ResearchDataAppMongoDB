import React from 'react';
import {connect} from 'react-redux';
import {firebaseRef, firebaseStorageRef} from 'app/firebase';
import {Link, hashHistory} from 'react-router';
import moment from 'moment';

import * as actions from 'actions';
import ProjectControlBar from 'ProjectControlBar';

export var Project = React.createClass({

  // handleSetActiveProject () {
  //   var {id, dispatch} = this.props;
  //   dispatch(actions.setActiveProject(id));
  // },

  handleDeleteProject () {
    var {dispatch, id, files} = this.props;
    dispatch(actions.startDeleteProject(id, files));
  },

  handleEditProject () {
    //this.handleSetActiveProject();
    var {id} = this.props;
    hashHistory.push('/edit_projects/' + id);
  },

  render () {
    var {title, createdAt, id, description, fileUrl, editModeStatus} = this.props;
    var briefDescription = description.length < 120 ? description : description.slice(0, 120) + '...';

    //var editModeStatus=true;
    console.log('Project editModeStatus:', editModeStatus);

    var renderControlBar = () => {
      if(editModeStatus){
        return (
          <ProjectControlBar onDelete={this.handleDeleteProject} onEdit={this.handleEditProject}/>
        )
      }
    }

    return (
      <div>
        <div className="project">
          <div className="row">
            <Link to={'/projects/'+id} className="button expanded hollow">
              <h4>{title}</h4>
              <p className="date-created">Created on {moment.unix(createdAt).format('MMM Do, YYYY @ h:mm a')}</p>
              <p className="brief-description">{briefDescription}</p>
            </Link>
          </div>
        </div>
        {renderControlBar()}
      </div>
    );
  }
});

export default connect()(Project);
