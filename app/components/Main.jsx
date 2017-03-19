import React from 'react';
import Nav from 'Nav';

var Main = (props) => {
  return (
    <div>
      <Nav/>
      <div className="row top-margin">
        <div className="column small-centered small-8 medium-6">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Main;
