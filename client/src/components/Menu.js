import React from 'react';
import { NavLink } from 'react-router-dom';


const Menu = () => {
    const activeStyle = {
        color: 'green',
        // fontSize: '2rem'
    };

    return (
        <div>
            <ul>
                <li><NavLink exact to="/CeoMain" activeStyle={activeStyle}>샘플테스트</NavLink></li>
                <li><NavLink exact to="/UserManagement" activeStyle={activeStyle}>계정관리</NavLink></li>
                    <ul>
                        <li><NavLink exact to="/userManagement" activeStyle={activeStyle}>회원계정</NavLink></li>
                        <li><NavLink exact to="/ceoManagement" activeStyle={activeStyle}>사장님계정</NavLink></li>
                        <li><NavLink exact to="/blacklistManagement" activeStyle={activeStyle}>블랙리스트 관리</NavLink></li>
                    </ul>
                <li><NavLink exact to="/adminClientSalesAnalysis" activeStyle={activeStyle}>분석</NavLink></li>
                    <ul>
                        <li><NavLink exact to="/adminClientSalesAnalysis" activeStyle={activeStyle}>회원 매출 분석</NavLink></li>
                        <li><NavLink exact to="/adminCeoSalesAnalysis" activeStyle={activeStyle}>사장님 매출 분석</NavLink></li>
                        <li><NavLink exact to="/clientGeneralAnalysis" activeStyle={activeStyle}>회원 분석</NavLink></li>
                        <li><NavLink exact to="/adminCeoGeneralAnalysis" activeStyle={activeStyle}>사장님 분석</NavLink></li>
                    </ul>
                <li><NavLink exact to="/ReviewManagement" activeStyle={activeStyle}>후기관리</NavLink></li>
            </ul>
            
        </div>
    );
};

export default Menu;