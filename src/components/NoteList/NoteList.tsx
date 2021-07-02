import { format } from 'date-fns';
import React, { useEffect, useState } from "react";
import clockIcon from "../../assets/images/clock.svg";
import searchIcon from "../../assets/images/search.svg";
import { INote } from '../../common/INote';
import Model from '../../common/Model';
import { selectCurrentNote, selectNote, updateNoteList } from '../../reducer/note';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import "./NoteList.scss";

function NoteList() {
    const [model, setModel] = useState<Model>(new Model())
    const note = useAppSelector(selectNote)
    const dispatch = useAppDispatch()
    useEffect(() => {
        initData()
    }, [])

    function initData() {
        model.getNote()
            .then(res => {
                dispatch(updateNoteList(res))
                dispatch(selectCurrentNote(res[0]))
            })
    }

    function handleAddNote() {
        model.addNote()
            .then(res => {
                initData()
            })
    }

    function handleSelectNote(item: INote) {
        console.debug(item, "handleSelectNote")
        console.debug(new Date(item.update_at), "update_at_date")
        dispatch(selectCurrentNote(item))
    }

    function handleScroll(event: React.UIEvent<HTMLElement, UIEvent>) {
        const { scrollHeight, scrollTop } = event.currentTarget
        const domHeight = event.currentTarget.getBoundingClientRect().height
        if(scrollHeight <= scrollTop + domHeight){
            console.log('bottom')
        }
    }

    return <div className="note-list" onScroll={(e) => handleScroll(e)}>
        <div className="note-list__topbar">
            <input></input>
            <img className="note-list__search" src={searchIcon}></img>
            <div onClick={handleAddNote} className="note-list__add"></div>
        </div>
        {note.noteList.map(item => <div key={item.id} onClick={() => { handleSelectNote(item) }} className={"note-list__note" + (item.id == note.currentNote.id ? ' active' : '')}>
            <div className="note-list__title">{item.content == '' ? format(new Date(item.create_at), "yyyy年MM月dd日") : item.content.substring(0, 10)}</div>
            <div className="note-list__detail">{item.content}</div>
            <div className="note-list__time">
                <img src={clockIcon} />
                {format(new Date(item.update_at), "yyyy/MM/dd hh:mm")}
            </div>
        </div>)
        }

    </div >
}

export default NoteList