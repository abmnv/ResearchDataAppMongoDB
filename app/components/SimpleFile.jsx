import React from 'react';
import {Line} from 'rc-progress';

const SimpleFile = React.createClass({

  render () {
    const {myFile} = this.props;
    return (
      <div>
        {myFile.file.name}
        <Line percent={myFile.progress} strokeWidth="4" strokeColor="#22BB5B"/>
      </div>
    )
  }
});

export default SimpleFile;
