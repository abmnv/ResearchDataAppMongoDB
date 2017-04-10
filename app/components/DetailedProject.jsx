import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import DownloadButton from 'ZipDownloadButton';
//var DownloadButton = require('downloadbutton/es5');
import JSZip from 'jszip';

import FileList from 'FileList';
import {getFileBlob} from 'ResearchDataAPI';
//import * as actions from 'actions';

class DetailedProject extends React.Component {

//var DetailedProject = React.createClass({
  constructor (props) {
    super(props);

    const {projects, params} = this.props;
    const {projectId} = params;
    //console.log('projectId:', projectId);

    let currentProject;
    projects.forEach((project) => {
      if(project.id === projectId){
        //console.log('project:', project);
        currentProject = project;
      }
    });

    const {files} = currentProject;

    const filesSelection = files.map((myFile) => {
      return false;
    });

    // console.log('filesSelection:', filesSelection);

    this.state = {
      currentProject,
      filesSelection
    }

    this.handleToggleFileSelection = this.handleToggleFileSelection.bind(this);
    this.handleDownloadSelectedFiles = this.handleDownloadSelectedFiles.bind(this);
  }

  handleToggleFileSelection (fileId) {
    //console.log('fileId:', fileId);

    let {currentProject, filesSelection} = this.state;
    const {files} = currentProject;

    //console.log('filesSelection:', filesSelection);

    let currentFile;
    let fileIndex;
    files.forEach((myFile, i) => {
      if(myFile.id === fileId){
        //console.log('project:', project);
        currentFile = myFile;
        fileIndex = i;
      }
    });

    let newFilesSelection =  JSON.parse(JSON.stringify(filesSelection));
    newFilesSelection[fileIndex] = !newFilesSelection[fileIndex];
    //console.log('newFilesSelection after change:', newFilesSelection);

    this.setState({
      filesSelection: newFilesSelection
    });
  }

  handleDownloadSelectedFiles (done) {
    const {filesSelection, currentProject} = this.state;
    const {files} = currentProject;

    console.log('filesSelection:', filesSelection);

    let selectedFiles = [];
    filesSelection.forEach((status, id) => {
      if (status) {
        selectedFiles.push(files[id]);
      };
    });

    console.log('selectedFiles:', selectedFiles);

    const zip = new JSZip();
    let seq = Promise.resolve();

    selectedFiles.forEach((file) => {

      seq = seq.then(() => {
        return getFileBlob(file);
      }).then((blob) => {
        zip.file(file.name, blob);
        return zip.generateAsync({type: 'blob'});
      });
    });

    seq.then((contents) => {
      //console.log('contents:', contents);
      done({
        filename: 'data.zip',
        contents,
        mime: 'application/zip'
      });
    });
  }
  // componentWillUnmount () {
  //   var {dispatch} = this.props;
  //   dispatch(actions.setActiveProject(''));
  // },

  render () {

    const {currentProject, filesSelection} = this.state;
    const {id, title, createdAt, description, files} = currentProject;

    return (
      <div className="project">
        <h4>{title}</h4>
        <p className="date-created">Created on {moment.unix(createdAt).format('MMM Do, YYYY')}</p>
        <p className="project-description">{description}</p>
        <div className="row">
          <div className="column small-2">
            <p className="files">Files:</p>
          </div>
          <div className="column small-10">
            <FileList files={files} filesSelection={filesSelection} onToggleFileSelection={this.handleToggleFileSelection} projectId={id} editModeStatus={false}/>
          </div>
        </div>
        <DownloadButton className="button success" async={true} genFile={this.handleDownloadSelectedFiles} initTitle={'Download Selected Files'} zippingTitle={'Zipping Files...'} downloadingTitle={'Downloading...'}/>

      </div>
    );
  }
};

export default connect((state) => {
  return state;
})(DetailedProject);
// <button className="button small success" onClick={this.handleDownloadSelectedFiles}>Download Selected</button>
//<button className="button small success" onClick={this.handleDownloadAllFiles}>Download All</button>
//{renderFileList()}
