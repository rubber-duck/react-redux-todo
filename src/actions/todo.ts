import * as im from 'immutable';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { ToDoItem } from '../models';
import * as toDoApi from '../api/todo';

export const TODO_ITEMS_LOAD = 'TODO_ITEMS_LOAD'
export const TODO_ITEM_ADD = 'TODO_ITEM_ADD';
export const TODO_ITEM_REMOVE = 'TODO_ITEM_REMOVE';
export const TODO_ITEM_SET_COMPLETE = 'TODO_ITEM_SET_COMPLETE';
export const TODO_ITEM_SET_TEXT = 'TODO_ITEM_SET_TEXT';

export type ItemsLoad = { type: typeof TODO_ITEMS_LOAD, items: im.List<ToDoItem>, nextId: number };
export type ItemAdd = { type: typeof TODO_ITEM_ADD, itemId: number, title: string, description?: string };
export type ItemRemove = { type: typeof TODO_ITEM_REMOVE, todoId: number };
export type ItemSetComplete = { type: typeof TODO_ITEM_SET_COMPLETE, todoId: number, complete: boolean };
export type ItemSetText = { type: typeof TODO_ITEM_SET_TEXT, todoId: number, title: string, description: string };

export function itemCreate() {
    return push('/add')
}

export function itemEdit(itemId: number) {
    return push(`/edit/${itemId}`);
}

export function itemsLoad() {
    return async (dispatch: Dispatch) => {
        const data = await toDoApi.readData();
        dispatch({ type: TODO_ITEMS_LOAD, items: data.items, nextId: data.nextId } as ItemsLoad)
    };
}

export function itemAdd(title: string, description?: string) {
    return async (dispatch: Dispatch) => {
        const newItem = await toDoApi.createItem(title, description);
        dispatch({ type: TODO_ITEM_ADD, itemId: newItem.id, title: newItem.title, description: newItem.description } as ItemAdd)
    };
}

export function itemRemove(todoId: number) {
    return async (dispatch: Dispatch) => {
        await toDoApi.removeItem(todoId);
        dispatch({ type: TODO_ITEM_REMOVE, todoId } as ItemRemove);
    }
}

export function itemSetComplete(todoId: number, complete: boolean) {
    return async (dispatch: Dispatch) => {
        await toDoApi.setComplete(todoId, complete);
        dispatch({ type: TODO_ITEM_SET_COMPLETE, todoId, complete } as ItemSetComplete);
    }
}

export function itemSetText(todoId: number, title: string, description: string) {
    return async (dispatch: Dispatch) => {
        await toDoApi.setText(todoId, title, description);
        dispatch({ type: TODO_ITEM_SET_TEXT, todoId, title, description } as ItemSetText);
    }
}

