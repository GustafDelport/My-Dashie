import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  animations: [
    trigger('todoItemAnim',[
      transition(':leave',[
        animate(200, style({
          opacity: 0,
          height: 0,
          marginBottom:0
        }))
      ])
    ])
  ]
})

export class TodosComponent implements OnInit {

  todos: Todo[];
  
  constructor(
    private todoService: TodoService, 
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe({
      next: t => this.todos = t
    })
  }

  toggleCompleted(todo: Todo){
    //sets the completed status to what ever it is currently not
    todo.completed = !todo.completed

    this.todoService.updateTodo(todo._id,todo).subscribe()
  }

  onEditClick(todo: Todo){
    this.router.navigate(['/todos',todo._id]);
  }

  onDeleteClick(todo: Todo){
    this.todoService.deleteTodo(todo._id).subscribe();
    this.router.navigateByUrl('/todos');
    this.notificationService.show("Todo was deleted!",1000);

    this.todoService.getTodos().subscribe({
      next: t => this.todos = t
    })
  }

  trackByID(index, item: Todo) {
    return item._id;
  }

}
