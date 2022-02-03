import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})

export class NoteService{

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:5000/note';
  }

  getNotes(): Observable<Note []>{
    return this.http.get<Note []>(`${this.ROOT_URL}/get`)
  }

  getNote(id: string): Observable<Note>{
    return this.http.get<Note>(`${this.ROOT_URL}/get/${id}`)
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(`${this.ROOT_URL}/add`,note)
  }

  updateNote(id: string, note: Note): Observable<Note>{
    return this.http.patch<Note>(`${this.ROOT_URL}/update/${id}`,note)
  }

  deleteNote(id: string): Observable<Note>{
    return this.http.delete<Note>(`${this.ROOT_URL}/delete/${id}`)
  }
}
