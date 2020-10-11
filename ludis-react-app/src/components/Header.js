import React from 'react';
import '../css/Header.css';

function Header() {
  return (
    <div id="header">
      <table>
        <tr>
          <td><img src="../ludis.png" id="header-logo"/></td>
          <td><div className="title"> Ludis </div></td>
        </tr>
      </table>
    </div>
  );
}

export default Header;

