import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Menu.css';

const Menu = () => {
    const activeStyle = {
        color: 'white',
        //fontSize: '1.2rem'
    };

    return (
        <div className="sidenav">
            <ul>
                <li><NavLink exact to="/login" activeStyle={activeStyle}>로그아웃</NavLink></li>
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
                        {/* <li><NavLink exact to="/adminCeoGeneralAnalysis" activeStyle={activeStyle}>사장님 분석</NavLink></li> */}
                    
                    </ul>
                <li><NavLink exact to="/ReviewManagement" activeStyle={activeStyle}>후기관리</NavLink></li>
            </ul>
            
        </div>
    );
};

export default Menu;