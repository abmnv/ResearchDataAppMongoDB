import React from 'react';

import SimpleFile from 'SimpleFile';

const SimpleFileList = React.createClass({

  render () {
    const {fileList} = this.props;
    //console.log('fileList:', fileList);

    const fileRender = fileList.map((myFile, i) => {
      return (
        <SimpleFile key={i} fileName={myFile.name}/>
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
