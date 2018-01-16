// @flow
import React from 'react';
import { Visibility, Form } from 'semantic-ui-react';
import '../styles/todoPage.css';

type Props = {
    onPassed: Function,
    onVisible: Function,
    onSubmit: Function,
    onChange: Function,
    isFixed: boolean,
    todoName: string
};

const TodoInput = ({
    onPassed,
    onVisible,
    onSubmit,
    onChange,
    isFixed,
    todoName
}: Props) => (
    <Visibility once={false} onBottomPassed={onPassed} onTopVisible={onVisible}>
        <Form
            onSubmit={onSubmit}
            styleName={isFixed ? 'inputFixed' : 'inputNormal'}
        >
            <Form.Input
                size="huge"
                placeholder="Enter todo..."
                onChange={onChange}
                value={todoName}
            />
        </Form>
    </Visibility>
);

export default TodoInput;
