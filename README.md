# React.js ハンズオン #3

ハンズオンのベースになるリポジトリです。このコードを修正していきます。

## 準備&動作確認

```
$ git clone https://github.com/mokumoku-temple/react-handson_vol03
$ npm install
$ npm start
```

`localhost:3000`にアクセスすると、下記のページが表示されます。ハンバーガーボタンを押すとメニューが表示されます。
このサンプルを、`react-router`を使いながらSPA（Single Page Application）化していきます。

![](./images/01.png)

## ハンズオン
### ページの追加
`Home`と`List`という2つのページをもつアプリケーションを作成します。

まずは、それぞれのページ用のjsファイルを作成します。

```
containers/home/index.js
containers/list/index.js
```

ファイル名には、一般的に`index.js`という名前がよく使われます。これは、importしたときに自動的にそのディレクトリ以下の`index.js`を読み込んでくれるためです。
なので、たとえば`containers/home/index.js`をimportするときは、

```js
import Home from './containers/home';
```

となります。

`home/index.js`と`list/index.js`は、次のようにします。JSXの部分は、ページの違いがわかれば何でも良いです。

#### containers/home/index.js

```js
import React, { Component } from 'react';

export default class HomePage extends Component {

  render() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
  }
}
```

#### containers/list/index.js

```js
import React, { Component } from 'react';

export default class ListPage extends Component {

  render() {
    return (
      <div>
        <h2>List</h2>
      </div>
    );
  }
}
```


### ルーティングの設定


## Stack

* React
* Material-ui
* Webpack
* StyleLoader
