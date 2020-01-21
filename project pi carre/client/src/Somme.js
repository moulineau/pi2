import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ButtonDropdown,DropdownItem,DropdownMenu,DropdownToggle } from 'reactstrap';
import {VictoryTheme,VictoryLine,VictoryChart} from 'victory';



class app extends Component {
    state = {
        user: [],
        dropdownOpen :false,
        datas: null
    }
    componentDidMount(){
        const { match: { params } } = this.props;
        fetch(`/use/users/${params.id}/buydate`, { credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(data => {
                this.setState({datas : data});
            })
            .catch(err => {
                err.json().then(errMess => {
                    if (errMess.message === "Un-Authorized User") {
                        this.props.history.push(`/users/${sessionStorage.user_id}`, {});
                        window.location.reload();
                    }
                    else {
                        this.props.history.push("/login", {})
                    }
                })

            }); 
        fetch(`/use/users/${params.id}/somme`, { credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(user=>user[0].sum)
            .then(user => this.setState({ user : `${user}`}))
            .catch(err => {
                err.json().then(errMess => {
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
    main=()=>{
        this.props.history.push(`/users/${sessionStorage.user_id}`, {});
    }
    somme2=()=>{
        this.props.history.push(`/users/${sessionStorage.user_id}/somme2`, {});
    }
    sommeavg=()=>{
        this.props.history.push(`/users/${sessionStorage.user_id}/sommeavg`, {});
    }
    sommeavg2=()=>{
        this.props.history.push(`/users/${sessionStorage.user_id}/sommeavg2`, {});
    }
    render() {
        return (                 
            <Router forceRefresh={false}>  
                <div>
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret color="danger">
                            Mes Choix 
                        </DropdownToggle>
                        <DropdownMenu>                            
                            <DropdownItem onClick={this.main}>Page d'accueil</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.somme2}>Nombre d'achat total</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.sommeavg2}>moyenne des sommes par achats</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.sommeavg}>prix moyen d'entrée sur ethereum</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                    <br /><br />
                    <p>Somme total investie : {this.state.user}</p>
                    <VictoryChart tsheme={VictoryTheme.material}>
                        <VictoryLine
                            style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid #ccc"}
                            }}
                            data={this.state.datas}
                            x="timestamp"
                            y="traded_currency"
                            />     
                    </VictoryChart>
                </div>
            </Router>                 
        )
    }
}
export default app 