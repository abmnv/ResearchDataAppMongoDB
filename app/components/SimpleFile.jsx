import React from 'react';

const SimpleFile = React.createClass({

  render () {
    const {fileName} = this.props;
    return (
      <div>
        {fileName}
      </div>
    )
  }
});

export default SimpleFile;
