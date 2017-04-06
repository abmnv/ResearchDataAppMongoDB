import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

import SimpleFileList from 'SimpleFileList';

export var CreateProject = React.createClass({

  getInitialState () {
    return {
      isUploading: false,
      fileList: null,
      logoImage: null
    }
  },

  handleCreateProject (e) {
    e.preventDefault();

    const {dispatch} = this.props;

    const title = this.refs.title.value;
    const description = this.refs.description.value;
    const fileList = $.extend(true, [], this.refs.fileUploader.files);
    const logoImage = this.refs.logoImage.files;

    //console.log('title:', title);
    //console.log('description', description);

    if(title && description){
      // this.refs.title.value = '';
      // this.refs.description.value = '';
      // this.refs.fileUploader.value = '';
      //console.log('logoImage:', logoImage);
      this.setState({
        isUploading: true
      });

      dispatch(actions.startAddProject(title, description, logoImage[0], fileList)).then(() => {
        this.setState({
          isUploading: false
        })
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
      let fileList = [];

      for(let i=0; i<e.target.files.length; i++){
        fileList.push(e.target.files[i].name);
      }

      console.log('handleInputChange fileList', fileList);

      this.setState({
        fileList
      });
    }else{
      this.setState({
        [name]: e.target.files[0].name
      });
    }
  },

  render () {

    const renderFileList = this.state.fileList ? <SimpleFileList fileList={this.state.fileList}/> : null;
    const renderLogoImage = this.state.logoImage ? <div>{this.state.logoImage}</div> : null;
    // console.log('fileListRender:', fileListRender);

    return (
      <div className="create-project">
        <div className="row">
          <label htmlhtmlFor="title" className="column small-3 project-label">
            Title:
          </label>
          <div className="column small-9">
            <input type="text" name="title" ref="title" placeholder="My awesome project"></input>
          </div>
        </div>
        <div className="row">
          <label htmlFor="description" className="column small-3 project-label">
            Description:
          </label>
          <div className="column small-9">
            <textarea name="description" ref="description" rows="3" placeholder="Description of my awesome project"></textarea>
          </div>
        </div>
        <div className="row">
          <p className="column small-3 project-label middle">
            Logo image:
          </p>
          <div className="column small-3">
            <label htmlFor="logoImage" className="button tiny">Upload</label>
            <input type="file" id="logoImage" name="logoImage" ref="logoImage" className="show-for-sr" onChange={this.handleInputChange}></input>
          </div>
          <div className="column small-6">
            {renderLogoImage}
          </div>
        </div>
        <div className="row">
          <p className="column small-3 project-label">
            Attach files:
          </p>
          <div className="column small-3">
            <label htmlFor="fileUploader" className="button tiny">Upload Files</label>
            <input type="file" id="fileUploader" name="fileUploader" ref="fileUploader" multiple="multiple" className="show-for-sr" onChange={this.handleInputChange}></input>
          </div>
          <div className="column small-6">
            {renderFileList}
          </div>
        </div>
        <div className="row control-bar">
          <div className="column small-5">
            <button  className="button expanded alert" onClick={this.handleCancel}>Cancel</button>
          </div>
          <div className="column small-5 small-offset-2">
            <button  className="button expanded" onClick={this.handleCreateProject}>Create</button>
          </div>
        </div>
      </div>
    )
  }
});

export default connect()(CreateProject);
//<SimpleFileList fileList={this.state.fileList}/>
