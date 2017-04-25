import React from 'react';
import Nav from 'Nav';
import ModalContainer from 'ModalContainer';

var Main = (props) => {
  return (
    <div>
      <Nav/>
      <ModalContainer/>
      <div className="row">
        <div className="column small-centered small-8 medium-6">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Main;
