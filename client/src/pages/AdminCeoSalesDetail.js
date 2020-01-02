import React from 'react';
import AdminCeoSalesChart1 from 'components/AdminCeoSalesChart1';
import AdminCeoSalesChart2 from 'components/AdminCeoSalesChart2';
import AdminCeoSalesChart3 from 'components/AdminCeoSalesChart3';
import AdminCeoSalesChart4 from 'components/AdminCeoSalesChart4';
import AdminCeoSalesChart5 from 'components/AdminCeoSalesChart5';
import AdminCeoSalesChart6 from 'components/AdminCeoSalesChart6';
import AdminCeoSalesChart7 from 'components/AdminCeoSalesChart7';
import AdminCeoSalesChart8 from 'components/AdminCeoSalesChart8';
import "css/ClientSalesAnalysis.css";

const AdminCeoSalesDetail =({match}) => {
    console.log(match.params)
    return (
        <div>
            {/* <h3>{match.params.phone} 사장님 매출분석 </h3> */}
            <h3>{match.params.ceo} 사장님의 매출 분석</h3>
            <div className="detail-total-value">
            <AdminCeoSalesChart1 phone={match.params.phone} ceo={match.params.ceo}/>
            <AdminCeoSalesChart2 phone={match.params.phone} ceo={match.params.ceo}/>
            <AdminCeoSalesChart3 phone={match.params.phone} ceo={match.params.ceo}/>
            <AdminCeoSalesChart4 phone={match.params.phone} ceo={match.params.ceo}/>
            </div>
            <div className="all-chart">
                <div className="chart">
                <AdminCeoSalesChart5 phone={match.params.phone} ceo={match.params.ceo}/>
                </div>
                <div className="chart">
                <AdminCeoSalesChart6 phone={match.params.phone} ceo={match.params.ceo}/>
                </div>
                <div className="chart">
                <AdminCeoSalesChart7 phone={match.params.phone} ceo={match.params.ceo}/>
                </div>
                <div className="chart">
                <AdminCeoSalesChart8 phone={match.params.phone} ceo={match.params.ceo}/>
                </div>
            </div>
        </div>
    )
}

export default AdminCeoSalesDetail;