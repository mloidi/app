import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import SkillTable from './SkillTable';

export default class Skill extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Skills</title>
        </Helmet>
        <SkillTable {...this.props} />
      </React.Fragment>
    );
  }
}
