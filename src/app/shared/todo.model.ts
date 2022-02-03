import { v4 as uuidv4 } from 'uuid'

export class Todo {
    _id: string
    completed: boolean
    text: string

    constructor(text: string, completed: boolean) {
        
        this._id = uuidv4()
        this.completed = completed
        this.text= text
    }
}