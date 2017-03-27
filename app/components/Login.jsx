import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';

const Login = React.createClass({

  handleLogin() {
    const {dispatch} = this.props;

    dispatch(actions.startLogin());
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

export default Redux.connect()(Login);
