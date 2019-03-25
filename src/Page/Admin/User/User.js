import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import UserTable from './UserTable';

export default class User extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Users</title>
        </Helmet>
        <UserTable {...this.props} />
      </React.Fragment>
    );
  }
}
