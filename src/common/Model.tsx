import Dexie from 'dexie';
import { INote } from "./INote";

class Model extends Dexie {
    // Declare implicit table properties.
    // (just to inform Typescript. Instanciated by Dexie in stores() method)
    notes: Dexie.Table<INote, number>; // number = type of the primkey
    //...other tables goes here...

    constructor() {
        super("MyAppDatabase");
        this.version(1).stores({
            contacts: '++id, cotent, create_at, update_at',
            //...other tables goes here...
        });
        // The following line is needed if your typescript
        // is compiled using babel instead of tsc:
        this.notes = this.table("contacts");
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
}

export default Model;