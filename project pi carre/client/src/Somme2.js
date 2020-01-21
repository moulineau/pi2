import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ButtonDropdown,DropdownItem,DropdownMenu,DropdownToggle } from 'reactstrap';




class app extends Component {
    state = {
        user: [],
        dropdownOpen :false
    }
    componentDidMount(){
        const { match: { params } } = this.props;
        fetch(`/use/users/${params.id}/somme2`, { credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(user=>user[0].count)
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
    toggle=()=>{this.setState({dropdownOpen : !this.state.dropdownOpen})}
    somme=()=>{
        this.props.history.push(`/users/${sessionStorage.user_id}/somme`, {});
    }
    main=()=>{
        this.props.history.push(`/users/${sessionStorage.user_id}`, {});
    }
    sommeavg=()=>{
        this.props.history.push(`/users/${sessionStorage.user_id}/sommeavg`, {});
    }
    sommeavg2=()=>{
        this.props.history.push(`/users/${sessionStorage.user_id}/sommeavg2`, {});
    }
    render() {
        return (     
            <Router forceRefresh={true}>  
                <div>
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret color="danger">
                            Mes Choix 
                        </DropdownToggle>
                        <DropdownMenu>                            
                            <DropdownItem onClick={this.somme}>Somme totale investie</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.main}>Page d'accueil</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.sommeavg2}>moyenne des sommes par achats</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.sommeavg}>prix moyen d'entrée sur ethereum</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                    <br /><br />
                    <p>Nombre d'achat total : {this.state.user}</p>
                </div>
            </Router>                 
        )
    }
}
export default app 