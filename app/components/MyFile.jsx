import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';

var MyFile = React.createClass({

  handleDeleteFile () {
    var {id, name, projectId, dispatch} = this.props;
    console.log('projectId:', projectId);
    dispatch(actions.startDeleteFile(projectId, id, name));
  },

  render () {
    var {id, name, url, projectId, editModeStatus} = this.props;
    //console.log('editModeStatus:', editModeStatus);
    console.log('MyFile editModeStatus:', editModeStatus);

    const button = editModeStatus ? (<button className="button tiny alert" onClick={this.handleDeleteFile}>Delete</button>) : (<a href={url} className="button tiny success">Download</a>);

    // var renderFileLink = () => {
    //   if(editModeStatus){
    //     return (
    //       <button className="button tiny alert" onClick={this.handleDeleteFile}>Delete</button>
    //     )
    //   }else{
    //     return (
    //       <a href={url} className="button tiny success">Download</a>
    //     )
    //   }
    // }

    return (
      <div className="row">
        <div className="column small-9 left-text-align">
          {name}
        </div>
        <div className="column small-3 right-text-align">
          {button}
        </div>
      </div>
    )
  }
});

export default connect()(MyFile);
