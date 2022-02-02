import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})

export class NoteService implements OnDestroy{

  notes: Note[] = [];

  storageListenSub: Subscription;

  constructor() {
    this.loadState();

    this.storageListenSub = fromEvent(window, 'storage')
      .subscribe((event: StorageEvent) => {
        if (event.key === 'notes') {this.loadState();}
      })
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) this.storageListenSub.unsubscribe();
  }

  getNotes(){
    return this.notes;
  }

  getNote(id: string){
    return this.notes.find(n => n.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
    this.saveState();
  }

  updateNote(id: string, updatedFields: Partial<Note>){
    const note = this.getNote(id);
    Object.assign(note,updatedFields);
    this.saveState();
  }

  deleteNote(id: string){
    const noteIdex = this.notes.findIndex(n => n.id === id);
    if (noteIdex == -1) return;

    this.notes.splice(noteIdex,1);
    this.saveState();
  }


  //Persistent Data
  saveState(){
    //saves to localStorage
    localStorage.setItem('notes', JSON.stringify(this.notes));
    
    //change yo mongoDB later
  }

  loadState() {
    //Retrieves from localStorage
    try {
      const notesInStorage = JSON.parse(localStorage.getItem('notes'));

      this.notes.length = 0 //clears array while keeping reference.
      this.notes.push(...notesInStorage);

    } catch (e) {
      console.log('error retrieving notes from storage');
      console.log(e);
    }

    //change yo mongoDB later
  }
}
