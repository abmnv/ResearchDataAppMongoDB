import React from 'react';
import {connect} from 'react-redux';

import FileList from 'FileList';
import * as actions from 'actions';

class EditProject extends React.Component {
//var EditProject = React.createClass({

  constructor (props) {
    super(props);

    var {projects, params} = this.props;
    var {projectId} = params;
    //console.log('projectId:', projectId);

    var currentProject;
    projects.forEach((project) => {
      if(project.id === projectId){
        //console.log('project:', project);
        currentProject = project;
      }
    });
    //console.log('currentProject:', currentProject);

    //var {title, description, createdAt, id, files} = currentProject;
    //var {title, description} = this.props;
    this.state = {
      ...currentProject
    }

    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSave (e) {
    e.preventDefault();

    var {id, title, description} = this.state;
    var fileList = $.extend(true, [], this.refs.fileUploader.files);

    if(title && description){
      this.refs.fileUploader.value='';
      //console.log('title:', title);
      var {dispatch} = this.props;
      dispatch(actions.startUpdateProject(id, title, description, fileList)).then(() => {
        this.props.history.push('/');
      });
    }
  }

  handleCancel (e) {
    e.preventDefault();

    this.props.history.push('/edit_projects');
  }

  handleInputChange (e) {
    e.preventDefault();

    //var title = this.refs.title.value;
    var name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
    //console.log(name, ':', e.target.value);
  }

  render () {

    var {title, description, createdAt, id, files} = this.state;

    return (
      <div className="edit-project">
        <div className="row">
          <label htmlhtmlFor="title" className="column small-3">Title:</label>
          <div className="column small-9">
            <input type="text" name="title" onChange={this.handleInputChange} value={this.state.title}></input>
          </div>
        </div>
        <div className="row">
          <label htmlFor="description" className="column small-3">Description:</label>
          <div className="column small-9">
            <textarea rows="3" name="description" onChange={this.handleInputChange} value={this.state.description}></textarea>
          </div>
        </div>
        <div className="row">
          <label htmlFor="files" className="column small-3">Files:</label>
          <div className="column small-9">
            <FileList files={files} projectId={id} editModeStatus={true}/>
          </div>
        </div>
        <div className="row">
          <label htmlFor="fileUploader" className="column small-3">Attach Files:</label>
          <div className="column small-9">
            <input type="file" name="fileUploader" ref="fileUploader" multiple="multiple"></input>
          </div>
        </div>
        <div className="row control-bar">
          <div className="column small-5">
            <button className="button alert expanded" onClick={this.handleCancel}>Cancel</button>
          </div>
          <div className="column small-5 small-offset-2 small-5">
            <button className="button expanded" onClick={this.handleSave}>Save</button>
          </div>
        </div>
      </div>
    )
  }
};

export default connect((state) => {
  return state;
})(EditProject);
