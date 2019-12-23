import React from 'react';
import AdminCeoSalesChart1 from 'components/AdminCeoSalesChart1';

const Test =({match}) => {
    console.log(match.params)
    return (
        <div>
            {/* <h3>{match.params.phone} 사장님 매출분석 </h3> */}
            <h3>{match.params.ceo} 사장님 매출 분석</h3>
            <AdminCeoSalesChart1 phone={match.params.phone} ceo={match.params.ceo}/>
        </div>
    )
}

export default Test;