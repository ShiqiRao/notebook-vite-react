import React from "react";
import Dexie from 'dexie';
import { INote } from "./INote";

class Model extends Dexie {
    // Declare implicit table properties.
    // (just to inform Typescript. Instanciated by Dexie in stores() method)
    notes: Dexie.Table<INote, number>; // number = type of the primkey
    //...other tables goes here...

    constructor () {
        super("MyAppDatabase");
        this.version(1).stores({
            contacts: '++id, cotent, create_at, update_at',
            //...other tables goes here...
        });
        // The following line is needed if your typescript
        // is compiled using babel instead of tsc:
        this.notes = this.table("contacts");
    }

    getNote(){
        return this.notes.reverse().toArray()
    }

    addNote(){
        return this.notes.add({
            content:'',
            create_at:new Date(),
            update_at:new Date()
        })
    }
}

export default Model;