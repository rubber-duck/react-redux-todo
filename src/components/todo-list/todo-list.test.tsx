import React from 'react';
import * as enzyme from 'enzyme';
import * as im from 'immutable';
import * as models from '@models';
import { ToDoListPure } from './todo-list';


const testList = new models.ToDoList({
    items: im.List([
        new models.ToDoItem({ id: 1, title: 'Test 1', description: 'Simple description 1', complete: false }),
        new models.ToDoItem({ id: 2, title: 'Test 2', description: 'Simple description 2', complete: true }),
        new models.ToDoItem({ id: 3, title: 'Test 3', description: 'Simple description 3', complete: true })
    ]),
    nextId: 3
})

const selectors = {
    toDoItem: '.ToDoItem',
    toDoItemCompleted: '.ToDoItem.completed'
}

it('ToDoList renders completed items correctly when set to', () => {
    const wrapper = enzyme.mount(
        <ToDoListPure toDoList={testList.set('showCompleted', true)} itemCreate={null} itemEdit={null} itemRemove={null} itemSetComplete={null} />);

    const elems = wrapper.find(selectors.toDoItem);
    expect(elems).toHaveLength(testList.items.count());

    const elemsCompleted = wrapper.find(selectors.toDoItemCompleted);
    expect(elemsCompleted).toHaveLength(testList.items.count(item => item.complete));
});

it('ToDoList does not render completed items when set not to', () => {
    const wrapper = enzyme.mount(
        <ToDoListPure toDoList={testList.set('showCompleted', false)} itemCreate={null} itemEdit={null} itemRemove={null} itemSetComplete={null} />);

    const elems = wrapper.find(selectors.toDoItem);
    expect(elems).toHaveLength(testList.items.count(item => !item.complete));
});
