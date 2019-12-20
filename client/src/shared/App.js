import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AdminCeoSalesAnalysis, CeoMain, AdminClientSalesAnalysis,ClientGeneralAnalysis,UserManagement,CeoManagement} from 'pages';
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
                <Route exact path="/adminCeoSalesAnalysis" component={AdminCeoSalesAnalysis}/>
                <Route exact path="/AdminClientSalesAnalysis" component={AdminClientSalesAnalysis}/>
                <Route exact path="/clientGeneralAnalysis" component={ClientGeneralAnalysis}/>
                <Route path="/UserManagement" component={UserManagement}/>
                <Route path="/CeoManagement" component={CeoManagement}/>
                </div>

            </div>
        );
    }
}

export default App;