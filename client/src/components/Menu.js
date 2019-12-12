import React from 'react';
import { NavLink } from 'react-router-dom';

const menustyle ={
    width:"500px",
    heigh:"100%"
}

const Menu = () => {
    const activeStyle = {
        color: 'green',
        fontSize: '2rem'
    };

    return (
        <div menustyle={menustyle}>
            <ul>
                <li><NavLink exact to="/" activeStyle={activeStyle}>고객목록리스트</NavLink></li>
                <li><NavLink exact to="/about" activeStyle={activeStyle}>About</NavLink></li>
                <li><NavLink to="/about/foo" activeStyle={activeStyle}>About Foo</NavLink></li>
                <li><NavLink to="/posts" activeStyle={activeStyle}>Posts</NavLink></li>
            </ul>
            
        </div>
    );
};

export default Menu;