import React, { Component } from 'react';

import { Link } from 'react-router';
import { List, ListItem } from 'material-ui/List';

import Items from './items';

export default class ListPage extends Component {

  render() {
    return (
      <div>
        <List>
          {Items.map(item => <Link key={item.id} to={`/list/${item.id}`}><ListItem primaryText={item.title} /></Link>)}
        </List>

        {/* ここにdetailが表示される */}
        {this.props.children}
      </div>
    );
  }
}
