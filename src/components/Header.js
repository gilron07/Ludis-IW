import React from 'react';
import '../css/Header.css';
import Navigation from '../components/Navigation';

function Header() {
  return (
    <div id="header">
      <table cellSpacing="0">
        <tbody>
        <tr>
          <td id="hamburger-column"><Navigation /></td>
          <td id="logo-column"><img src="/static/ludis-logo.png" id="header-logo" alt="Ludis Logo"/></td>
          <td id="title-column"><div className="title"> Ludis </div></td>
          <td id="user-column">
            <div id="user-dropdown-select">
              <div id="header-username">
                Gilron Tsabkevich
              </div>
              <div>
                <img src="/static/default-avatar.png" id="profile-avatar" alt="Profile Avatar"></img>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Header;

