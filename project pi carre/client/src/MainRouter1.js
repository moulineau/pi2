import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AllUser from './App';
import Home from './Home';
import UserInfo from './UserInfo';
import Login from './Form';


class app extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/allUsers" component={AllUser} />
                    <Route path="/users/:id" component={UserInfo} />
                    <Route path="/login" component={Login}/>
                </div>
            </Router>
        )
    }
}
export default app 