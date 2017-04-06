import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';

var MyFile = React.createClass({

  handleDeleteFile (e) {
    e.preventDefault();

    const {id, name, projectId, dispatch} = this.props;
    //console.log('projectId:', projectId);
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
    console.log('isSelected:', isSelected);

    const button = editModeStatus ? (<button className="button tiny alert no-margins" onClick={this.handleDeleteFile}>Delete</button>) : (<a href={url} className="button tiny success no-margins">Download</a>);

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
        <div className="column small-8 left-text-align">
          {name}
        </div>
        <div className="column small-3 right-text-align">
          {button}
        </div>
        <div className="column small-1">
          <input type="checkbox" ref="checkbox" checked={isSelected} onChange={() => {
              //console.log('checkbox was clicked');
              this.props.onToggleFileSelection(id);
            }}></input>
        </div>
      </div>
    )
  }
});

export default connect()(MyFile);
