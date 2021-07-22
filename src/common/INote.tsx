export class INote {
    id?: number;
    content: string = '';
    create_at: number = Date.now();
    update_at: number = Date.now();
    folder_id?: number;
    deleted: boolean = false;
    starred: boolean = false;
}