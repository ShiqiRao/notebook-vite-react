import React, { useState } from "react";
import { IFolder } from "../../common/IFolder";
import { INote } from "../../common/INote";
import { db } from "../../common/Model";
import { selectFolder, setCurrentFolder } from "../../reducer/folder";
import { selectNote, setNoteList } from '../../reducer/note';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import "./Editor.scss";

function Editor() {
    const note = useAppSelector(selectNote)
    const folder = useAppSelector(selectFolder)
    const [showDropDown, setShowDropDown] = useState(false)
    const dispatch = useAppDispatch()
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        let toUpdate = new INote()
        toUpdate.id = note.currentNote.id
        toUpdate.content = e.target.value
        db.updateNote(toUpdate)
            .then(res => {
                dispatch(setNoteList(note.noteList.map(item => {
                    if (item.id == note.currentNote.id) {
                        return Object.assign({}, item, {
                            id: item.id,
                            content: e.target.value,
                            create_at: item.create_at,
                            update_at: Date.now()
                        })
                    }
                    return item
                })))
            })

    }

    function handleFolderSelect(item: IFolder) {
        dispatch(setCurrentFolder(item))
    }

    return <div className="editor">
        <div className="editor__panel">
            <div onClick={(e) => { setShowDropDown(!showDropDown) }} className="editor__folder">
                <span className="editor__foldericon"></span>
                {folder.currentFolder.name ? folder.currentFolder.name : "默认文件夹"}
                <span className="editor__arrowicon"></span>
                {showDropDown && <div className="drop-down">
                    <div className="drop-down__list">
                        {folder.folderList.map(item => <div key={item.id}
                            className={"drop-down__item" + (folder.currentFolder.id == item.id ? " active" : "")}
                            onClick={() => handleFolderSelect(item)}
                        >{item.name}</div>)}
                    </div>
                </div>}
            </div>
        </div>
        <textarea key={note.currentNote.id} onChange={handleChange} placeholder="请输入" defaultValue={note.currentNote.content} className="editor__textarea"></textarea>
    </div >
}

export default Editor