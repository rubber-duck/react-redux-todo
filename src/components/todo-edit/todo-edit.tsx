import React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as router from 'connected-react-router';
import { Formik } from 'formik';
import { Form, Button, Alert, Card, ButtonGroup } from 'react-bootstrap';
import * as actions from '@actions';
import * as models from '@models';
import * as store from '@store';


export interface ToDoEditProps {
    item: models.ToDoItem,
    itemId: number,
    itemSetText: typeof actions.itemSetText,
    goBack: typeof router.goBack
}

function mapStateToProps(state: store.Store, ownProps: { itemId: number }) {
    console.log(state.toDoList.items);
    return {
        item: state.toDoList.items.find(i => i.id === ownProps.itemId)
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({
        itemSetText: actions.itemSetText,
        goBack: router.goBack
    }, dispatch);
}

export function ToDoEditPure({ item, itemId, itemSetText, goBack }: ToDoEditProps) {
    if (!item) {
        return <Alert variant="danger">Item with ID {itemId} not found !</Alert>
    }
    return <Card>
        <Card.Body>
            <Card.Title>Edit ToDo :</Card.Title>
            <Formik
                onSubmit={async (values) => { await itemSetText(item.id, values.title, values.description); goBack(); }}
                validate={(values) => { if (!values.title || values.title.length < 0) return { title: 'Title is required !' }; }}
                initialValues={{ title: item.title, description: item.description, }}>
                {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="todoTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" placeholder="ToDo Title" value={values.title} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.title && errors.title != undefined} />
                            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="newToDo.Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" rows="3" placeholder="Description" value={values.description} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.description && errors.description != undefined} />
                            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                        </Form.Group>
                        <ButtonGroup className="float-right">
                            <Button variant="secondary" onClick={() => goBack()}><i className="fas fa-times" /> Discard</Button>
                            <Button variant="primary" type="submit" disabled={!touched || !isValid}><i className="fas fa-check" /> Save changes</Button>
                        </ButtonGroup>
                    </Form>)
                }
            </Formik>
        </Card.Body>
    </Card>
};

export const ToDoEdit = connect(mapStateToProps, mapDispatchToProps)(ToDoEditPure);