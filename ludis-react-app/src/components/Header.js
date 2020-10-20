import React from 'react';
import '../css/Header.css';
import Navigation from '../components/Navigation';

function Header() {
  return (
    <div id="header">
      <table cellspacing="0">
        <tr>
          <td id="hamburger-column"><Navigation /></td>
          <td id="logo-column"><img src="./ludis-logo.png" id="header-logo"/></td>
          <td id="title-column"><div className="title"> Ludis </div></td>
          <td id="user-column">Gilron Tsabkevich</td>
          <td id="avatar-column"><img src="default-avatar.png" id="profile-avatar"></img></td>
        </tr>
      </table>
    </div>
  );
}

export default Header;

