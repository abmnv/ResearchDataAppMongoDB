import React from 'react';
import {Link, IndexLink, hashHistory} from 'react-router';
import {connect} from 'react-redux';

import * as actions from 'actions';
import LoginModal from 'LoginModal';

class Nav extends React.Component {

  constructor(props){
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpenLoginModal = () => {
    const {dispatch} = this.props;

    dispatch(actions.setCurrentModal('Login'));
  }

  handleSubmit (e) {
    e.preventDefault();

    var searchText = this.refs.projectName.value;

    var {dispatch} = this.props;

    this.refs.projectName.value = '';
    //console.log('Search text:', searchText);

    dispatch(actions.setSearchText(searchText));

  }

  handleLogout (e) {
    e.preventDefault();

    const {dispatch} = this.props;

    dispatch(actions.startLogout());
    hashHistory.push('/');
  }

  render () {
    const {isAuth} = this.props;

    //const auth = isAuth ? (<Link activeClassName="active-link" onClick={this.handleLogout}>Logout</Link>) : (<Link activeClassName="active-link" to="/login">Login</Link>);
    const auth = isAuth ? (<Link activeClassName="active-link" onClick={this.handleLogout}>Logout</Link>) : (<button className='login-button' onClick={this.handleOpenLoginModal}>Login</button>);

    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">
              Neuroimaging Archive
            </li>
            <li>
              <IndexLink activeClassName="active-link" to="/">Projects</IndexLink>
            </li>
            <li>
              <Link activeClassName="active-link" to="/create-project">Create Project</Link>
            </li>
            <li>
              <Link activeClassName="active-link" to="/edit-projects">Edit Projects</Link>
            </li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li>
              <form onSubmit={this.handleSubmit}>
                <input type="search" ref="projectName" placeholder="Search"/>
              </form>
            </li>
            <li>
              {auth}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(({auth: {isAuth}}) => ({isAuth}), null, null, {pure:false})(Nav);
//export default Nav;
// <div onClick={this.handleLogout}>
//   Logout
// </div>
// <li>
//   <input type="submit" className="button" value="Search"/>
// </li>
