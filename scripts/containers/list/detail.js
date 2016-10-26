import React, { Component } from 'react';

import Items from './items';

export default class Detail extends Component {

  render() {
    // 何も選択されていないときの表示
    if (!this.props.params.id) {
      return (
        <div>リストから選択してください</div>
      );
    }

    // 表示するべきitemを探す（呪文）
    const item = Items.filter(i => i.id === +this.props.params.id)[0];

    return (
      <div>
        <h2>{item.title}</h2>
        <p>{item.contents}</p>
      </div>
    );
  }
}