import React, { useContext, useState } from 'react';
import { NavLink as Link } from 'react-router-dom';

import { Area, LogoArea, MenuOptionsArea, EndArea, MenuBar } from './Style';
import { Button } from '../../css/GlobalStyle';
import { AuthContext } from '../../globalState';
import Icon from '../element/Icon';

export default function Menu() {
  const { logOut, user } = useContext(AuthContext);
  const [menu] = useState(() => {
    return [
      { icon: 'faHome', name: 'home', path: '/' },
      { icon: 'faUsers', name: 'users', path: '/user' },
      { icon: 'faUserEdit', name: 'user 1', path: '/user1' },
      { icon: 'faUserEdit', name: 'user 2 ', path: '/user2' },
      { icon: 'faUserEdit', name: 'user 3', path: '/user3' },
      { icon: 'faUserEdit', name: 'user 4', path: '/user4' }
    ];
  });
  return (
    <Area>
      <LogoArea>mloidi app</LogoArea>
      <MenuOptionsArea>
        <MenuBar>
          {menu.map(menu => (
            <li key={menu.name}>
              <Link
                className="link"
                activeClassName="selected"
                exact
                to={menu.path}
              >
                <Icon icon={menu.icon} />
                {' ' + menu.name}
              </Link>
            </li>
          ))}
        </MenuBar>
      </MenuOptionsArea>
      <EndArea>
        {user.firstName + ' ' + user.lastName}
        <Button onClick={() => logOut()} show={true}>
          <Icon icon="faSignOutAlt" />{' Log out'}
        </Button>
      </EndArea>
    </Area>
  );
}
