import Dexie from 'dexie';
import { IFolder } from "./IFolder";
import { INote } from "./INote";

class Model extends Dexie {
    // Declare implicit table properties.
    // (just to inform Typescript. Instanciated by Dexie in stores() method)
    notes: Dexie.Table<INote, number>; // number = type of the primkey
    folders: Dexie.Table<IFolder, number>; // number = type of the primkey
    //...other tables goes here...

    constructor() {
        super("db_note");
        this.version(2).stores({
            t_note: '++id, content, create_at, update_at',
            t_folder: '++id, name, create_at, update_at'
            //...other tables goes here...
        });
        // The following line is needed if your typescript
        // is compiled using babel instead of tsc:
        this.notes = this.table("t_note");
        this.folders = this.table("t_folder");
    }

    getNote(params = {
        page: 1,
        limit: 10
    }) {
        const { limit, page } = params
        return this.notes.reverse().offset((page - 1) * limit).limit(limit).toArray()
    }

    addNote() {
        return this.notes.add({
            content: '',
            create_at: Date.now(),
            update_at: Date.now()
        })
    }

    updateNote(payload: INote) {
        payload.update_at = Date.now()
        return this.notes.update(payload.id || 0, payload)
    }

    getFolder() {
        return this.folders.toArray()
    }

    addFolder(name: string) {
        return this.folders.add({
            name,
            create_at: Date.now(),
            update_at: Date.now()
        })
    }
}

export default Model;

export const db = new Model();