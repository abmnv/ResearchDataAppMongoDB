import React from 'react';
import {connect} from 'react-redux';

import ProjectList from 'ProjectList';

export var Projects = React.createClass({

  render () {
    return (
      <div>
        <ProjectList/>
      </div>
    )
  }
});

export default connect()(Projects);
