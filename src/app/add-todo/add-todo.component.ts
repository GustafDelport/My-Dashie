import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';
import {v4 as uuidv4} from 'uuid'

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  showValidationErrors: boolean;

  constructor(
    private todoService: TodoService, 
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm){
    if (form.invalid) {return this.showValidationErrors = true}
    else {
      const todo = new Todo(uuidv4(),form.value.text,false);

      this.todoService.addTodo(todo).subscribe();

      this.router.navigateByUrl('/todos');
      this.notificationService.show("Todo was added!",1000);

      return this.showValidationErrors = false
    }
  }

}
