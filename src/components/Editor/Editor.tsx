import React, { useState } from "react";
import ContentLoader from "react-content-loader";
import { IFolder } from "../../common/IFolder";
import { INote } from "../../common/INote";
import { db } from "../../common/Model";
import { selectFolder, setCurrentFolder } from "../../reducer/folder";
import { fetchNote, selectNote, setNoteList } from '../../reducer/note';
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

    function handleFolderSelect(item?: IFolder) {
        if (item) {
            dispatch(fetchNote({ firstPage: true, page: note.page, folder_id: item.id, deleted: false }))
        } else {
            dispatch(fetchNote({ firstPage: true, page: note.page, deleted: false }))
        }
        dispatch(setCurrentFolder(item))
    }

    const MyLoader = () => (
        <ContentLoader
            speed={2}
            width={88}
            height={16}
            viewBox="0 0 88 16"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="3" ry="3" width="88" height="16" />
        </ContentLoader>
    )

    return <div className="editor">
        <div className="editor__panel">
            <div onClick={(e) => { setShowDropDown(!showDropDown) }} className="editor__folder">
                {/* fixme:更简洁的实现方式 */}
                {folder.currentFolder && folder.currentFolder.name && <span className="editor__foldericon"></span>}
                {folder.currentFolder && folder.currentFolder.name ? folder.currentFolder.name : "全部"}
                <span className="editor__arrowicon"></span>
                {showDropDown && <div className="drop-down">
                    <div className="drop-down__list">
                        <div key={-1} className={"drop-down__item" + (folder.currentFolder ? "" : " active")}
                            onClick={() => handleFolderSelect()}
                        >全部</div>
                        {folder.folderList.map(item => <div key={item.id}
                            className={"drop-down__item" + (folder.currentFolder && folder.currentFolder.id == item.id ? " active" : "")}
                            onClick={() => handleFolderSelect(item)}
                        >{item.name}</div>)}
                    </div>
                </div>}
            </div>
        </div>
        {note.currentNote && <textarea key={note.currentNote.id} onChange={handleChange} placeholder="请输入" defaultValue={note.currentNote.content} className="editor__textarea"></textarea>}
    </div >
}

export default Editor