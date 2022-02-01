import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})

export class NoteService {

  notes: Note[] = [
    new Note("Test", "Hello")
  ];

  constructor() { }

  getNotes(){
    return this.notes;
  }

  getNote(id: string){
    return this.notes.find(n => n.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
  }

  updateNote(id: string, updatedFields: Partial<Note>){
    const note = this.getNote(id);
    Object.assign(note,updatedFields);
  }

  deleteNote(id: string){
    const noteIdex = this.notes.findIndex(n => n.id === id);
    if (noteIdex == -1) return;

    this.notes.splice(noteIdex,1);
  }

}