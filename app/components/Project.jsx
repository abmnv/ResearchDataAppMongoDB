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
    var {title, createdAt, id, description, logoImage, editModeStatus} = this.props;
    var briefDescription = description.length < 120 ? description : description.slice(0, 120) + '...';
    logoImage = logoImage || {url: 'https://firebasestorage.googleapis.com/v0/b/research-data-app.appspot.com/o/icons%2Fdefault-project.png?alt=media&token=a16a1fa3-df80-4c28-becf-562ff9a61d13'};
    //console.log('logoImage:', logoImage);

    return (
      <div>
        <div className="project">
          <Link to={'/projects/'+id} className="button expanded hollow">
            <div className="row">
              <div className="column small-3">
                <div className="image-container">
                  <img src={logoImage.url}/>
                </div>
              </div>
              <div className="column small-9">
                <h4>{title}</h4>
                <p className="date-created">Created on {moment.unix(createdAt).format('MMM Do, YYYY @ h:mm a')}</p>
                <p className="brief-description">{briefDescription}</p>
              </div>
            </div>
          </Link>
        </div>
        {editModeStatus ? (<ProjectControlBar onDelete={this.handleDeleteProject} onEdit={this.handleEditProject}/>) : null}
      </div>
    );
  }
});

export default connect()(Project);
