import React, {Component} from 'react';
import AdminClientGeneralChart1 from '../components/AdminClientGeneralChart1';
import AdminClientGeneralChart2 from '../components/AdminClientGeneralChart2';
import AdminClientGeneralChart3 from '../components/AdminClientGeneralChart3';
import AdminClientGeneralChart4 from '../components/AdminClientGeneralChart4';
import AdminClientGeneralChart5 from '../components/AdminClientGeneralChart5';

class ClientGeneralAnalysis extends Component{
render(){
    return(
        <div>
            <h3>회원 분석</h3>
            <AdminClientGeneralChart1/>
            <AdminClientGeneralChart2/>
            <AdminClientGeneralChart3/>
            <AdminClientGeneralChart4/>
            <AdminClientGeneralChart5/>
        </div>
    )
}
}

export default ClientGeneralAnalysis;