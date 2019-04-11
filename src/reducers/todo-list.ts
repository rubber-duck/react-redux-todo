import * as im from 'immutable';
import * as actions from '@actions';
import { ToDoList, ToDoItem } from "@models";


function updateItem(list: ToDoList, id: number, operation: (items: im.List<ToDoItem>, index: number) => im.List<ToDoItem>): ToDoList {
    return list.update('items', items => {
        const itemIndex = items.findIndex(item => item.id == id)
        if (itemIndex < 0)
            return items;
        return operation(items, itemIndex);
    });
}

export function toDoListReducer(
    state: ToDoList | undefined,
    action: actions.ItemsLoad | actions.ItemAdd | actions.ItemRemove | actions.ItemSetComplete | actions.ItemSetText): ToDoList {

    if (state == undefined)
        state = new ToDoList();

    switch (action.type) {
        case actions.TODO_ITEMS_LOAD:
            return state.merge({
                'items': im.List(action.items.map(i => new ToDoItem(i))),
                'nextId': action.nextId
            });

        case actions.TODO_ITEM_ADD:
            return state
                .update('items', items => items.push(
                    new ToDoItem({
                        id: action.itemId,
                        title: action.title,
                        description: action.description
                    })))
                .set('nextId', action.itemId);

        case actions.TODO_ITEM_REMOVE:
            return updateItem(
                state, action.todoId,
                (items, index) => items.remove(index));

        case actions.TODO_ITEM_SET_COMPLETE:
            return updateItem(
                state, action.todoId,
                (items, index) => items.update(index, t => t.set('complete', action.complete)));

        case actions.TODO_ITEM_SET_TEXT:
            return updateItem(
                state, action.todoId,
                (items, index) => items.update(index, t => t.merge({ 'title': action.title, 'description': action.description || '' })));

        default:
            return state;
    }
}