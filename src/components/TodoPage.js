// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/todoActions';
import type { State } from '../types';
import type { Todo } from '../types/todo';
import TodoList from './TodoList';

type Props = {
    todos: Todo[],
    actions: typeof actions
};

type LocalState = {
    todo: Todo
};

class TodoPage extends React.Component<Props, LocalState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            todo: { name: '' }
        };
    }

    addTodo() {
        this.props.actions.addTodo(this.state.todo);
    }

    onNameChange(e) {
        const todo = {
            name: e.currentTarget.value
        };
        this.setState({ todo });
    }

    render() {
        return (
            <div>
                <input onChange={e => this.onNameChange(e)} />
                <input type="submit" value="add" onClick={() => this.addTodo()} />
                <TodoList todos={this.props.todos} />
            </div>
        );
    }
}

const mapStateToProps = (state: State) => {
    return {
        todos: state.todos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
