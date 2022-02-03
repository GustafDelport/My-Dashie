import { v4 as uuidv4 } from 'uuid'

export class Todo {
    _id: string
    completed: boolean
    text: string

    constructor(_id: string , text: string, completed: boolean) {
        this._id = _id
        this.completed = completed
        this.text= text
    }
}