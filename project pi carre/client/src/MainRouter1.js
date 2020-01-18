import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AllUser from './App';
import Home from './Home';
import UserInfo from './UserInfo';
import Login from './Form';
import somme from './Somme';
import somme2 from './Somme2.js';
import somme3 from './Sommeavg';
import somme4 from './Sommeavg2';


class app extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/allUsers" component={AllUser} />
                    <Route exact path="/users/:id" component={UserInfo} />
                    <Route path="/login" component={Login}/>
                    <Route exact path="/users/:id/somme" component={somme}/>
                    <Route exact path="/users/:id/somme2" component={somme2}/>
                    <Route exact path="/users/:id/sommeavg" component={somme3}/>
                    <Route exact path="/users/:id/sommeavg2" component={somme4}/>
                </div>
            </Router>
        )
    }
}
export default app 