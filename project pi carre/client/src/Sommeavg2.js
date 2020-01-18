import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';




class app extends Component {
    state = {
        user: []
    }
    componentDidMount(){
        const { match: { params } } = this.props;
        fetch(`/use/users/${params.id}/sommeavg2`, { credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(user=>user[0].avg)
            .then(user => this.setState({ user : `${user}`}))
            .catch(err => {
                err.json().then(errMess => {
                    console.log("error : ", errMess.message);
                    if (errMess.message === "Un-Authorized User") {
                        this.props.history.push(`/users/${sessionStorage.user_id}`, {});
                        window.location.reload();
                    }
                    else {
                        this.props.history.push("/login", {})
                    }
                })

            });
    }
    render() {
        return (     
            <Router forceRefresh={true}>  
                <div>
                    <p>somme :{this.state.user}</p>
                </div>
            </Router>                 
        )
    }
}
export default app 