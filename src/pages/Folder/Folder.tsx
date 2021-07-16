import React, { useEffect, useState } from "react"
import iconClose from "../../assets/images/close.svg"
import { IFolder } from "../../common/IFolder"
import { db } from "../../common/Model"
import Search from "../../components/Search/Search"
import "./Folder.scss"

function Folder() {
    const [showModal, setShowModal] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [folderList, setFolderList] = useState<IFolder[]>([])
    function initData() {
        db.getFolder()
            .then(res => {
                console.log(res)
                setFolderList(res)
            })
    }

    useEffect(() => {
        initData()
    }, [])

    function createFolder() {
        db.addFolder(inputValue)
        setShowModal(false)
        initData()
    }

    function changeInputValue(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value)
        setInputValue(e.target.value)
    }

    return <div className="folder">
        <div className="folder__topbar">
            <Search></Search>
            <div className="folder__create" onClick={() => { setShowModal(true) }}>
                新建文件夹
            </div>
        </div>
        <div className="folder__body">
            <div className="folder__title">全部分类 ({folderList.length})</div>
            <div className="folder__list">
                {folderList.map(item =>
                    <div key={item.id}
                        className="folder__item">{item.name} <span>(1)</span></div>
                )}

            </div>
        </div>
        {showModal && <div className="modal" >
            <div className="modal__content">
                <div className="modal__title">新建文件夹</div>
                <div className="modal__close">
                    <img src={iconClose} onClick={() => { setShowModal(false) }}></img>
                </div>
                <div className="modal__input">
                    <input onChange={(e) => { changeInputValue(e) }}></input>
                </div>
                <div className="modal__footer">
                    <div className="modal__button cancel" onClick={() => { setShowModal(false) }}>取消</div>
                    <div className="modal__button" onClick={() => { createFolder() }}>完成</div>
                </div>
            </div>
        </div>}
    </div>
}

export default Folder