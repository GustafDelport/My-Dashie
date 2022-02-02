import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnDestroy{

  todos: Todo[] = []

  storageListenSub: Subscription;

  constructor() { 
    this.loadState();

    this.storageListenSub = fromEvent(window, 'storage')
      .subscribe((event: StorageEvent) => {
        if (event.key === 'todos') {this.loadState();}
      })
  }
  
  ngOnDestroy(): void {
    if (this.storageListenSub) this.storageListenSub.unsubscribe();
  }

  getTodos(){
    return this.todos;
  }

  getTodo(id: string){
    return this.todos.find(t => t.id === id);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.saveState();
  }

  updateTodo(id: string, updateTodoFields: Partial<Todo>){
    const todo = this.getTodo(id);
    Object.assign(todo,updateTodoFields);
    this.saveState();
  }

  deleteTodo(id: string){
    const todoIdex = this.todos.findIndex(t => t.id === id);
    if (todoIdex == -1) return;

    this.todos.splice(todoIdex,1);
    this.saveState();
  }

  //Persistent Data
  saveState(){
    //saves to localStorage
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadState() {
    //Retrieves from localStorage
    try {
      const todosInStorage = JSON.parse(localStorage.getItem('todos'));

      this.todos.length = 0 //clears array while keeping reference.
      this.todos.push(...todosInStorage);

    } catch (e) {
      console.log('error retrieving todos from storage');
      console.log(e);
    }
  }
}
