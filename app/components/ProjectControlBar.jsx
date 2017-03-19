import React from 'react';

var ProjectControlBar = React.createClass({

  handleDelete () {
    this.props.onDelete();
  },

  handleEdit () {
    this.props.onEdit();
  },

  render () {
    return (
      <div className="row">
        <div className="project-control-bar">
            <button className="column small-5 button alert" onClick={this.handleDelete}>Delete</button>
            <button className="column small-5 small-offset-2 button" onClick={this.handleEdit}>Edit</button>
        </div>
      </div>
    );
  }
});

export default ProjectControlBar;
//<button className="button expand" onClick={this.handleEdit}>Edit</button>
