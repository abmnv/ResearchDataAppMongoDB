import moment from 'moment';

export var projectReducer = (state = [], action) => {
  switch(action.type){
    case 'ADD_PROJECT':
      return [
        ...state,
        action.project
      ]
    case 'ADD_PROJECTS':
      return [
        ...state,
        ...action.projects
      ]
    case 'UPDATE_PROJECT':
      return state.map((project) => {
        if(project.id === action.project.id){
          return {...project, ...action.project}
        }else{
          return project
        }
      });
    case 'DELETE_PROJECT':
      return state.filter((project) => {
        return project.id === action.id ? false : true;
      });
    default:
      return state
  }
}

export var activeProjectReducer = (state = '', action) => {
  switch(action.type){
    case 'SET_ACTIVE_PROJECT':
      return action.id;
    default:
      return state
  }
}

export var editModeStatusReducer = (state = false, action) => {
  switch(action.type){
    case 'CHANGE_EDIT_MODE_STATUS':
      return action.status;
    default:
      return state
  }
}
