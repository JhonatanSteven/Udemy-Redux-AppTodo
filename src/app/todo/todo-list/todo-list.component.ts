import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducer";
import * as fromFiltro from "../../filter/filter.actions";
import { Todo } from "../model/todo.model";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styles: []
})
export class TodoListComponent implements OnInit {
  filtro: fromFiltro.filtrosValidos;
  todos: Todo[] = [];
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.subscribe(state => {
      this.todos = state.todos;
      this.filtro = state.filtro;
    });
  }
}
