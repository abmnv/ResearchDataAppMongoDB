import React from 'react';
import {connect} from 'react-redux';
import ProgressButton from 'react-progress-button';

import FileList from 'FileList';
import SimpleFileList from 'SimpleFileList';
import * as actions from 'actions';

class EditProject extends React.Component {
//var EditProject = React.createClass({

  constructor (props) {
    super(props);

    const {currentProject} = this.props;
    //console.log('projectId:', projectId);

    const filesSelection = currentProject.files.map((myFile) => {
      return false;
    });

    this.state = {
      ...currentProject,
      filesSelection,
      buttonStatus: ''
    }

    this.handleSave = this.handleSave.bind(this);
    //this.handleCancel = this.handleCancel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSave (e) {
    e.preventDefault();

    const {id, title, description} = this.state;
    const {uploadFileList} = this.props;
    //var fileList = $.extend(true, [], this.refs.fileUploader.files);

    if(title && description){
      //this.refs.fileUploader.value='';
      //console.log('title:', title);
      this.setState({
        buttonStatus: 'loading'
      });

      var {dispatch} = this.props;
      dispatch(actions.startUpdateProject(id, title, description, uploadFileList)).then(() => {
        // const {currentProject} = this.props;
        //dispatch(actions.setFileUploadList([]));

        this.setState({
          buttonStatus: 'success'
        });

        // setTimeout(() => {
        //   this.setState({
        //     buttonStatus: ''
        //   });
        // }, 1100);
        // this.setState({
        //   //...this.props.currentProject,
        //   uploadFileList: []
        // });
      });

      // .then(() => {
      //   this.props.history.push('/');
      // });
    }
  }

  // handleCancel (e) {
  //   e.preventDefault();
  //
  //   this.props.history.push('/edit-projects');
  // }

  handleInputChange (e) {
    e.preventDefault();

    const {dispatch} = this.props;

    //var title = this.refs.title.value;
    var name = e.target.name;

    if(name === 'fileUploader'){
      const fileList = [...e.target.files].map((file) => {
        return {
          file,
          progress: 0
        }
      });
      dispatch(actions.setFileUploadList(fileList));
      // this.setState({
      //   uploadFileList: [...e.target.files]
      // });
    }else{
      this.setState({
        [name]: e.target.value
      });
    }
    //console.log(name, ':', e.target.value);
  }

  render () {

    const {title, description, createdAt, id, files, filesSelection} = this.state;

    const renderUploadFileList = <SimpleFileList fileList={this.props.uploadFileList}/>;
    //const renderUploadFileList = this.props.uploadFileList ? <SimpleFileList fileList={[...this.props.uploadFileList]} fileUploadProgress={this.props.fileUploadProgress}/> : null;
    //const renderUploadFileList = this.state.uploadFileList ? <SimpleFileList fileList={[...this.state.uploadFileList]} fileUploadProgress={this.props.fileUploadProgress}/> : null;

    return (
      <div className="edit-project">
        <div className="row">
          <label htmlFor="title" className="column small-3 project-label">Title:</label>
          <div className="column small-9">
            <input type="text" name="title" onChange={this.handleInputChange} value={this.state.title}></input>
          </div>
        </div>
        <div className="row">
          <label htmlFor="description" className="column small-3 project-label">Description:</label>
          <div className="column small-9">
            <textarea rows="3" name="description" onChange={this.handleInputChange} value={this.state.description}></textarea>
          </div>
        </div>
        <div className="row">
          <label htmlFor="files" className="column small-3 project-label">Files:</label>
          <div className="column small-9">
            <FileList files={this.props.currentProject.files} projectId={id} editModeStatus={true} filesSelection={filesSelection}/>
          </div>
        </div>
        <div className="row">
          <p className="column small-3 project-label">
            Attach files:
          </p>
          <div className="column small-9">
            <div className="row">
              <div className="column small-offset-9 small-3 right-text-align">
                <label htmlFor="fileUploader" className="button tiny radius">Select</label>
                <input type="file" id="fileUploader" name="fileUploader" ref="fileUploader" multiple="multiple" className={"show-for-sr"} onChange={this.handleInputChange}/>
              </div>
            </div>
            {renderUploadFileList}
          </div>
        </div>
        <div className="edit-save-button-container">
          <div className="edit-save-button">
            <ProgressButton onClick={this.handleSave} state={this.state.buttonStatus} durationSuccess={1000}>Save</ProgressButton>
          </div>
        </div>
      </div>
    )
  }
};

export default connect((state, ownProps) => {
  const {projects, fileUploadProgress, uploadFileList} = state;
  let currentProject;

  const {params: {projectId}} = ownProps;

  projects.forEach((project) => {
    if(project.id === projectId){
      //console.log('project:', project);
      currentProject = project;
    }
  });

  return {currentProject, fileUploadProgress, uploadFileList};
})(EditProject);
// <label htmlFor="fileUploader" className="column small-3">Attach Files:</label>
// <button className="button expanded radius" onClick={this.handleSave}>Save</button>

// <div className="row control-bar">
//   <div className="column small-4 small-offset-8">
//     <ProgressButton onClick={this.handleSave} state={this.state.buttonStatus} durationSuccess={1000}>Save</ProgressButton>
//   </div>
// </div>
