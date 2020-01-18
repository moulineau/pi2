import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';


class Forme extends React.Component {
    state = {
        mdp: '',
        email: '',
        visible: false,
        MessageError:''
    }
    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitForm = e => {
        const user = {
            mdp: this.state.mdp,
            email: this.state.email
        }
        e.preventDefault()
        fetch('/auth/login', {            
            credentials: 'include',
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(response => {
                sessionStorage.user_id = response.id;
                this.props.history.push(`/users/${response.id}`, {});                
            })
            .catch(err => {
                err.json().then(errMess => {
                    console.log("error : ", errMess.message);
                    this.setState({ MessageError: errMess.message });
                });
                this.setState({ visible: true });
            })
    };

    componentDidMount() {
        // if item exists, populate the state with proper data
        if (this.props.item) {
            const { email, mdp } = this.props.item
            this.setState({ email, mdp })
        }
    };
    Home = () => {
        this.props.history.push("/", {});
    };
    render() {        
        const onDismiss = () => this.setState({ visible: false });        
        return (
            <div>
                {sessionStorage.user_id ? <Redirect to="/users/{localStorage.user_id}" />:null}
                <Alert color="danger" isOpen={this.state.visible} toggle={onDismiss}>{this.state.MessageError}</Alert>
                <Form onSubmit={this.submitForm}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="mdp">Mot de passe</Label>
                        <Input type="password" name="mdp" id="mdp" onChange={this.onChange} value={this.state.mdp === null ? '' : this.state.mdp} />
                    </FormGroup>                     
                    <Button>Submit</Button>                    
                </Form>
                <Button
                    onClick={this.Home}
                    color="danger"
                    style={{ float: "left", marginRight: "5px" }}> Home
                </Button>
            </div>
        );
    }
}

export default Forme