import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';
import ProgressButton from 'react-progress-button';
import {Field, reduxForm, formValueSelector} from 'redux-form';

import SimpleFileList from 'SimpleFileList';

class CreateProject extends React.Component {

  constructor(props) {
    super(props);
  }

  handleCreateProject = (values) => {
    const {dispatch, change} = this.props;

    //console.log('values:', values);

    dispatch(actions.startCreateProject({...values, change})).then(() => {
      change('title', '');
      change('description', '');
      dispatch(actions.changeCreateProjectButtonStatus('success'));
      change('logoImage', '');
      change('fileList', '');
      //Note that because it takes 1s for success status to turn up, set to disable after that time
      setTimeout(() => {
        dispatch(actions.changeCreateProjectButtonStatus('disabled'));
      }, 1000);
    });
  }

  // adaptFileEventToValueLogoImage = (e) => {
  //   const {change} = this.props;
  //   change('logoImage', {file: e.target.files[0], progress: 0});
  // }

  adaptFileEventToValueLogoImage = (inputOnChange) => {
    return (e) => {
      //Note that I have to check if logoImage exists on the props if it exists use its progress value
      return inputOnChange({file: e.target.files[0], progress: 0});
      //return inputOnChange({file: e.target.files[0], progress: (this.props.logoImage ? this.props.logoImage.progress : 0)});
    }
  }

  adaptFileEventToValueFileList = (inputOnChange) => {
    return (e) => {
      const files = [...e.target.files].map((file, i) => {
        return {file, progress: 0}
        //return {file, progress: (this.props.fileList ? this.props.fileList[i] : 0)}
      })
      return inputOnChange(files);
    }
  }
  // <div>
  //   <input className="modal-input" {...input} placeholder={label} type={type}/>
  //   {touched && error && <div className="login-error">{error}</div>}
  // </div>

  renderField = ({input, label, placeholder, type, meta: {touched, error}}) => {
    //console.log('renderField touched, error:', touched, error);
    return (
      <fieldset>
        <div className="row">
          <label className="column small-3 project-label">
            {label}
          </label>
          <div className="column small-9">
            <input {...input} type={type} placeholder={placeholder}></input>
          </div>
        </div>
      </fieldset>
    );
  }

  renderTextArea = ({input, label, placeholder, meta: {touched, error}}) => {
    //console.log('renderField touched, error:', touched, error);
    return (
      <fieldset>
        <div className="row">
          <label className="column small-3 project-label">
            {label}
          </label>
          <div className="column small-9">
            <textarea {...input} placeholder={placeholder}></textarea>
          </div>
        </div>
      </fieldset>
    );
  }

  renderLogoImage = ({input, label, type}) => {
    console.log('renderLogoImage logoImage:', this.props.logoImage);
    return (
      <fieldset>
        <div className="row">
          <p className="column small-3 project-label middle">
            {label}
          </p>
          <div className="column small-2">
            <label htmlFor={input.name} className="button tiny radius">Select</label>
            <input type={type} id={input.name} className="show-for-sr" onChange={this.adaptFileEventToValueLogoImage(input.onChange)}></input>
          </div>
          <div className="column small-7">
            <SimpleFileList fileList={input.value ? [input.value] : []}/>
          </div>
        </div>
      </fieldset>
    )
    //(input.onChange)
  }

  renderFileList = ({input, label, type}) => {
    //console.log('renderFileUploader this.fileUploader', this.fileUploader);
    return (
      <fieldset>
        <div className="row">
          <p className="column small-3 project-label middle">
            {label}
          </p>
          <div className="column small-2">
            <label htmlFor={input.name} className="button tiny radius">Select</label>
            <input type={type} id={input.name} multiple="multiple" className="show-for-sr" onChange={this.adaptFileEventToValueFileList(input.onChange)}></input>
          </div>
          <div className="column small-7">
            <SimpleFileList fileList={input.value ? input.value : []}/>
          </div>
        </div>
      </fieldset>
    )
  }

  componentWillUpdate (nextProps, nextState) {
    const {title, description, dispatch} = nextProps;
    // console.log('componentWillUpdate title:', title);
    // console.log('componentWillUpdate description:', description);
    // console.log('componentWillUpdate nextProps', nextProps);

    if(title && description) {
      dispatch(actions.changeCreateProjectButtonStatus(''));
    }
  }

  render () {
    return (
      <div className="create-project">
        <form onSubmit={this.props.handleSubmit(this.handleCreateProject)}>
          <Field name="title" component={this.renderField} type="text" label="Title:" placeholder="My awesome project"/>
          <Field name="description" component={this.renderTextArea} label="Description:" placeholder="Description of my awesome project"/>
          <Field name="logoImage" component={this.renderLogoImage} type="file" label="Logo Image:"/>
          <Field name="fileList" component={this.renderFileList} type="file" label="Attach Files:"/>
          <div className="row control-bar">
            <div className="column small-offset-8 small-4">
              <ProgressButton state={this.props.buttonStatus} durationSuccess={1000}>Save</ProgressButton>
            </div>
          </div>
        </form>
      </div>
    )
  }
  //onClick={this.handleCreateProject}
  //<button type="submit" className="button expanded radius">Login</button>
}

/*
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
*/
const selector = formValueSelector('createProject');

export default connect((state) => {
  const title = selector(state, 'title');
  const description = selector(state, 'description');
  const fileList = selector(state, 'fileList');
  const logoImage = selector(state, 'logoImage');
  // console.log('title:', title);
  // console.log('description:', description);
  console.log('CreateProject logoImage:', logoImage);

  const {createProject: {buttonStatus}} = state;

  return {title, description, fileList, logoImage, buttonStatus};
})(reduxForm({
  form: 'createProject'
})(CreateProject));
//export default connect(({createProjectForm}) => ({...createProjectForm}))(CreateProject);
//<SimpleFileList fileList={this.state.fileList}/>
//<button  className="button expanded" onClick={this.handleCreateProject}>Create</button>
