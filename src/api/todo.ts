import * as localforage from 'localforage';
import { ToDoList, ToDoItem } from '../models';

var localstore: LocalForage = null;

if (!process.env.JEST_WORKER_ID) {
    localstore = localforage.createInstance({ name: 'todo' });
}

export async function readData() {
    const data = await localstore.getItem('data');
    return data ? ToDoList.fromJS(data) : new ToDoList();
}

export async function writeData(data: ToDoList) {
    await localstore.setItem('data', data);
}

export async function createItem(title: string, description?: string) {
    const data = await readData();
    const newItem = new ToDoItem({ id: data.nextId, title, description });
    await writeData(
        data.update('items', (i) => i.push(newItem))
            .update('nextId', (i) => ++i));
    return newItem;
}

export async function removeItem(todoId: number) {
    const data = await readData();
    await writeData(data.update('items', i => i.filter((i) => i.id != todoId)))
}

export async function setComplete(todoId: number, complete: boolean) {
    const data = await readData();
    const toDoIndex = data.items.findIndex((i) => i.id == todoId);
    if (toDoIndex > 0) {
        await writeData(data.update('items', items => items.update(toDoIndex, item => item.set('complete', true))));
    }
}

export async function setText(todoId: number, title: string, description: string) {
    const data = await readData();
    const toDoIndex = data.items.findIndex((i) => i.id == todoId);
    if (toDoIndex > 0) {
        await writeData(data.update('items', items => items.update(toDoIndex, item => item.merge({ title, description }))));
    }
}
