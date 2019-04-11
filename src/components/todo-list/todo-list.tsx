import React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as models from '@models';
import * as actions from '@actions';
import * as store from '@store';
import { ToDoItem } from './item';
import './todo-list.scss';


export interface ToDoListProps {
    toDoList: models.ToDoList,
    itemCreate: typeof actions.itemCreate,
    itemRemove: typeof actions.itemRemove,
    itemSetComplete: typeof actions.itemSetComplete,
    itemEdit: typeof actions.itemEdit
}

function mapStateToProps(state: store.Store) {
    return {
        toDoList: state.toDoList
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({
        itemCreate: actions.itemCreate,
        itemRemove: actions.itemRemove,
        itemSetComplete: actions.itemSetComplete,
        itemEdit: actions.itemEdit
    }, dispatch);
} 

export function ToDoListPure({ toDoList, itemCreate, itemEdit, itemRemove, itemSetComplete }: ToDoListProps) {
    return <div className="ToDoList">
        <ul className="list-group list-group-flush">
            {toDoList.items
                .filter(item => !item.complete || toDoList.showCompleted)
                .map(item => <ToDoItem key={item.id} item={item} itemEdit={itemEdit} itemSetComplete={itemSetComplete} itemRemove={itemRemove} />)}
        </ul>
    </div>;
};

export const ToDoList = connect(mapStateToProps, mapDispatchToProps)(ToDoListPure);