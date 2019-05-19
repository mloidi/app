import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import OrganizationTable from './OrganizationTable';

export default class Organization extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Organization</title>
        </Helmet>
        <OrganizationTable {...this.props} />
      </React.Fragment>
    );
  }
}
