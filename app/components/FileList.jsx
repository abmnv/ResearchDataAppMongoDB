import React from 'react';
import {connect} from 'react-redux';

import MyFile from 'MyFile';

var FileList = (props) => {
  var {files, projectId, editModeStatus} = props;

  var renderFileList = () => {
    return files.map((myFile) => {
        return (
          <MyFile key={myFile.id} {...myFile} projectId={projectId} editModeStatus={editModeStatus}/>
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
