import { format } from 'date-fns';
import React, { useEffect } from "react";
import clockIcon from "../../assets/images/clock.svg";
import { INote } from '../../common/INote';
import { db } from '../../common/Model';
import { selectFolder } from '../../reducer/folder';
import { fetchNote, selectNote, setCurrentNote } from '../../reducer/note';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Search from '../Search/Search';
import "./NoteList.scss";

function NoteList() {
    const note = useAppSelector(selectNote)
    const folder = useAppSelector(selectFolder)
    const dispatch = useAppDispatch()
    useEffect(() => {
        fetchData(true)
    }, [])

    function fetchData(firstPage: boolean) {
        folder.currentFolder
            ? dispatch(fetchNote({ firstPage, page: note.page, folder_id: folder.currentFolder.id }))
            : dispatch(fetchNote({ firstPage, page: note.page }))
    }

    function handleAddNote() {
        if (folder.currentFolder && folder.currentFolder.id) {
            db.addNote(folder.currentFolder.id)
                .then(res => {
                    fetchData(true)
                })
        }
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
            <Search></Search>
            <div onClick={handleAddNote} className="note-list__add"></div>
        </div>
        <div className="note-list__container">
            {note.noteList.map(item =>
                <div key={item.id} onClick={() => { handleSelectNote(item) }}
                    className={"note-list__note" + (item.id == note.currentNote.id ? ' active' : '')}>
                    <div className="note-list__title">{item.content == '' ? format(new Date(item.create_at), "yyyy年MM月dd日") : item.content.substring(0, 10)}</div>
                    <div className="note-list__detail">{item.content}</div>
                    <div className="note-list__time">
                        <img src={clockIcon} />
                        {format(new Date(item.update_at), "yyyy/MM/dd hh:mm")}
                    </div>
                </div>)
            }
        </div>
    </div >
}

export default NoteList