import React from 'react';


const AdminCeoGeneralDetail =({match}) => {
    console.log(match.params)
    return (
        <div>
            {/* <h3>{match.params.phone} 사장님 매출분석 </h3> */}
            <h3>{match.params.ceo} 사장님의 일반 분석</h3>
        </div>
    )
}

export default AdminCeoGeneralDetail;