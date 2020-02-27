import * as fromTodo from "./todo.actions";
import { Todo } from "./model/todo.model";

const todo1 = new Todo("Vencer Thanos");
const todo2 = new Todo("Salvar el mundo");
const todo3 = new Todo("Pedir prestado traje de ironman");
todo2.completado = true;
const estadoInicial: Todo[] = [todo1, todo2, todo3];
export function todoreducer(
  state = estadoInicial,
  action: fromTodo.Acciones
): Todo[] {
  switch (action.type) {
    case fromTodo.AGREGAR_TODO:
      const todo = new Todo(action.texto);
      return [...state, todo];
    case fromTodo.TOGGLE_TODO:
      return state.map(todoedit => {
        if (todoedit.id === action.id) {
          return {
            ...todoedit,
            completado: !todoedit.completado
          };
        } else {
          return todoedit;
        }
      });

    case fromTodo.TOGGLE_ALL_TODO:
      return state.map(todoedit => {
        return {
          ...todoedit,
          completado: action.completado
        };
      });
    case fromTodo.EDITAR_TODO:
      return state.map(todoedit => {
        if (todoedit.id === action.id) {
          return {
            ...todoedit,
            texto: action.texto
          };
        } else {
          return todoedit;
        }
      });

    case fromTodo.BORRAR_TODO:
      return state.filter(todoEdit => todoEdit.id !== action.id);
    case fromTodo.LIMPIAR_COMPLETADAS_TODO:
      return state.filter(todoEdit => !todoEdit.completado);
    default:
      return state;
  }
}
