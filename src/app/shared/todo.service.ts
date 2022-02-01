import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [
    new Todo('Test todo'),
    new Todo('Hey complete me')
  ]

  constructor() { 
  }

  getTodos(){
    return this.todos;
  }

  getTodo(id: string){
    return this.todos.find(t => t.id === id);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  updateTodo(id: string, updateTodoFields: Partial<Todo>){
    const todo = this.getTodo(id);
    Object.assign(todo,updateTodoFields);
  }

  deleteTodo(id: string){
    const todoIdex = this.todos.findIndex(t => t.id === id);
    if (todoIdex == -1) return;

    this.todos.splice(todoIdex,1);
  }
}
