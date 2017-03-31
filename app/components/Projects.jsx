import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';
import ProjectList from 'ProjectList';
import CreateProjectButton from 'CreateProjectButton';

export var Projects = React.createClass({

  // componentWillMount(){
  //   var {dispatch} = this.props;
  //   dispatch(actions.changeEditModeStatus(true));
  // },
  //
  // componentWillUnmount(){
  //   var {dispatch} = this.props;
  //   dispatch(actions.changeEditModeStatus(false));
  // },

  render () {
    var {params, location} = this.props;
    //console.log('props:', this.props);
    var editModeStatus = location.pathname.indexOf('/edit_projects') > -1;

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
