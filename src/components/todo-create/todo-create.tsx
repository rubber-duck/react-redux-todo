import React from 'react';
import { Formik } from 'formik';
import { Form, Button, Card } from 'react-bootstrap';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as router from 'connected-react-router';
import { Store } from '../../store';
import * as actions from '../../actions'
import { ButtonGroup } from 'react-bootstrap';


export interface ToDoCreateProps {
    itemAdd: typeof actions.itemAdd,
    goBack: typeof router.goBack
}
function mapStateToProps(state: Store) {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({
        itemAdd: actions.itemAdd,
        goBack: router.goBack
    }, dispatch);
}

export const ToDoCreate = connect(mapStateToProps, mapDispatchToProps)
    (({ itemAdd, goBack }: ToDoCreateProps) => {
        return <Card>
            <Card.Body>
                <Card.Title>New ToDo :</Card.Title>
                <Formik
                    onSubmit={async (values) => { await itemAdd(values.title, values.description); goBack(); }}
                    validate={(values) => { if (!values.title && values.title.length < 1) return { title: 'Title is required !' }; }}
                    initialValues={{ title: '', description: '', }}>
                    {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group controlId="todoTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="title" placeholder="Title" value={values.title} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.title && errors.title != undefined} />
                                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="newToDo.Description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" name="description" rows="3" placeholder="Description" value={values.description} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.description && errors.description != undefined} />
                                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                            </Form.Group>
                            <ButtonGroup className="float-right">
                                <Button variant="secondary" onClick={() => goBack()}><i className="fas fa-times" /> Cancel</Button>
                                <Button variant="primary" type="submit" disabled={!touched || !isValid}><i className="fas fa-check" /> Create</Button>
                            </ButtonGroup>
                        </Form>)
                    }
                </Formik>
            </Card.Body>
        </Card>;
    });