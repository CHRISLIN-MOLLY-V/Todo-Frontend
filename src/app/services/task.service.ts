import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:44372';
  private apiUrl1 = 'https://localhost:44372/api/Todo';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl1);
  }

  addTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl1, newTask);
  }

  updateTask(taskId: string|undefined, updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(this.apiUrl1+'/'+taskId, updatedTask);
  }

  deleteTask(taskId: string|undefined): Observable<void> {
    return this.http.delete<void>(this.apiUrl1+'/'+taskId);
  }
}