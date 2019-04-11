import React from 'react';
import * as enzyme from 'enzyme';
import * as models from '@models';
import { ToDoItem } from './todo-item';


const selectors = {
    title: '.title',
    description: 'p.description',
    removeButton: 'button.remove',
    editButton: 'button.edit',
    completeButton: 'button.complete'
}

it('ToDoItem renders correct title and description', () => {
    const item = new models.ToDoItem({ id: 1, title: 'Test', description: 'Simple description', complete: false });
    const wrapper = enzyme.mount(<ToDoItem item={item} itemRemove={null} itemEdit={null} itemSetComplete={null} />);

    const title = wrapper.find(selectors.title);
    expect(title).toHaveLength(1);
    expect(title.first().text()).toBe(item.title);

    const description = wrapper.find(selectors.description);
    expect(description).toHaveLength(1);
    expect(description.first().text()).toBe(item.description);
});

it('ToDoItem renders title with no description', () => {
    const item = new models.ToDoItem({ id: 1, title: 'Test', description: '', complete: false });
    const wrapper = enzyme.mount(<ToDoItem item={item} itemRemove={null} itemEdit={null} itemSetComplete={null} />);

    const title = wrapper.find(selectors.title);
    expect(title).toHaveLength(1);
    expect(title.first().text()).toBe(item.title);

    const description = wrapper.find(selectors.description);
    expect(description).toHaveLength(0);
});

it('ToDoItem does not call remove and setCompleted when clicked', () => {
    const item = new models.ToDoItem({ id: 1, title: 'Test', description: 'Simple description', complete: false });
    const removeFn = jest.fn();
    const setCompletedFn = jest.fn();
    const editFn = jest.fn();

    const wrapper = enzyme.mount(<ToDoItem item={item} itemRemove={removeFn} itemEdit={editFn} itemSetComplete={setCompletedFn} />);
    wrapper.find(selectors.title).simulate('click');
    wrapper.find(selectors.description).simulate('click');

    expect(removeFn).not.toBeCalled();
    expect(setCompletedFn).not.toBeCalled();
    expect(editFn).not.toBeCalled();
});

it('ToDoItem does call remove when remove button clicked', () => {
    const item = new models.ToDoItem({ id: 1, title: 'Test', description: 'Simple description', complete: false });
    const removeFn = jest.fn();
    const setCompletedFn = jest.fn();
    const editFn = jest.fn();


    const wrapper = enzyme.mount(<ToDoItem item={item} itemRemove={removeFn} itemEdit={editFn} itemSetComplete={setCompletedFn} />);
    wrapper.find(selectors.removeButton).simulate('click');

    expect(removeFn).toBeCalledWith(item.id);
    expect(setCompletedFn).not.toBeCalled();
    expect(editFn).not.toBeCalled();
});

it('ToDoItem does call edit when edit button clicked', () => {
    const item = new models.ToDoItem({ id: 1, title: 'Test', description: 'Simple description', complete: false });
    const removeFn = jest.fn();
    const setCompletedFn = jest.fn();
    const editFn = jest.fn();


    const wrapper = enzyme.mount(<ToDoItem item={item} itemRemove={removeFn} itemEdit={editFn} itemSetComplete={setCompletedFn} />);
    wrapper.find(selectors.editButton).simulate('click');

    expect(removeFn).not.toBeCalled();
    expect(setCompletedFn).not.toBeCalled();
    expect(editFn).toBeCalledWith(item.id);
});

it('ToDoItem does call completed with correct value when checked', () => {
    const item = new models.ToDoItem({ id: 1, title: 'Test', description: 'Simple description', complete: false });
    const removeFn = jest.fn();
    const setCompletedFn = jest.fn();
    const editFn = jest.fn();

    const wrapper = enzyme.mount(<ToDoItem item={item} itemRemove={removeFn} itemEdit={editFn} itemSetComplete={setCompletedFn} />);
    wrapper.find(selectors.completeButton).simulate('click');

    expect(removeFn).not.toBeCalled();
    expect(editFn).not.toBeCalled();
    expect(setCompletedFn).toBeCalledWith(item.id, true);
});
