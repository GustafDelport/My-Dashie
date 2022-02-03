import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  note: Note;

  showValidationErrors: Boolean;

  constructor(
    private route: ActivatedRoute, 
    private noteService: NoteService, 
    private router: Router,
    private notificationService: NotificationService) { }


  //listens to url changes with id param
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id');
      this.noteService.getNote(idParam).subscribe({
        next: b => this.note = b
      })
    })
  }

  onFormSubmit(form: NgForm){
    if (form.invalid) {return this.showValidationErrors = true}
    else {
      this.note.title = form.value.title
      this.note.content = form.value.content

      this.noteService.updateNote(this.note._id, this.note).subscribe();

      this.router.navigateByUrl("/notes")
      this.notificationService.show("Note Updated!",1000);
      return this.showValidationErrors = false
      }

      
  }

  deleteNote(){
    this.noteService.deleteNote(this.note._id).subscribe();
    
    this.router.navigateByUrl('/notes')
    this.notificationService.show("Note was deleted!",1000);
  }
}
