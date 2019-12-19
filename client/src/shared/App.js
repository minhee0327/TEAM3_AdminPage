import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, AdminCeoSalesAnalysis, CeoMain, AdminClientSalesAnalysis,ClientGeneralAnalysis} from 'pages';
import Menu from 'components/Menu';


class App extends Component {

      render(){
        return (
            <div>
                <Switch>
                <Route path="/CeoMain" component={CeoMain}/>
                <div>
                <Menu/>
                </div>
                </Switch>
                <hr/>
                <div>
                <Route exact path="/" component={Home}/>
                <Route exact path="/adminCeoSalesAnalysis" component={AdminCeoSalesAnalysis}/>
                <Route exact path="/AdminClientSalesAnalysis" component={AdminClientSalesAnalysis}/>
                <Route exact path="/clientGeneralAnalysis" component={ClientGeneralAnalysis}/>
                </div>

            </div>
        );
    }
}

export default App;