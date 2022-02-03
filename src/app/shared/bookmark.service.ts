import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Observable, Subscription, tap } from 'rxjs';
import { Bookmark } from './bookmark.model';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  readonly ROOT_URL;

  bookmarks: Bookmark[] = []

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:5000/bookmark';
   }

  getBookmarks(): Observable<Bookmark []> {
    return this.http.get<Bookmark []>(`${this.ROOT_URL}/get`)
  }

  getBookmark (id: string): Observable<Bookmark> {
    return this.http.get<Bookmark>(`${this.ROOT_URL}/get/${id}`)
  }

  //up until here i am done
  addBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(`${this.ROOT_URL}/add`,bookmark)
  }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>){
    const bookmark = this.getBookmark(id);
    Object.assign(bookmark,updatedFields);
  }

  deleteBookmark(id: string){
    const bookmarkIdex = this.bookmarks.findIndex(b => b._id === id);
    if (bookmarkIdex == -1) return;

    this.bookmarks.splice(bookmarkIdex,1);

    //save to api here
  }
}
