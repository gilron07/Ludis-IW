import React, {useContext} from 'react';
import '../css/Header.css';
import Navigation from '../components/Navigation';
import {UserContext} from "../services/UserContext";

function Header() {
  const {user} = useContext(UserContext);
  return (
    <div id="header">
      <table cellSpacing="0">
        <tbody>
        <tr>
          <td id="hamburger-column"><Navigation /></td>
          <td id="logo-column"><img src="/static/logoOnly.png" id="header-logo" alt="Ludis Logo"/></td>
          <td id="title-column"><div className="title">LUDIS</div></td>
          <td id="user-column">
            <div id="user-dropdown-select">
              <div id="header-username">
                {user.full_name}
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
