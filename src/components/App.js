// @flow
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import TodoPage from './TodoPage';

type Props = {
    children?: React.Node
};

class App extends React.Component<Props> {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={TodoPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
