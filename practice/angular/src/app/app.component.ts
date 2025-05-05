import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , CommonModule , FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';
  tasks:{name : string , done : boolean}[] = [];
  newtask:string = '';
  
  addTask(){

    this.tasks.push({name : this.newtask , done:false });
    this.newtask = '';

  }

  deleteTask(index: number){
    this.tasks.splice(index , 1);
  }

  toggleDone(index:number){
    this.tasks[index].done = !this.tasks[index].done;
  }
}
