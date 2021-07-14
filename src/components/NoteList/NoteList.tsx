import { format } from 'date-fns';
import React, { useEffect, useState } from "react";
import clockIcon from "../../assets/images/clock.svg";
import searchIcon from "../../assets/images/search.svg";
import Search from '../Search/Search'
import { INote } from '../../common/INote';
import Model from '../../common/Model';
import { selectNote, setCurrentNote, setHasNext, setNoteList, setPage } from '../../reducer/note';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import "./NoteList.scss";

function NoteList() {
    const [model, setModel] = useState<Model>(new Model())
    const note = useAppSelector(selectNote)
    const dispatch = useAppDispatch()
    useEffect(() => {
        fetchData(true)
    }, [])

    function fetchData(firstPage: boolean) {
        const currentPage = firstPage ? 1 : note.page;
        model.getNote({
            limit: 12,
            page: currentPage
        })
            .then(res => {
                const list = res
                if (firstPage) {
                    dispatch(setNoteList(list))
                    list.length > 0 && dispatch(setCurrentNote(list[0]))
                } else {
                    dispatch(setNoteList(note.noteList.concat(res)))
                }
                if (list.length == 12) {
                    dispatch(setHasNext(true))
                    dispatch(setPage(currentPage + 1))
                } else {
                    dispatch(setHasNext(false))
                }
            })
    }

    function handleAddNote() {
        model.addNote()
            .then(res => {
                fetchData(true)
            })
    }

    function handleSelectNote(item: INote) {
        dispatch(setCurrentNote(item))
    }

    function handleScroll(event: React.UIEvent<HTMLElement, UIEvent>) {
        const { scrollHeight, scrollTop } = event.currentTarget
        const domHeight = event.currentTarget.clientHeight
        if (scrollHeight <= scrollTop + domHeight) {
            note.hasNext && fetchData(false)
        }
    }

    return <div className="note-list" onScroll={(e) => handleScroll(e)}>
        <div className="note-list__topbar">
            {/* <input></input>
            <img className="note-list__search" src={searchIcon}></img> */}
            <Search></Search>
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