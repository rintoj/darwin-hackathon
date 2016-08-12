import { Todo } from '../../models/todo';
import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ProgressChart } from '../../components/progress-chart';
import { NavController } from 'ionic-angular';

@Component({
  directives: [ProgressChart],
  template: `
    <ion-content padding class="home">
      <h2>Welcome to Ionic!</h2>
      <p>
        This starter project comes with simple tabs-based layout for apps
        that are going to primarily use a Tabbed UI.
      </p>
      <p>
        Take a look at the <code>app/</code> directory to add or change tabs,
        update any existing page or create new pages.
      </p>

      <progress-chart></progress-chart>
    </ion-content>
  `
})
export class HomePage {

  protected todos: Todo[] = [];

  constructor(
    private navCtrl: NavController,
    private todoService: TodoService
  ) {
    // this.todoService.fetch().subscribe((data: any) => this.todos = data);
  }
}
