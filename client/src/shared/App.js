import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import { Home, About, Posts } from 'pages';
import Menu from 'components/Menu';

const style ={
    display:"inline-block"
}

class App extends Component {

      render(){
        return (
            <div>
                <div style={style}>
                <Menu/>
                </div>
                <div style={style}>
                <Route exact path="/" component={Home}/>
                <Switch>
                    <Route path="/about/:name" component={About}/>
                    <Route path="/about" component={About}/>
                </Switch>
                <Route path="/posts" component={Posts}/>
                </div>

            </div>
        );
    }
}

export default App;