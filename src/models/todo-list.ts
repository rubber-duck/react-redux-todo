import * as im from 'immutable';
import { ToDoItem } from './todo-item';

interface IToDoList {
    items: im.List<ToDoItem>;
    showCompleted: boolean;
    nextId: number;
}

export class ToDoList extends im.Record<IToDoList>({
    items: im.List<ToDoItem>(),
    nextId: 1,
    showCompleted: true
}) {
    static fromJS(source: any) {
        return new ToDoList({
            items: im.List(source.items).map(i => ToDoItem.fromJS(i)),
            nextId: source.nextId,
            showCompleted: source.showCompleted
        })
    }
}
