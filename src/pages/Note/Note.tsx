import React from "react"
import Editor from "../../components/Editor/Editor"
import NoteList from "../../components/NoteList/NoteList"
import "./Note.scss"

function Note() {
    return <div className="note">
        <NoteList></NoteList>
        <Editor></Editor>
    </div>

}

export default Note