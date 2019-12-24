import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AdminCeoSalesAnalysis, CeoMain, AdminClientSalesAnalysis,ClientGeneralAnalysis,UserManagement,CeoManagement,Posts,AdminCeoSalesDetail,AdminCeoGeneralAnalysis,AdminCeoGeneralDetail} from 'pages';
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
                <Route exact path="/AdminCeoGeneralAnalysis" component={AdminCeoGeneralAnalysis}/>
                <Route path="/UserManagement" component={UserManagement}/>
                <Route path="/CeoManagement" component={CeoManagement}/>

                <Route path="/posts" component={Posts}/>
                <Route path="/adminCeoSalesDetail/:phone/:ceo" component={AdminCeoSalesDetail}/>
                <Route path="/adminCeoGeneralDetail/:phone/:ceo" component={AdminCeoGeneralDetail}/>
                </div>
            </div>
        );
    }
}

export default App;