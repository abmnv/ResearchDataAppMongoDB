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
    change('buttonStatus', 'loading');
    dispatch(actions.startCreateProject({...values, change})).then(() => {
      change('title', '');
      change('description', '');
      change('buttonStatus', 'success');
      //dispatch(actions.changeCreateProjectButtonStatus('success'));
      change('logoImage', '');
      change('fileList', '');
      //Note that because it takes 1s for success status to turn up, set to disable after that time
      setTimeout(() => {
        change('buttonStatus', 'disabled');
        //dispatch(actions.changeCreateProjectButtonStatus('disabled'));
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
    const {title, description, buttonStatus, change} = nextProps;
    // console.log('componentWillUpdate title:', title);
    // console.log('componentWillUpdate description:', description);
    // console.log('componentWillUpdate nextProps', nextProps);

    if(title && description) {
      console.log('buttonStatus:', buttonStatus);
      console.log('changing buttonStatus to empty');
      change('buttonStatus', '');
      //dispatch(actions.changeCreateProjectButtonStatus(''));
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
          <Field name="buttonStatus" component="input" type="hidden"/>
        </form>
      </div>
    )
  }
  //onClick={this.handleCreateProject}
  //<button type="submit" className="button expanded radius">Login</button>
}

const selector = formValueSelector('createProject');

CreateProject = reduxForm({
  form: 'createProject'
})(CreateProject);

CreateProject = connect((state) => {
  const title = selector(state, 'title');
  const description = selector(state, 'description');
  const buttonStatus = selector(state, 'buttonStatus');
  // const fileList = selector(state, 'fileList');
  // const logoImage = selector(state, 'logoImage');
  // console.log('title:', title);
  // console.log('description:', description);
  //console.log('CreateProject logoImage:', logoImage);
  //const {createProject: {buttonStatus}} = state;
  const initialValues = {
    buttonStatus: 'disabled'
  }

  return {title, description, buttonStatus, initialValues};
})(CreateProject);

export default CreateProject;

// export default connect((state) => {
//   const title = selector(state, 'title');
//   const description = selector(state, 'description');
//   const fileList = selector(state, 'fileList');
//   const logoImage = selector(state, 'logoImage');
//   // console.log('title:', title);
//   // console.log('description:', description);
//   console.log('CreateProject logoImage:', logoImage);
//
//   const {createProject: {buttonStatus}} = state;
//
//   return {title, description, fileList, logoImage, buttonStatus};
// })(reduxForm({
//   form: 'createProject'
// })(CreateProject));


//export default connect(({createProjectForm}) => ({...createProjectForm}))(CreateProject);
//<SimpleFileList fileList={this.state.fileList}/>
//<button  className="button expanded" onClick={this.handleCreateProject}>Create</button>
