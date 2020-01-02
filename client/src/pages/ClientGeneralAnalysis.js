import React, {Component} from 'react';
import AdminClientGeneralChart1 from '../components/AdminClientGeneralChart1';
import AdminClientGeneralChart2 from '../components/AdminClientGeneralChart2';
import AdminClientGeneralChart3 from '../components/AdminClientGeneralChart3';
import AdminClientGeneralChart4 from '../components/AdminClientGeneralChart4';
import AdminClientGeneralChart5 from '../components/AdminClientGeneralChart5';
import '../css/ClientGeneralAnalysis.css'

class ClientGeneralAnalysis extends Component{
render(){
    return(
        <div className="contents">
            <h3>회원 분석</h3>
            <div className="general-all-chart">
                <div className="user-genre">
                    <div className="user">
                        <AdminClientGeneralChart1/>
                    </div>
                    <div className="genre">
                        <AdminClientGeneralChart2/>
                    </div>
                </div>
                <div className="funnel-age-gender">
                    <div className="funnel">
                        <AdminClientGeneralChart3/>
                    </div>
                    <div className="age">
                        <AdminClientGeneralChart4/>
                    </div>
                    <div className="gender">
                        <AdminClientGeneralChart5/>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default ClientGeneralAnalysis;