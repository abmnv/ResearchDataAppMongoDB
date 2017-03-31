import React from 'react';
import {connect} from 'react-redux';

import Project from 'Project';

var ProjectList = React.createClass({

  render () {
    var {projects, isLoading, searchText, editModeStatus} = this.props;
    //console.log('ProjectList editModeStatus:', editModeStatus);

    var renderList = () => {
      if(isLoading){
        return (
          <h4>Loading...</h4>
        )
      }else if(projects.length === 0){
        return (
          <h4>Nothing to show</h4>
        );
      }

      var updatedProjects = JSON.parse(JSON.stringify(projects));

      if(searchText !== ''){
        var updatedProjects = updatedProjects.filter((project) => {
          var title = project.title.toLowerCase();
          return title.indexOf(searchText) > -1;
        });
      }

      return updatedProjects.map((project) => {
        return (
          <Project key={project.id} {...project} editModeStatus={editModeStatus}/>
        );
      });
    }

    return (
      <div className="project-list">
        {renderList()}
      </div>
    )
  }
});

export default connect((state, ownProps) => {
  //console.log('state:', state);
  //console.log('ownProps:', ownProps);
  return {
    ...state,
    ...ownProps}
})(ProjectList);
