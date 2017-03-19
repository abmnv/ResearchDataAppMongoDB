import React from 'react';
import {connect} from 'react-redux';

import Project from 'Project';

var ProjectList = React.createClass({

  render () {
    var {projects, editModeStatus} = this.props;
    //console.log('Projects:', projects);

    var renderList = () => {

      if(projects.length === 0){
        return (
          <p>Nothing to show</p>
        )
      }

      return projects.map((project) => {
        return (
          <Project key={project.id} {...project} editModeStatus={editModeStatus}/>
        )
      });
    }

    return (
      <div className="project-list">
        {renderList()}
      </div>
    )
  }
});

export default connect((state) => {
  //console.log('ProjectList state:', state);
  return state;
})(ProjectList);
