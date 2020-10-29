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
          <td id="user-column">
            <div id="user-dropdown-select">
              <div id="header-username">
                Gilron Tsabkevich
              </div>
              <div>
                <img src="default-avatar.png" id="profile-avatar"></img>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Header;

