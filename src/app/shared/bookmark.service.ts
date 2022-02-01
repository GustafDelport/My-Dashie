import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  bookmarks: Bookmark[] = [
    new Bookmark('Google', 'http://google.com'),
    new Bookmark('Pizza Hut', 'https://pornhub.com'),
    new Bookmark('Wikipedia', 'http://wikipedia.org'),
    
  ]

  constructor() { }

  getBookmarks(){
    return this.bookmarks;
  }

  getBookmark(id: string){
    return this.bookmarks.find(b => b.id === id);
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);
  }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>){
    const bookmark = this.getBookmark(id);
    Object.assign(bookmark,updatedFields);
  }

  deleteBookmark(id: string){
    const bookmarkIdex = this.bookmarks.findIndex(b => b.id === id);
    if (bookmarkIdex == -1) return;

    this.bookmarks.splice(bookmarkIdex,1);
  }
}
