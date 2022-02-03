import {v4 as uuidv4} from 'uuid'

export class Bookmark {
    _id: string
    name: string
    url: URL

    constructor(name: string, url: string){
        this._id = uuidv4()
        this.url = new URL(url)

        if (!name) {
            name = this.url.hostname
        }
        this.name = name
    }
}