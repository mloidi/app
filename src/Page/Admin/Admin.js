import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSitemap,
  faCertificate,
  faClipboardList,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

import { PageDiv, SectionTitle, SectionContent } from '../../Components/Common';
import Skill from './Skill/Skill';
import Organization from './Organization/Organization';
import Button from '../../Components/Button';
import ItemType from './ItemType/ItemType';
import User from './User/User';

const HorizontalDiv = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto auto auto auto;
  grid-column-gap: 1rem;
  justify-items: start;
`;

export default class Admin extends Component {
  state = {
    showTab: 'organization'
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
              <Button
                font_size="1.5rem"
                onClick={() => this.showTab('itemType')}
              >
                <FontAwesomeIcon icon={faClipboardList} />
              </Button>
              <Button font_size="1.5rem" onClick={() => this.showTab('user')}>
                <FontAwesomeIcon icon={faUsers} />
              </Button>
            </HorizontalDiv>
            {this.state.showTab === 'skill' && <Skill  {...this.props}/>}
            {this.state.showTab === 'organization' && <Organization {...this.props}/>}
            {this.state.showTab === 'itemType' && <ItemType  {...this.props}/>}
            {this.state.showTab === 'user' && <User  {...this.props}/>}
          </SectionContent>
        </PageDiv>
      </React.Fragment>
    );
  }
}
