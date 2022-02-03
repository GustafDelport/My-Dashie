import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Observable, Subscription, tap } from 'rxjs';
import { Bookmark } from './bookmark.model';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:5000/bookmark';
   }

  getBookmarks(): Observable<Bookmark []> {
    return this.http.get<Bookmark []>(`${this.ROOT_URL}/get`)
  }

  getBookmark (id: string): Observable<Bookmark> {
    return this.http.get<Bookmark>(`${this.ROOT_URL}/get/${id}`)
  }
  
  addBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(`${this.ROOT_URL}/add`,bookmark)
  }

  updateBookmark(id: string, bookmark: Bookmark){
    return this.http.patch<Bookmark>(`${this.ROOT_URL}/update/${id}`,bookmark)
  }

  deleteBookmark(id: string): Observable<Bookmark>{
    return this.http.delete<Bookmark>(`${this.ROOT_URL}/delete/${id}`)
  }
}
