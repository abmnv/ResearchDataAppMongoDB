import React from 'react';
import {connect} from 'react-redux';

import MyFile from 'MyFile';

var FileList = (props) => {
  var {files} = props;

  var renderFileList = () => {
    return files.map((myFile) => {
        return (
          <MyFile key={myFile.id} {...myFile}/>
        )
    });
  }

  return (
    <div>
      {renderFileList()}
    </div>
  );
}

export default connect()(FileList);
