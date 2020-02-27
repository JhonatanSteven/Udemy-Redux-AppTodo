import { Action } from "@ngrx/store";

export const SET_FILTRO = "[Filtro] Set Filtro";

export type filtrosValidos = "todos" | "completados" | "pendientes";

export class SerFiltroAction implements Action {
  readonly type = SET_FILTRO;
  constructor(public filtro: filtrosValidos) {}
}

export type acciones = SerFiltroAction;
