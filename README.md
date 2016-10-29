# React.js ハンズオン #3

ハンズオンのベースになるリポジトリです。このコードを修正していきます。

## 技術要素
* React.js
* [Material UI](http://www.material-ui.com)
* [React Router](https://github.com/ReactTraining/react-router)（今回学ぶこと）
* [Webpack](https://webpack.github.io/)
* [Style Loader](https://github.com/webpack/style-loader)

## 準備&動作確認

```
$ git clone https://github.com/mokumoku-temple/react-handson_vol03
$ cd ./react-handson_vol03
$ npm install
$ npm start
```

`localhost:1029`にアクセスすると、下記のページが表示されます。ハンバーガーボタンを押すとメニューが表示されます。
このサンプルを、`react-router`を使いながらSPA（Single Page Application）化していきます。

![](./images/1.png)

## ディレクトリ構成

今回は、主に`scripts`ディレクトリ以下のファイルを編集していきます。

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

#### scripts/containers/home/index.js

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

#### scripts/containers/list/index.js

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

### 共通部分のコンポーネント

ヘッダ部分など、どのページでも共通で使うコンポーネントを`app/index.js`に書きます。

`scripts/containers/app/index.js`を新規作成して、そこに`scripts/index.js`の内容をコピペします。
コピペした後に、`scripts/containers/app/index.js`に次の変更を加えます。
* `MuiThemeProvider`のタグを削除（閉じタグも忘れずに）
* `injectTapEventPlugin()`を削除
* 最後の閉じdivタグの前に、`{this.props.children}`を追加

最終的には、次のようなコードになります。（よくわからなくなったらコピペしましょう）

#### scripts/containers/app/index.js

```js
import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class App extends Component {

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
        <AppBar
          title="React HandsOn vol.03"
          onLeftIconButtonTouchTap={() => this.onMenuStateChange(true)}
        />

        <Drawer
          docked={false}
          open={this.state.showMenu}
          width={200}
          onRequestChange={show => this.onMenuStateChange(show)}
        >
          <MenuItem>Home</MenuItem>
          <MenuItem>List</MenuItem>
        </Drawer>
        {/* ここまでヘッダ部分 */}

        {/* ここにページの要素が入る */}
        {this.props.children}
      </div>
    );
  }
}
```

### ルーティングの設定

ルーティングに必要なモジュールと、先ほど作成したコンポーネントを読み込みます。

#### scripts/index.js

```js
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './containers/app';
import Home from './containers/home';
import List from './containers/list';
```

ルートコンポーネントを次のように書き換えます。

```js
class Root extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Home} />

            <Route path="/list" component={List} />
          </Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}
```

`react-router`で使うモジュールの概要。

| 名前 | 概要 |
| --- | --- |
| Router | このエレメントに含まれる部分が、ルーティングの対象になる |
| hashHistory | ブラウザの履歴管理をするモジュール |
| Route | 「このパスのときはこのコンポーネントを表示する」という定義 |
| IndexRoute | インデックスパス（`/`）へのアクセスのときに表示されるコンポーネントを指定 |

ここまでで、ルーティングの設定は完了です。次のURLにアクセスしてみましょう。

#### `http://localhost:1029/#/`

![](./images/2-1.png)

#### `http://localhost:1029/#/list`

![](./images/2-2.png)

### Linkの設定

ページ遷移用のリンク（HTMLで言うところの`href`）を作成します。
ヘッダのメニューにあるリストを、リンクに書き換えます。

#### scripts/containers/app/index.js

`import`を追加。

```js
import { Link } from 'react-router';
```

メニューを`<Link>`で囲む。

```js
<Link to="/"><MenuItem>Home</MenuItem></Link>
<Link to="/list"><MenuItem>List</MenuItem></Link>
```

これで、メニューをクリックするとページ遷移するはずです。
`href`を使って、自分でページ遷移を書くこともできなくはないですが、`react-router`を使っているうちは基本的に`<Link>`を使いましょう。

### ネストしたページ

説明し辛いのでとりあえず書きましょう。
作るのはこんな感じの`List - Detail`構成のページです。

![](./images/3.png)

本当はajaxとかでデータを取ってきたら良いのですが、難しそうなのでやめておきました。
Listのデータを別ファイルで定義して、読み込みます。コピペで良いです。

#### scripts/containers/list/items.js

```js
export default [
  {
    id: 1,
    title: 'hoge',
    contents: `
    hogehoge
    ほげほげ
    ホゲホゲ
    `,
  },
  {
    id: 2,
    title: 'huga',
    contents: `
    hugahuga
    ふがふが
    フガフガ
    `,
  },
];
```

次にリストページに、上で定義したアイテムを表示します。

#### scripts/containers/list/index.js

importを追加。

```js
import { Link } from 'react-router';
import { List, ListItem } from 'material-ui/List';

import Items from './items';
```

JSX部分は以下のように修正します。長い所は、リストの内容をすべて表示する呪文です。

```js
export default class ListPage extends Component {
  render() {
    return (
      <div className="list">
        <List>
          {Items.map(item => <Link key={item.id} to={`/list/${item.id}`}><ListItem primaryText={item.title} /></Link>)}
        </List>

        {/* ここにdetailが表示される */}
        {this.props.children}
      </div>
    );
  }
}
```

ここまでで、リストは表示されるようになりましたが、まだdetailを表示するルーティングを書いていないので、クリックしてもエラーが出ます。

### detailsの表示

詳細を表示する`details`コンポーネントを作成します。

#### scripts/containers/list/detail.js

```js
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
```

次に、detailsを表示するためのルーティングを追記します。
`index.js`のListページのルーティングを次のように書き換えます。
pathで指定している`/:id`は、「任意の文字列を許容し、その文字列を`id`という名前のパラメータとしてコンポーネントが受け取る」という意味です。
先ほどの`detail`では、`this.props.params.id`という形で、渡されたidを受け取っています。

#### scripts/index.js

```js
import Detail from './containers/list/detail';
```

```js
<Route path="/list" component={List}>
  <IndexRoute component={Detail} />

  <Route path=":id" component={Detail} />
</Route>
```

### 完成
リストの要素をクリックすると、詳細情報が表示されます。

![](./images/4-1.png)

![](./images/4-2.png)

## Try It!
* 自分でコンポーネント、ルートを追加してみる
* cssファイルを追加してみる
* less/sass/stylusなどを組み込んでみる
