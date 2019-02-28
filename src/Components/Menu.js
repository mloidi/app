import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faUser,
  faCogs,
  faAddressBook,
  faClipboard,
  faEdit,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

import Auth from '../common/auth.common';

const MenuHeader = styled.div`
  border-bottom: 0.1rem solid #005d04;
  background-color: white;
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-size: 2rem;
  margin-left: 2rem;
  padding: 0.5rem 1rem;
  background: #005d04;
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  transform: skew(-7deg);
  text-align: center;
  .logoLink {
    border: 0;
    color: white;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
  }
`;

const MenuUL = styled.ul`
  align-items: left;
  font-size: 1.5rem;
  list-style-type: none;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  .linkA {
    padding: 0.5rem;
    color: #005d04;
    text-decoration: none;
    font-size: 2rem;
    cursor: pointer;
    &:hover,
    &:focus {
      outline: none;
      color: green;
    }
  }
  .selected {
    color: green;
    outline: none;
  }
`;

const LogOut = styled.button`
  border: none;
  background-color: white;
  align-items: left;
  font-size: 1.5rem;
  color: #005d04;
  font-size: 2rem;
  cursor: pointer;
  &:hover,
  &:focus {
    outline: none;
    color: green;
  }
`;

export default class Menu extends Component {
  logOut = () => {
    Auth.deauthenticateUser();
    window.location.reload();
  };

  render() {
    return (
      <React.Fragment>
        <MenuHeader>
          <Logo>
            <Link className="logoLink" exact to={'/'}>
              ml
            </Link>
          </Logo>
          <MenuUL>
            <li>
              <Link
                className="linkA"
                activeClassName="selected"
                exact
                to={'/address'}
              >
                <FontAwesomeIcon icon={faAddressBook} />
              </Link>
            </li>
            <li>
              <Link
                className="linkA"
                activeClassName="selected"
                exact
                to={'/resume'}
              >
                <FontAwesomeIcon icon={faClipboard} />
              </Link>
            </li>
            <li>
              <Link
                className="linkA"
                activeClassName="selected"
                exact
                to={'/blog'}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Link>
            </li>
          </MenuUL>
          <MenuUL>
            <li>
              <Link
                className="linkA"
                activeClassName="selected"
                exact
                to={'/admin'}
              >
                <FontAwesomeIcon icon={faCogs} />
              </Link>
            </li>
            <li>
              <Link
                className="linkA"
                activeClassName="selected"
                exact
                to={'/message'}
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </Link>
            </li>
            <li>
              <Link
                className="linkA"
                activeClassName="selected"
                exact
                to={'/account'}
              >
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </li>
            <li>
              <LogOut onClick={() => this.logOut()}>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </LogOut>
            </li>
          </MenuUL>
        </MenuHeader>
      </React.Fragment>
    );
  }
}
