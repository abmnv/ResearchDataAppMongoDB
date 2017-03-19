import React from 'react';
import {Link, IndexLink} from 'react-router';

var Nav = React.createClass({

  render: function(){
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">
              Neuroimaging Acupuncture
            </li>
            <li>
              <IndexLink activeClassName="active-link" to="/">Projects</IndexLink>
            </li>
            <li>
              <Link activeClassName="active-link" to="/edit_projects">Edit Projects</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

export default Nav;
