import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';

import * as actions from 'actions';

var EnsureLoggedInContainer = React.createClass({

  componentDidMount () {
    const {isLoggedIn, currentUrl, dispatch} = this.props;

    if(!isLoggedIn){
      dispatch(actions.setRedirectUrl(currentUrl));
      hashHistory.push('/login');
    }
  },

  render () {
    const {isLoggedIn} = this.props;
    if(isLoggedIn){
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
    isLoggedIn: state.isLoggedIn,
    currentUrl: ownProps.location.pathname
  }
})(EnsureLoggedInContainer);
