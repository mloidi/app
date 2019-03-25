import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import ItemTypeTable from './ItemTypeTable';

export default class ItemType extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>ItemType</title>
        </Helmet>
        <ItemTypeTable {...this.props} />
      </React.Fragment>
    );
  }
}
