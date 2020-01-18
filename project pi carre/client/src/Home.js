import React, { Component } from 'react';
import { Button } from 'reactstrap'
import { BrowserRouter as Router } from 'react-router-dom';

class app extends Component {
    
    Login = () => {
        this.props.history.push("/login", {});
    };
    ToAllUser = () => {
        this.props.history.push("/allUsers", {});
    };
    GoUser = (id) => {
        this.props.history.push(`/users/${id}`, {});
    };
    render() {
        return (
            <Router forceRefresh={true}>
                <div className="home">
                     <header className="page-header">
                        <h1>Welcome</h1>
                    </header>
                    <Button
                        onClick={this.ToAllUser}
                       
                        color="info"block
                        style={{ float: "center", marginRight: "10px"}}>tous les users
                    </Button> 
                    <Button
                        onClick={() => this.GoUser(1)}
                        size="lg"
                        color="danger"block
                        style={{ float: "center", marginRight: "5px" }}> user 1
                    </Button>  
                    <Button
                        onClick={() => this.GoUser(2)}
                        color="danger"
                        size="lg" block
                        style={{ float: "center", marginRight: "5px"}}> user 2
                    </Button>  
                    <br /><br />
                    <Button
                        onClick={this.Login}
                        color="danger"
                        size="lg" block
                        style={{ float: "center", marginRight: "5px" }}> Login
                    </Button>  
                    
                </div>                
            </Router>
        )
    }
}
export default app;