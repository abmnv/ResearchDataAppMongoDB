import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';
import ProjectList from 'ProjectList';
import CreateProjectButton from 'CreateProjectButton';

export var Projects = React.createClass({

  render () {
    var {params, location} = this.props;
    //console.log('Projects props:', this.props);
    var editModeStatus = location.pathname.indexOf('/edit-projects') > -1;

    return (
      <div>
        <ProjectList editModeStatus={editModeStatus}/>
        {editModeStatus ? (<CreateProjectButton/>) : null}
      </div>
    )
  }
});

export default connect()(Projects);
//{renderProjects()}
