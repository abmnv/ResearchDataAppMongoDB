import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';

import * as actions from 'actions';

var EnsureLoggedInContainer = React.createClass({

  componentWillMount () {
    const {isAuth, currentUrl, dispatch} = this.props;
    //console.log('EnsureLoggedInContainer props:', this.props);

    if(!isAuth){
      dispatch(actions.setRedirectUrl(currentUrl)).then(() => {
        hashHistory.push('/login');
      });
    }
  },

  render () {
    const {isAuth} = this.props;

    if(isAuth){
      return (
        this.props.children
      )
    }else{
      return (
        null
      );
    }
  }

});

export default connect((state, ownProps) => {
  return {
    isAuth: state.auth.isAuth,
    currentUrl: ownProps.location.pathname
  }
})(EnsureLoggedInContainer);
