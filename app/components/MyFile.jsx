import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';

var MyFile = React.createClass({

  handleDeleteFile () {
    var {id, activeProjectId} = this.props;
    console.log('activeProjectId:', activeProjectId);
    //dispatch(actions.startDeleteFile(id));
  },

  render () {
    var {id, name, url, activeProjectId, editModeStatus} = this.props;
    //console.log('editModeStatus:', editModeStatus);

    var renderFileLink = () => {
      if(editModeStatus){
        return (
          <button className="button tiny alert" onClick={this.handleDeleteFile}>Delete</button>
        )
      }else{
        return (
          <a href={url} className="button tiny success">Download</a>
        )
      }
    }

    return (
      <div className="row">
        <div className="column small-9 left-text-align">
          {name}
        </div>
        <div className="column small-3 right-text-align">
          {renderFileLink()}
        </div>
      </div>
    )
  }
});

export default connect((state) => {
  var {editModeStatus, activeProjectId} = state;
  return {
    editModeStatus,
    activeProjectId
  }
})(MyFile);
