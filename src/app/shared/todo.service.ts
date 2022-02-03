import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService{

  readonly ROOT_URL;

  constructor(private http: HttpClient) { 
    this.ROOT_URL = 'http://localhost:5000/todo';
  }

  getTodos(): Observable<Todo []>{
    return this.http.get<Todo []>(`${this.ROOT_URL}/get`)
  }

  getTodo(id: string): Observable<Todo>{
    return this.http.get<Todo>(`${this.ROOT_URL}/get/${id}`)
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.ROOT_URL}/add`,todo)
  }

  updateTodo(id: string, todo: Todo): Observable<Todo>{
    return this.http.patch<Todo>(`${this.ROOT_URL}/update/${id}`,todo)
  }

  deleteTodo(id: string): Observable<Todo>{
    return this.http.delete<Todo>(`${this.ROOT_URL}/delete/${id}`)
  }
}
