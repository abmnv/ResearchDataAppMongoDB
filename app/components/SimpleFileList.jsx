import React from 'react';

import SimpleFile from 'SimpleFile';

const SimpleFileList = React.createClass({

  render () {
    const {fileList} = this.props;
    console.log('fileList:', fileList);

    const fileRender = fileList.map((name, i) => {
      return (
        <SimpleFile key={i} fileName={name}/>
      )
    });

    return (
      <div>
        {fileRender}
      </div>
    );
  }
});

export default SimpleFileList;
