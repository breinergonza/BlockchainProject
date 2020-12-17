import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Row, Col, Button, Nav, NavItem, NavLink, TabContent, TabPane, FormGroup, Label } from 'reactstrap';
import classnames from 'classnames';

class Setting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      setting: false,
      activeTab: "1",
      prebuild: false,
      styler: true
    }
    this.toggleTab = this.toggleTab.bind(this);
    this.togglePrebuild = this.togglePrebuild.bind(this)
    this.toggleStyler = this.toggleStyler.bind(this)
    this.toggleSettings = this.toggleSettings.bind(this)
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  togglePrebuild() {
    this.setState(prevState => ({ setting: true, prebuild: !prevState.prebuild, styler: !prevState.styler }))
  }
  toggleStyler() {
    this.setState(prevState => ({ setting: true, prebuild: false, styler: true }))
  }
  toggleSettings() {
    this.setState(prevState => ({ setting: !prevState.setting, prebuild: false, styler: true }))
  }

  render() {

    return (
      <div className={classnames("menu-styler", {
        open: this.state.setting && this.state.styler,
        "open prebuild-open": this.state.setting && this.state.prebuild,
      })}>
        
      </div>
    );
  }
}

export default Setting;