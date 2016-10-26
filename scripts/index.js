import React, { Component } from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import './index.css';

injectTapEventPlugin();

class Root extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    };
  }

  onMenuStateChange(showMenu) {
    this.setState({ showMenu });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="React HandsOn vol.03"
              onLeftIconButtonTouchTap={() => this.onMenuStateChange(true)}
            />
            <h1>Hello</h1>

            <Drawer
              docked={false}
              open={this.state.showMenu}
              width={200}
              onRequestChange={show => this.onMenuStateChange(show)}
            >
              <MenuItem>Home</MenuItem>
              <MenuItem>List</MenuItem>
            </Drawer>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

render(<Root />, document.getElementById('app'));
