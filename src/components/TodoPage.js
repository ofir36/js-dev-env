// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/todoActions'; // add _ to prevent accidently trying dispatching events
// import type { State as AppState } from '../types';
import { Header, Icon } from 'semantic-ui-react';
import TodoInput from './TodoInput';
import TodoList from './TodoListContainer';
import '../styles/todoPage.css';

type Props = {
    actions: typeof actionCreators
};

type State = {
    todoName: string,
    inputFixed: boolean
};

class TodoPage extends React.Component<Props, State> {
    state = {
        todoName: '',
        inputFixed: false
    };

    addTodo = () => {
        if (this.state.todoName === '') return;

        const todo = {
            id: +new Date(),
            name: this.state.todoName
        };

        this.props.actions.addTodo(todo);
        this.setState({ todoName: '' });
    };

    onNameChange = e => {
        const todoName = e.currentTarget.value;
        this.setState({ todoName });
    };

    onInputPassed = () => {
        this.setState({ inputFixed: true });
    };

    onInputVisible = () => {
        this.setState({ inputFixed: false });
    };

    render() {
        return (
            <div styleName="container">
                <Header as="h1" textAlign="center">
                    <Icon name="tasks" />
                    Todos
                </Header>
                <TodoInput
                    isFixed={this.state.inputFixed}
                    onChange={this.onNameChange}
                    onPassed={this.onInputPassed}
                    onVisible={this.onInputVisible}
                    onSubmit={this.addTodo}
                    todoName={this.state.todoName}
                />
                <TodoList />
            </div>
        );
    }
}

// const mapStateToProps = (state: AppState) => {
//     return {};
// };

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(TodoPage);
