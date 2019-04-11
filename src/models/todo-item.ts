import * as im from 'immutable';

interface IToDoItem {
    id: number;
    title: string;
    description: string;
    complete: boolean;
}

export class ToDoItem extends im.Record<IToDoItem>({
    id: null,
    title: '',
    description: '',
    complete: false
}) {
    static fromJS(source: any) {
        return new ToDoItem({
            id: source.id,
            title: source.title,
            description: source.description,
            complete: source.complete
        });
    }
}

