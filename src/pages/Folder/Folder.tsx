import React, { useState } from "react"
import iconClose from "../../assets/images/close.svg"
import Search from "../../components/Search/Search"
import "./Folder.scss"

function Folder() {
    const [showModal, setShowModal] = useState(false)
    return <div className="folder">
        <div className="folder__topbar">
            <Search></Search>
            <div className="folder__create" onClick={() => { setShowModal(true) }}>
                新建文件夹
            </div>
        </div>
        <div className="folder__body">
            <div className="folder__title">全部分类 (1)</div>
            <div className="folder__list">
                <div className="folder__item">我的第一个文件夹 <span>(1)</span></div>
            </div>
        </div>
        {showModal && <div className="modal" >
            <div className="modal__content">
                <div className="modal__title">新建文件夹</div>
                <div className="modal__close">
                    <img src={iconClose} onClick={() => { setShowModal(false) }}></img>
                </div>
                <div className="modal__input">
                    <input></input>
                </div>
                <div className="modal__footer">
                    <div className="modal__button cancel" onClick={() => { setShowModal(false) }}>取消</div>
                    <div className="modal__button">完成</div>
                </div>
            </div>
        </div>}
    </div>
}

export default Folder