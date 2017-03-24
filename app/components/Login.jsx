import React from 'react';

var Login = React.createClass({

  render () {
    return (
      <div className="callout callout-auth">
        <p>
          Login with GitHub account
        </p>
        <button className="button">Login with GitHub</button>
      </div>
    )
  }
});

export default Login;
