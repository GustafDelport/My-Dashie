import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';
import {v4 as uuidv4} from 'uuid'

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

  todo: Todo;

  showValidationErrors: boolean;

  constructor(
    private route: ActivatedRoute, 
    private todoService: TodoService, 
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id');

      this.todoService.getTodo(idParam).subscribe({
        next: b => this.todo = b
      })

    })
  }

  onFormSubmit(form: NgForm){
    if (form.invalid) {
      return this.showValidationErrors = true
    }
    else {
        this.todo.text = form.value.text

        this.todoService.updateTodo(this.todo._id, this.todo).subscribe();

        this.router.navigateByUrl("/todos");
        this.notificationService.show("Todo Updated!",1000);

        return this.showValidationErrors = false

      }
  }
}
