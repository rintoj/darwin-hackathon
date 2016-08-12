import { Todo } from '../../models/todo';
import {Component} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  protected todos: Todo[] = [];

  constructor(
    private navCtrl: NavController,
    private todoService: TodoService
  ) {
    this.todoService.fetch().subscribe((data: any) => this.todos = data);
  }
}
