import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useHistory } from 'react-router-dom';

class Forme extends React.Component {
    state = {
        mdp: '',
        email: '',
        visible: false
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
                    const a = response.json();
                    throw new Error(a.responseText);
                }
            })
            .then(response => {
                console.log(response);
                this.props.history.push(`/users/${response.id}`, {});
            })
            .catch(err => {
                console.log(err);
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
                <Alert color="danger" isOpen={this.state.visible} toggle={onDismiss}>Donnees invalides</Alert>
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