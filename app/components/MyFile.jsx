import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';

var MyFile = React.createClass({

  handleDeleteFile (e) {
    e.preventDefault();

    const {id, name, projectId, dispatch} = this.props;
    console.log('projectId:', projectId);
    dispatch(actions.startDeleteFile(projectId, id, name));
  },

  // handleToggleFileSelection (isSelected) {
  //   //e.preventDefault();
  //   this.props.onToggleFileSelection(isSelected);
  //
  //   //const {id, isSelected, projectId, dispatch} = this.props;
  //   //dispatch(actions.addFileId);
  //   //const checked = this.refs.checkbox.value;
  //   //dispatch(action.toggleFileSelection(projectId, id, !isSelected));
  //   //console.log('checked:', checked);
  //
  // },

  render () {
    const {id, name, url, isSelected, projectId, editModeStatus} = this.props;
    //console.log('editModeStatus:', editModeStatus);
    //console.log('MyFile editModeStatus:', editModeStatus);
    //sconsole.log('isSelected:', isSelected);

    const renderFile = () => {
      if(editModeStatus){
        return (
          <div className="row">
            <div className="column small-9 left-text-align">
              {name}
            </div>
            <div className="column small-3 right-text-align">
              <button className="button tiny alert radius" onClick={this.handleDeleteFile}>Delete</button>
            </div>
          </div>
        )
      }else{
        return (
          <div className="row">
            <div className="column small-8 left-text-align">
              {name}
            </div>
            <div className="column small-3 right-text-align">
              <a href={url} className="button tiny success radius">Download</a>
            </div>
            <div className="column small-1">
              <input type="checkbox" checked={isSelected} onChange={() => {
                  //console.log('checkbox was clicked');
                  this.props.onToggleFileSelection(id);
                }}></input>
            </div>
          </div>
        )
      }
    }

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
      <div>
        {renderFile()}
      </div>
    )
  }
});

export default connect()(MyFile);
