import Dexie from 'dexie';
import { IFolder } from "./IFolder";
import { INote } from "./INote";

interface GetNoteArg {
    page: number,
    limit: number,
    folder_id?: number
}

class Model extends Dexie {
    // Declare implicit table properties.
    // (just to inform Typescript. Instanciated by Dexie in stores() method)
    notes: Dexie.Table<INote, number>; // number = type of the primkey
    folders: Dexie.Table<IFolder, number>; // number = type of the primkey
    //...other tables goes here...

    constructor() {
        super("db_note");
        this.version(3).stores({
            t_note: '++id, content, create_at, update_at, folder_id',
            t_folder: '++id, name, create_at, update_at'
            //...other tables goes here...
        });
        // The following line is needed if your typescript
        // is compiled using babel instead of tsc:
        this.notes = this.table("t_note");
        this.folders = this.table("t_folder");
    }

    getNote(params: GetNoteArg) {
        const { limit, page, folder_id } = params
        if (folder_id) {
            return this.notes
                .where({ folder_id })
                .reverse()
                .offset((page - 1) * limit)
                .limit(limit)
                .toArray()
        }
        return this.notes
            .reverse()
            .offset((page - 1) * limit)
            .limit(limit)
            .toArray()
    }

    addNote(folder_id: number) {
        return this.notes.add({
            content: '',
            folder_id,
            create_at: Date.now(),
            update_at: Date.now()
        })
    }

    updateNote(payload: INote) {
        payload.update_at = Date.now()
        return this.notes.update(payload.id || 0, payload)
    }

    countNoteByFolderId(folder_id: number) {
        return this.notes.where({ folder_id }).count()
    }

    getFolder() {
        return this.folders.reverse().toArray()
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