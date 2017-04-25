import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';
import ProgressButton from 'react-progress-button';

//import 'style-loader!css-loader!../../node_modules/react-progress-button/react-progress-button.css';

import SimpleFileList from 'SimpleFileList';

export var CreateProject = React.createClass({

  getInitialState () {
    return {
      title: '',
      description: '',
      fileList: null,
      logoImage: null,
      buttonStatus: 'disabled',
    }
  },

  handleCreateProject (e) {
    e.preventDefault();

    const title = this.state.title;
    const description = this.state.description;
    const fileList = this.state.fileList;
    const logoImage = this.state.logoImage;

    if(title && description){
      const {dispatch} = this.props;
      // this.refs.title.value = '';
      // this.refs.description.value = '';
      // this.refs.fileUploader.value = '';
      //console.log('logoImage:', logoImage);

      this.setState({
        buttonStatus: 'loading'
      });

      dispatch(actions.startAddProject(title, description, logoImage, fileList)).then(() => {
        this.setState({
          title: '',
          description: '',
          fileList: null,
          logoImage: null,
          buttonStatus: 'success',
        });

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

    //const name = e.target.name;
    // console.log('files:', e.target.files);
    //const fileList = $.extend(true, [], e.target.files);
    //const filesObj = e.target.files;
    const name = e.target.name;

    if(name === 'fileUploader'){
      // let fileList = [];
      //
      // for(let i=0; i<e.target.files.length; i++){
      //   fileList.push(e.target.files[i].name);
      // }
      //
      // console.log('handleInputChange fileList', fileList);
      //var fileList = [...e.target.files];

      this.setState({
        fileList: [...e.target.files]
      });
    }else if(name === 'logoImage'){
      this.setState({
        [name]: e.target.files[0]
      });
    }else{
      this.setState({
        [name]: e.target.value,
      });

      if(this.state.title && this.state.description){
        this.setState({
          buttonStatus: ''
        });
      }
    }
  },

  render () {

    const renderFileList = this.state.fileList ? <SimpleFileList fileList={this.state.fileList}/> : null;
    const renderLogoImage = this.state.logoImage ? <div>{this.state.logoImage.name}</div> : null;
    // console.log('fileListRender:', fileListRender);

    return (
      <div className="create-project">
        <div className="row">
          <label htmlhtmlFor="title" className="column small-3 project-label">
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
          <div className="column small-3">
            <label htmlFor="logoImage" className="button tiny radius">Upload</label>
            <input type="file" id="logoImage" name="logoImage" className="show-for-sr" onChange={this.handleInputChange}></input>
          </div>
          <div className="column small-6">
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
            {renderFileList}
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

export default connect()(CreateProject);
//<SimpleFileList fileList={this.state.fileList}/>
//<button  className="button expanded" onClick={this.handleCreateProject}>Create</button>
