import firebase, {firebaseRef, firebaseStorageRef, githubProvider} from 'app/firebase/';
import moment from 'moment';

const DEFAULT_IMAGE_URL =  'https://firebasestorage.googleapis.com/v0/b/research-data-app.appspot.com/o/icons%2Fdefault-project.png?alt=media&token=a16a1fa3-df80-4c28-becf-562ff9a61d13';

export var setLoadingStatus = (status) => {
  return {
    type: 'SET_LOADING_STATUS',
    status
  }
}

export var setSearchText = (text) => {
  return {
    type: 'SET_SEARCH_TEXT',
    text
  }
}

export var addProjects = (projects) => {
  return {
    type: 'ADD_PROJECTS',
    projects
  }
}

export var setActiveProject = (id) => {
  return {
    type: 'SET_ACTIVE_PROJECT',
    id
  }
}

export var changeEditModeStatus = (status) => {
  return {
    type: 'CHANGE_EDIT_MODE_STATUS',
    status
  }
}

export var deleteProject = (id) => {
  return {
    type: 'DELETE_PROJECT',
    id
  }
}

export const authError = (error) => {
  return {
    type: 'AUTH_ERROR',
    error
  }
}

export const authUser = () => {
  return {
    type: 'AUTH_USER',
  }
}

export const startSignUpUser = (credentials) => {
  return (dispatch, getState) => {
    return firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password).then((response) => {
      dispatch(authUser());
    }).catch((err) => {
      dispatch(authError(err.message));
    });
  }
}

export const startEmailPasswordLogin = (credentials) => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
      dispatch(authUser());
    }).catch((err) => {
      //console.log('startEmailPasswordLogin:', err);
      dispatch(authError(err.message));
    });
  }
}

export var login = () => {
  return {
    type: 'SET_LOGIN_STATUS',
    status: true
  }
}

export var startGithubLogin = () => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(githubProvider).then((result) => {
      console.log('Auth worked', result);
      dispatch(authUser());
    }).catch((e) => {
      console.log('Unable to auth', e);
    });
  }
}

export var logout = () => {
  return {
    type: 'LOG_OUT',
  }
}

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
      dispatch(logout());
      //console.log('Successfully logged out');
    }).catch((e) => {
      //console.log('Error while trying to log out', e);
    });
  }
}

export const setRedirectUrl = (url) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      resolve();
    }).then(() => {
      dispatch({
        type: 'SET_REDIRECT_URL',
        url
      });
    });
  }
}

export var startDeleteProject = (id, files) => {

  return (dispatch, getState) => {
    var projectRef = firebaseRef.child('projects/' + id);

    var seq = Promise.resolve();

    files.forEach((myFile) => {
      seq = seq.then(() => {
        console.log('file name:', myFile.name, 'File:', myFile);
        return firebaseStorageRef.child(id + '/' + myFile.name).delete();
      });
    });

    return seq.then(() => {
      return projectRef.remove();
    }).then(() => {
      dispatch(deleteProject(id));
    });
  }
}

export var startAddProjects = () => {

  return (dispatch, getState) => {
    //console.log('inside startAddProjects');
    dispatch(setLoadingStatus(true));
    var projectsRef = firebaseRef.child('projects');

    return projectsRef.once('value').then((snapshot) => {
      //console.log('shapshot:', snapshot.val());

      var firebaseProjects = snapshot.val() || {};

      var keys = Object.keys(firebaseProjects);
      var projects = keys.map((key) => {
        var projectFiles = firebaseProjects[key].files || {};
        var fileKeys = Object.keys(projectFiles);
        return {
          ...firebaseProjects[key],
          files: fileKeys.map((fKey) => {
            return {
              ...firebaseProjects[key].files[fKey],
              id: fKey
            }
          }),
          id: key
        }
      });

      dispatch(addProjects(projects));
      dispatch(setLoadingStatus(false));
    });
  }
}

export var addProject = (project) => {
  return {
    type: 'ADD_PROJECT',
    project
  }
}

export var updateProject = (project) => {
  return {
    type: 'UPDATE_PROJECT',
    project
  }
}

export var deleteFile = (projectId, fileId) => {
  return {
    type: 'DELETE_FILE',
    projectId,
    fileId
  }
}

export var startDeleteFile = (projectId, fileId, fileName) => {
  return (dispatch, getState) => {
    return firebaseStorageRef.child(projectId + '/' + fileName).delete().then(() => {
      return firebaseRef.child('projects/' + projectId + '/files/' + fileId).remove();
    }).then(() => {
      dispatch(deleteFile(projectId, fileId));
    }).catch((e) => {
      console.log('firebase error:', e);
    });
  }
}

export var startUpdateFileSelection = (projedtId, fileId, isSelected) => {
  return (dispatch, getState) => {
    return firebaseRef.child('projects/' + projectId + '/files/' + fileId).update({isSelected}).then((snapshot) => {

    })
  }
}

export var startUpdateProject = (id, title, description, fileList) => {
  return (dispatch, getState) => {

    var project = {
      title,
      description
    }

    var myFiles = [];
    var fileInfo = {};
    var projectRef = firebaseRef.child('projects/' + id);

    return projectRef.update(project).then((snapshot) => {
      var seq = Promise.resolve();

      console.log('fileList inside actions:', fileList);

      fileList.forEach((myFile) => {
        seq = seq.then(() => {
          console.log('file name:', myFile.name, 'File:', myFile);
          return firebaseStorageRef.child(id + '/' + myFile.name).put(myFile);
        }).then((snapshot) => {
          fileInfo = {name: myFile.name, url: snapshot.downloadURL};
          return projectRef.child('files').push(fileInfo);
        }).then((snapshot) => {
          //console.log('snapshot.key:', snapshot.key)
          myFiles.push({...fileInfo, id: snapshot.key})
        });
      });

      return seq.then(() => {
        console.log('myFiles:', myFiles);
        dispatch(updateProject({...project, id, files: myFiles}));
      });
    });
  }
}

export var startAddProject = (title, description, logoImage, fileList) => {
  return (dispatch, getState) => {

    const project = {
      title,
      description,
      createdAt: moment().unix(),
      logoImage: null,
      files: null
    }

    const projectsRef = firebaseRef.child('projects');
    //var fileRef = firebaseStorageRef.child(project.fileName);
    let myFiles = [];
    let fileInfo = {};
    let logoImageInfo =  {
      name: logoImage ? logoImage.name : 'default-image.png',
      url: DEFAULT_IMAGE_URL
    };

    let projectSnapshot;

    return projectsRef.push(project).then((snapshot) => {
      projectSnapshot = snapshot;
      return (logoImage ? (firebaseStorageRef.child(projectSnapshot.key + '/' + logoImage.name).put(logoImage)) : undefined);
    }).then((snapshot) => {
      if(snapshot) {
        logoImageInfo.url = snapshot.downloadURL;
      }
      return projectsRef.child(projectSnapshot.key + '/logoImage').update(logoImageInfo);
    }).then((snapshot) => {

      let seq = Promise.resolve();

      //console.log('fileList inside startAddProject actions:', fileList);

      fileList.forEach((myFile) => {
        seq = seq.then(() => {
          console.log('file name:', myFile.name, 'File:', myFile);
          return firebaseStorageRef.child(projectSnapshot.key + '/' + myFile.name).put(myFile);
        }).then((snapshot) => {
          fileInfo = {name: myFile.name, url: snapshot.downloadURL};
          return projectsRef.child(projectSnapshot.key + '/files').push(fileInfo);
        }).then((snapshot) => {
          //console.log('snapshot.key:', snapshot.key)
          myFiles.push({...fileInfo, id: snapshot.key})
        });
      });

      return seq;
    }).then(() => {
      dispatch(addProject(
        {
          ...project,
          id: projectSnapshot.key,
          logoImage: logoImageInfo,
          files: myFiles
        }
      ));
    });

    // return fileRef.put(fileList[0]).then((snapshot) => {
    //   //console.log('download url', snapshot.downloadURL);
    //   //project.fileUrl = snapshot.downloadURL;
    //   return projectRef.push({...project, fileUrl: snapshot.downloadURL});
    // }).then((snapshot) => {
    //   dispatch(addProject(
    //     {
    //       ...project,
    //       id: snapshot.key
    //     }
    //   ));
    // });


    // fileRef.getDownloadURL().then((url) => {
    //   console.log('url:', url);
    // });

    // .then(() => {
    //   return fileRef.getDownloadURL();
    // }).then((url) => {
    //   report.fileUrl = url;
    //   return reportRef.push(report);
    // }).then(() => {
      // dispatch(addReport(
      //   {
      //     ...report,
      //     id: reportRef.key
      //   }
      // ));
    // });
  }
}
