import { toDoListReducer } from './todo-list';
import { ToDoList } from '@models';
import { TODO_ITEM_ADD, ItemAdd } from '@actions';


it('Calling reducer with add should insert a new item to store', () => {
    const action = { type: TODO_ITEM_ADD, itemId: 1, title: 'test', description: 'description' } as ItemAdd;
    const updatedList = toDoListReducer(new ToDoList(), action);
    expect(updatedList.items.count()).toBe(1);
    const item = updatedList.items.get(0);
    expect(item.id).toBe(action.itemId);
    expect(item.title).toBe(action.title);
    expect(item.description).toBe(action.description);
});