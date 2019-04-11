import React from 'react';
import * as models from '../../../models';
import * as actions from '../../../actions';
import { ButtonGroup, Button, Card } from 'react-bootstrap';
import './todo-item.scss';

export interface ToDoItemProps {
    item: models.ToDoItem;
    itemEdit: typeof actions.itemEdit;
    itemRemove: typeof actions.itemRemove;
    itemSetComplete: typeof actions.itemSetComplete;
}

export function ToDoItem({ item, itemEdit, itemSetComplete, itemRemove }: ToDoItemProps) {
    return <li className={`ToDoItem ${item.complete && 'completed'}`}>
        <Card>
            <Card.Header >
                <h5 className="title">{item.title}</h5>
                <ButtonGroup size="sm">
                    <Button className="complete" onClick={() => itemSetComplete(item.id, !item.complete)} >
                        {item.complete ?
                            <i className="fas fa-minus-square check" /> :
                            <i className="fas fa-check-square check" />}
                    </Button>
                    <Button className="edit" onClick={() => itemEdit(item.id)}><i className="fas fa-edit" /></Button>
                    <Button className="remove" onClick={() => itemRemove(item.id)} ><i className="fas fa-trash-alt" /></Button>
                </ButtonGroup>
            </Card.Header>
            <Card.Body>
                {item.description && <p className="description">{item.description}</p>}
            </Card.Body>
        </Card>

    </li >;
}

