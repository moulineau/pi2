import React, { Component } from 'react';
import { Table,Button } from 'reactstrap';



class App extends Component {   
    state = {
        user: []
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        fetch(`/users/${params.id}`)
            .then(response => response.json())
            .then(user => this.setState({ user }))
            .catch(function (error) {
                console.log(error);
            })
    }
    Home = () => {
        this.props.history.push("/", {});
    };
    render() {
        const user = this.state.user.map(item => {
            return (
                <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.nom}</td>
                    <td>{item.prenom}</td>
                    <td>{item.email}</td>
                    <td>{item.mdp}</td>
                </tr>
            )
        })
        return (
            <div className="Unique User">
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>nom</th>
                            <th>prenom</th>
                            <th>Email</th>
                            <th>MDP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user}
                    </tbody>
                 
                </Table> 
                <Button
                    onClick={this.Home}
                    color="danger"
                    style={{ float: "left", marginRight: "5px" }}> Home
                </Button>
            </div>
            )
    }
}

export default App