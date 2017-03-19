import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

export var CreateProject = React.createClass({

  handleSubmit (e) {
    e.preventDefault();

    var {dispatch} = this.props;

    var title = this.refs.title.value;
    var description = this.refs.description.value;
    var fileList = $.extend(true, [], this.refs.fileUploader.files);

    if(title && description){
      // this.refs.title.value = '';
      // this.refs.description.value = '';
      // this.refs.fileUploader.value = '';
      console.log('File list:', fileList);
      dispatch(actions.startAddProject(title, description, fileList)).then(() => {
        this.props.history.push('/');
      });
    }
  },

  render () {
    return (
      <div className="create-project">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <label htmlhtmlFor="title" className="column small-3">
              Title:
            </label>
            <div className="column small-9">
              <input type="text" name="title" ref="title" placeholder="My awesome project"></input>
            </div>
          </div>
          <div className="row">
            <label htmlFor="description" className="column small-3">
              Description:
            </label>
            <div className="column small-9">
              <textarea name="description" ref="description" rows="3" placeholder="Description of my awesome project"></textarea>
            </div>
          </div>
          <div className="row">
            <label htmlFor="fileUploader" className="column small-3">
              Attach files:
            </label>
            <div className="column small-9">
              <input type="file" name="fileUploader" ref="fileUploader" multiple="multiple"></input>
            </div>
          </div>
          <div className="row create-button">
            <div className="column small-6 small-centered">
              <button  className="button expanded">Create</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
});

export default connect()(CreateProject);
