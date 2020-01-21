import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ButtonDropdown,DropdownItem,DropdownMenu,DropdownToggle } from 'reactstrap';
import Cookies from "js-cookie";


class app extends Component {
    state = {
        user: [],
        dropdownOpen :false
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
    toggle=()=>{this.setState({dropdownOpen : !this.state.dropdownOpen})}
    somme=()=>{
        this.props.history.push(`/users/${sessionStorage.user_id}/somme`, {});
    }
    somme2=()=>{
        this.props.history.push(`/users/${sessionStorage.user_id}/somme2`, {});
    }
    sommeavg=()=>{
        this.props.history.push(`/users/${sessionStorage.user_id}/sommeavg2`, {});
    }
    main=()=>{
        this.props.history.push(`/users/${Cookies.get('user_id')}`, {});
        console.log("cookies",Cookies.get('user_id'));
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
                            <DropdownItem onClick={this.main}>Somme totale investie</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.somme2}>Nombre d'achat total</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.sommeavg}>Prix moyen d'entrée sur ethereum</DropdownItem>                            
                            <DropdownItem divider />
                            <DropdownItem onClick={this.main}>Page d'accueil</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                    <br /><br />
                    <p>Moyenne des montants dépensés par achat : {this.state.user}</p>
                </div>
            </Router>                 
        )
    }
}
export default app 