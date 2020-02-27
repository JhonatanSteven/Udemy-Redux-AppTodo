import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Todo } from "../model/todo.model";
import { FormControl, Validators } from "@angular/forms";
import { AppState } from "../../app.reducer";
import { Store } from "@ngrx/store";
import { ToggleTodoAction, EditarTodoAction, BorrarTodoAction } from "../todo.actions";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styles: []
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild("txtInputFisico", { static: false }) txtInputFisico: ElementRef;

  chekField: FormControl;
  txtInput: FormControl;
  editando: boolean;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.chekField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chekField.valueChanges.subscribe(() => {
      const accion = new ToggleTodoAction(this.todo.id);
      this.store.dispatch(accion);
    });
    console.log(this.todo);
  }

  editar() {
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;

    if (this.txtInput.invalid) {
      return;
    }

    if (this.txtInput.value === this.todo.texto) {
      return;
    }

    const accion = new EditarTodoAction(this.todo.id, this.txtInput.value);
    this.store.dispatch(accion);
  }

  borrar(){
    const accion = new BorrarTodoAction(this.todo.id);
    this.store.dispatch(accion);
  }
}
