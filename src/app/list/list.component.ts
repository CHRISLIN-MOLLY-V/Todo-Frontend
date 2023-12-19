import { Component, OnInit,OnDestroy } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../task.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit ,OnDestroy{
  taskList: Task[]= [];
  newTask: Task = { id:'9f8e2b1c-43b7-4a94-857c-ff5e2e3e3c1a', description: '' ,createdDate: new Date(),  isCompleted: false,  completedDate: new Date() };

  constructor(private taskService: TaskService) {}
  subscription!: Subscription
  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.subscription=this.taskService.getAllTasks().subscribe(
      {
        next: tasks => {
          this.taskList = tasks;
        }
      }
    );
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  addTask(): void {
      this.taskService.addTask(this.newTask).subscribe({
        next: task => {
          this.loadTasks();
        }
      });
  }

  updateTask(id:string|undefined, task: Task): void {
      this.taskService.updateTask(id, task).subscribe(
        {
          next: task => {
            this.loadTasks();
          }
        }
      );
  }

  deleteTask(taskId: string|undefined): void {
    if (taskId !== undefined) {
      this.taskService.deleteTask(taskId).subscribe({
        next: task => {
          this.loadTasks();
        }
      });
    } 
  }

  
      markCompleted(task: Task): void {
        if (task.isCompleted) {
          task.completedDate = new Date();
        } else {
          task.completedDate = undefined;
        }
      }
}
