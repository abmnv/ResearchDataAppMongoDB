import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';
import ProgressButton from 'react-progress-button';

import SimpleFileList from 'SimpleFileList';

export var CreateProject = React.createClass({

  getInitialState () {
    return {
      title: '',
      description: '',
      buttonStatus: 'disabled',
    }
  },

  handleCreateProject (e) {
    e.preventDefault();

    const {title, description} = this.state;
    const {fileList, logoImage, dispatch} = this.props;

    if(title && description){
      // this.refs.title.value = '';
      // this.refs.description.value = '';
      // this.refs.fileUploader.value = '';
      //console.log('logoImage:', logoImage);

      this.setState({
        buttonStatus: 'loading'
      });

      dispatch(actions.startCreateProject(title, description, logoImage, fileList)).then(() => {
        this.setState({
          title: '',
          description: '',
          buttonStatus: 'success',
        });

        dispatch(actions.clearCreateProjectForm());

        //set button to disabled after about 1000 ms to avoid conflict with 1000ms to 'Ready' status transition
        setTimeout(() => {
          this.setState({
            buttonStatus: 'disabled',
          });
        }, 1100);
        //this.props.history.push('/');
      });
    }
  },

  handleCancel (e) {
    e.preventDefault();
    this.props.history.push('/edit_projects');
  },

  handleInputChange (e) {
    e.preventDefault();

    const {dispatch} = this.props;

    //const name = e.target.name;
    // console.log('files:', e.target.files);
    //const fileList = $.extend(true, [], e.target.files);
    //const filesObj = e.target.files;
    const name = e.target.name;

    if(name === 'fileUploader'){
      const fileList = [...e.target.files].map((file) => {
        return {
          file,
          progress: 0
        }
      });
      dispatch(actions.setCreateProjectFileUploadList(fileList));

    }else if(name === 'logoImage'){
      dispatch(actions.setCreateProjectLogoImage({file: e.target.files[0], progress: 0}));
      // this.setState({
      //   [name]: e.target.files[0]
      // });
    }else{
      this.setState({
        [name]: e.target.value
      }, () => {
        if(this.state.title && this.state.description){
          this.setState({
            buttonStatus: ''
          });
        }
      });
    }
  },

  render () {
    const {fileList, logoImage} = this.props;
    console.log('fileList:', fileList);
    console.log('logoImage:', logoImage);

    const renderUploadFileList = <SimpleFileList fileList={fileList}/>;
    //const renderFileList = this.state.fileList ? <SimpleFileList fileList={this.state.fileList}/> : null;
    const renderLogoImage = logoImage ? (<SimpleFileList fileList={[logoImage]}/>) : null;
    // console.log('fileListRender:', fileListRender);

    return (
      <div className="create-project">
        <div className="row">
          <label htmlFor="title" className="column small-3 project-label">
            Title:
          </label>
          <div className="column small-9">
            <input type="text" name="title" placeholder="My awesome project" value={this.state.title} onChange={this.handleInputChange}></input>
          </div>
        </div>
        <div className="row">
          <label htmlFor="description" className="column small-3 project-label">
            Description:
          </label>
          <div className="column small-9">
            <textarea name="description" rows="3" placeholder="Description of my awesome project" value={this.state.description} onChange={this.handleInputChange}></textarea>
          </div>
        </div>
        <div className="row">
          <p className="column small-3 project-label middle">
            Logo image:
          </p>
          <div className="column small-2">
            <label htmlFor="logoImage" className="button tiny radius">Upload</label>
            <input type="file" id="logoImage" name="logoImage" className="show-for-sr" onChange={this.handleInputChange}></input>
          </div>
          <div className="column small-7">
            {renderLogoImage}
          </div>
        </div>
        <div className="row">
          <p className="column small-3 project-label">
            Attach files:
          </p>
          <div className="column small-2">
            <label htmlFor="fileUploader" className="button tiny radius">Upload</label>
            <input type="file" id="fileUploader" name="fileUploader" ref="fileUploader" multiple="multiple" className="show-for-sr" onChange={this.handleInputChange}></input>
          </div>
          <div className="column small-7">
            {renderUploadFileList}
          </div>
        </div>
        <div className="row control-bar">
          <div className="column small-offset-8 small-4">
            <ProgressButton onClick={this.handleCreateProject} state={this.state.buttonStatus} durationSuccess={1000}>Save</ProgressButton>
          </div>
        </div>
      </div>
    )
  }
});

export default connect(({createProjectForm}) => ({...createProjectForm}))(CreateProject);
//<SimpleFileList fileList={this.state.fileList}/>
//<button  className="button expanded" onClick={this.handleCreateProject}>Create</button>
