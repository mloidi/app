import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSitemap,
  faCertificate,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

import { PageDiv, SectionTitle, SectionContent } from '../../Components/Common';
import Skill from './Skill/Skill';
import Button from '../../Components/Button';

const HorizontalDiv = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto auto auto auto;
  grid-column-gap: 1rem;
  justify-items: start;
`;

export default class Admin extends Component {
  state = {
    showTab: ''
  };

  showTab = showTab => {
    this.setState({
      showTab
    });
  };

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Admin</title>
        </Helmet>
        <PageDiv>
          <SectionTitle>Admin</SectionTitle>
          <SectionContent>
            <HorizontalDiv>
              <Button
                font_size="1.5rem"
                onClick={() => this.showTab('organization')}
              >
                <FontAwesomeIcon icon={faSitemap} />
              </Button>
              <Button font_size="1.5rem" onClick={() => this.showTab('skill')}>
                <FontAwesomeIcon icon={faCertificate} />
              </Button>
              <Button font_size="1.5rem" onClick={() => this.showTab('user')}>
                <FontAwesomeIcon icon={faUsers} />
              </Button>
            </HorizontalDiv>
            {this.state.showTab === 'skill' && <Skill />}
          </SectionContent>
        </PageDiv>
      </React.Fragment>
    );
  }
}
