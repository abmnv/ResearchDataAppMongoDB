import React from 'react';
import {Link, IndexLink} from 'react-router';

var CreateProjectButton = React.createClass({

  render () {
    return (
      <div className="create-project-button">
        <div className="row no-margins">
          <Link to="/create_project" className="button expanded">Create New Project</Link>
        </div>
      </div>
    );
  }
});

export default CreateProjectButton;
