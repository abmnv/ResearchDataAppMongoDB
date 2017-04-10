import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import * as actions from 'actions';

const Login = React.createClass({

  handleLogin() {
    const {dispatch, redirectUrl} = this.props;

    dispatch(actions.startLogin()).then(() => {
      return dispatch(actions.setRedirectUrl(''));
    }).then(() => {
      hashHistory.push(redirectUrl);
    });
  },

  render () {
    return (
      <div className="callout callout-auth">
        <p>
          Login with GitHub account
        </p>
        <button className="button" onClick={this.handleLogin}>Login with GitHub</button>
      </div>
    )
  }
});

export default connect(({redirectUrl}) => {
  return {redirectUrl};
})(Login);
