import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';
import ProjectList from 'ProjectList';
import CreateProjectButton from 'CreateProjectButton';

export var EditProjects = React.createClass({

  componentWillMount(){
    var {dispatch} = this.props;
    dispatch(actions.changeEditModeStatus(true));
  },

  componentWillUnmount(){
    var {dispatch} = this.props;
    dispatch(actions.changeEditModeStatus(false));
  },

  render () {
    return (
      <div>
        <ProjectList/>
        <CreateProjectButton/>
      </div>
    )
  }
});

export default connect()(EditProjects);
