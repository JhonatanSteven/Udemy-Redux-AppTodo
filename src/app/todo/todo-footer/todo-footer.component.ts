import { Component, OnInit } from "@angular/core";
import * as fromFiltro from "../../filter/filter.actions";
import * as fromTodo from "../../todo/todo.actions";
import { AppState } from "../../app.reducer";
import { Store } from "@ngrx/store";
import { Todo } from "../model/todo.model";

@Component({
  selector: "app-todo-footer",
  templateUrl: "./todo-footer.component.html",
  styles: []
})
export class TodoFooterComponent implements OnInit {
  filtrosValidos: fromFiltro.filtrosValidos[] = [
    "todos",
    "completados",
    "pendientes"
  ];
  filtroActual: fromFiltro.filtrosValidos;
  pendientes: number;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.contarPendientes(state.todos);
    });
  }

  cambiarFiltro(nuevoFiltro: fromFiltro.filtrosValidos) {
    const accion = new fromFiltro.SerFiltroAction(nuevoFiltro);
    this.store.dispatch(accion);
  }

  contarPendientes(todos: Todo[]) {
    this.pendientes = todos.filter(todo => !todo.completado).length;
  }

  limpiarCompletadas() {
    const accion = new fromTodo.LipiarCompletadasTodoAction();
    this.store.dispatch(accion);
  }
}
