import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';
import ProjectList from 'ProjectList';
import CreateProjectButton from 'CreateProjectButton';

export var EditProjects = React.createClass({

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
    console.log('props:', this.props);

    var renderProjects = () => {

      var editModeStatus = location.pathname.indexOf('/edit_projects') > -1;
      console.log('EditProjects editModeStatus:', editModeStatus);

      if(editModeStatus){
        return (
          <div>
            <ProjectList editModeStatus={editModeStatus}/>
            <CreateProjectButton/>
          </div>
        )
      }else{
        return (
          <ProjectList/>
        )
      }
    }

    return (
      <div>
        {renderProjects()}
      </div>
    )
  }
});

export default connect()(EditProjects);
