import React, { useState } from "react";
import { INote } from "../../common/INote";
import Model from "../../common/Model";
import { selectNote, setNoteList } from '../../reducer/note';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import "./Editor.scss";

function Editor() {
    const note = useAppSelector(selectNote)
    const dispatch = useAppDispatch()
    const [model, setModel] = useState<Model>(new Model())
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        let toUpdate = new INote()
        toUpdate.id = note.currentNote.id
        toUpdate.content = e.target.value
        model.updateNote(toUpdate)
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


    return <div className="editor">
        <div className="editor__panel">我创建的文件夹</div>
        <textarea key={note.currentNote.id} onChange={handleChange} placeholder="请输入" defaultValue={note.currentNote.content} className="editor__textarea"></textarea>
    </div >
}

export default Editor