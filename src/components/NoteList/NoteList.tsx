import React from "react";
import "./NoteList.scss";

function NoteList(){
    return <div className="note-list">
        <div className="note-list__topbar">
            <input></input>
        </div>
        <div className="note-list__note">
            <div className="note-list__title">这里是标题</div>
            <div className="note-list__detail">这里是明细</div>
        </div>
        <div className="note-list__note">
            <div className="note-list__title">这里是标题</div>
            <div className="note-list__detail">这里是明细</div>
        </div>
        <div className="note-list__note">
            <div className="note-list__title">这里是标题</div>
            <div className="note-list__detail">这里是明细</div>
        </div>
    </div>
}

export default NoteList