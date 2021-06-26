import React from "react";
import "./Editor.scss";

function Editor(){
    return <div className="editor">
        <textarea placeholder="请输入" className="editor__textarea"></textarea>
    </div>
}

export default Editor