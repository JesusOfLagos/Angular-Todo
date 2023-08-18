

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newTask = '';
  tasks: { title: string; completed: boolean }[] = [];

  ngOnInit() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push({ title: this.newTask, completed: false });
      this.newTask = '';
      this.updateLocalStorage();
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
    this.updateLocalStorage();
  }

  toggleCompleted(task: any) {
    task.completed = !task.completed;
    this.updateLocalStorage();
  }

  clearCompletedTasks() {
    this.tasks = this.tasks.filter(task => !task.completed);
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  get activeTasks() {
    return this.tasks.filter(task => !task.completed);
  }

  get completedTasks() {
    return this.tasks.filter(task => task.completed);
  }
}
