import React, { Component } from 'react';
import Form from './Form';
import { Modal } from 'reactstrap'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            result: [],
            etat:false
        }
    }
    disp = () => {
        this.setState.etat(true);
    };
    render() {
        return (
            <div>
                <Form
                    result={this.state.result}
                    item={this.props.item} />
                <Modal isOpen={this.state.etat} >
                    {console.log(this.state.result)}
                </Modal>
            </div>
        )
    }
}
export default App;