import React from "react";
import { NavLink } from "react-router-dom";
import './LeftNav.scss';

function LeftNav() {
    return <div className='left-nav'>
        <div className='left-nav__avatar'>
            <img src='https://avatars.githubusercontent.com/u/12002442?s=200&v=4'></img>
        </div>
        <NavLink className='left-nav__item' to="/note">
            <div className='left-nav__icon left-nav__icon__note'>
            </div>
            <div>
                笔记
            </div>
        </NavLink>
        <NavLink className='left-nav__item' to="/photo">
            <div className='left-nav__icon left-nav__icon__pic'>
            </div>
            <div>
                图片
            </div>
        </NavLink>
        <NavLink className='left-nav__item' to="/audio">
            <div className='left-nav__icon left-nav__icon__audio'>
            </div>
            <div>
                音频
            </div>
        </NavLink>
        <NavLink className='left-nav__item' to="/folder">
            <div className='left-nav__icon left-nav__icon__folder'>
            </div>
            <div>
                分类
            </div>
        </NavLink>
        <NavLink className='left-nav__item' to="/star">
            <div className='left-nav__icon left-nav__icon__collection'>
            </div>
            <div>
                星标
            </div>
        </NavLink>
        <NavLink className='left-nav__item' to="/ashbin">
            <div className='left-nav__icon left-nav__icon__ashbin'>
            </div>
            <div>
                回收
            </div>
        </NavLink>
    </div>
}

export default LeftNav