import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ReviewManagement, BlacklistManagement, AdminCeoSalesAnalysis, CeoMain, 
    AdminClientSalesAnalysis,ClientGeneralAnalysis,UserManagement,CeoManagement,
    Posts,AdminCeoSalesDetail,AdminCeoGeneralAnalysis,AdminCeoGeneralDetail} from 'pages';

import Menu from 'components/Menu';
import '../css/Menu.css';

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
                
                <div className="main">
                <Route exact path="/" component={UserManagement}/>
                <Route path="/userManagement" component={UserManagement}/>
                <Route path="/ceoManagement" component={CeoManagement}/>
                <Route exact path="/blacklistManagement" component={BlacklistManagement}/>
                
                <Route exact path="/AdminClientSalesAnalysis" component={AdminClientSalesAnalysis}/>

                <Route exact path="/adminCeoSalesAnalysis" component={AdminCeoSalesAnalysis}/>
                <Route path="/adminCeoSalesDetail/:phone/:ceo" component={AdminCeoSalesDetail}/>

                <Route exact path="/clientGeneralAnalysis" component={ClientGeneralAnalysis}/>

                <Route exact path="/AdminCeoGeneralAnalysis" component={AdminCeoGeneralAnalysis}/>
                <Route path="/adminCeoGeneralDetail/:phone/:ceo" component={AdminCeoGeneralDetail}/>

                <Route exact path="/ReviewManagement" component={ReviewManagement}/>

                <Route path="/posts" component={Posts}/>
                </div>
            </div>
        );
    }
}

export default App;