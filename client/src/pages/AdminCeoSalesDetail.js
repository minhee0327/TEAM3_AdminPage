import React from 'react';
import AdminCeoSalesChart1 from 'components/AdminCeoSalesChart1';
import AdminCeoSalesChart2 from 'components/AdminCeoSalesChart2';
import AdminCeoSalesChart3 from 'components/AdminCeoSalesChart3';
import AdminCeoSalesChart4 from 'components/AdminCeoSalesChart4';
import AdminCeoSalesChart5 from 'components/AdminCeoSalesChart5';

const AdminCeoSalesDetail =({match}) => {
    console.log(match.params)
    return (
        <div>
            {/* <h3>{match.params.phone} 사장님 매출분석 </h3> */}
            <h3>{match.params.ceo} 사장님의 매출 분석</h3>
            <AdminCeoSalesChart1 phone={match.params.phone} ceo={match.params.ceo}/>
            <AdminCeoSalesChart2 phone={match.params.phone} ceo={match.params.ceo}/>
            <AdminCeoSalesChart3 phone={match.params.phone} ceo={match.params.ceo}/>
            <AdminCeoSalesChart4 phone={match.params.phone} ceo={match.params.ceo}/>
            <AdminCeoSalesChart5 phone={match.params.phone} ceo={match.params.ceo}/>


        </div>
    )
}

export default AdminCeoSalesDetail;