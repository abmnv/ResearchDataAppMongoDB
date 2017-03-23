import React from 'react';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';

import * as actions from 'actions';

var Nav = React.createClass({

  handleSubmit (e) {
    e.preventDefault();

    var searchText = this.refs.projectName.value;

    var {dispatch} = this.props;

    this.refs.projectName.value = '';
    //console.log('Search text:', searchText);

    dispatch(actions.setSearchText(searchText));
  },

  render: function(){
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">
              Neuroimaging Archive
            </li>
            <li>
              <IndexLink activeClassName="active-link" activeStyle={{fontWeight:'bold'}} to="/">Projects</IndexLink>
            </li>
            <li>
              <Link activeClassName="active-link" activeStyle={{fontWeight:'bold'}} to="/edit_projects">Edit Projects</Link>
            </li>
          </ul>
        </div>
        <div className="top-bar-right">
          <form onSubmit={this.handleSubmit}>
            <ul className="menu">
              <li>
                <input type="search" ref="projectName" placeholder="Search"/>
              </li>
              <li>
                <input type="submit" className="button" value="Search"/>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
});

export default connect(null, null, null, {pure:false})(Nav);
//export default Nav;
