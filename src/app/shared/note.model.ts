import {v4 as uuidv4} from 'uuid'

export class Note {
    _id: string
    title: string
    content: string

    constructor(title: string, content: string){
        this._id = uuidv4()
        this.title = title,
        this.content = content
    }
}