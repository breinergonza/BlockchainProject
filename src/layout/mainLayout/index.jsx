import React, { Component,Fragment } from 'react';
import Sidebar from '../../containers/templateConfig/sidebar';
import Header from '../../containers/templateConfig/header';
import Settings from '../../containers/templateConfig/settings';
import ContentWrapper from './contentWrapper';
// import MessageBox from '../header/component/headerchat';

class MainLayout extends Component {
  render() {
    return (
      <Fragment>
        <Sidebar />
        <Header />
        <ContentWrapper {...this.props} />
        {this.props.templetConfigBlock && <Settings />}
        {/* <MessageBox /> */}
      </Fragment>
    );
  }
}

export default MainLayout;