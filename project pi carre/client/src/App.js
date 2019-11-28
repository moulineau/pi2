
import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'
import { CSVLink } from "react-csv"

class App extends Component {
  state = {
    items: []
  }

  getItems(){
    fetch('/AllUsers')
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }  

  componentDidMount(){
    this.getItems()
  }

  render() {
    return (
      <Container className="App" >
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Users Database</h1>
		  </Col>
        </Row>
        <Row>
          <Col>
            <DataTable items={this.state.items} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{float: "left", marginRight: "10px"}}
              className="btn btn-primary"
              data={this.state.items}>
              Download CSV
            </CSVLink>           
          </Col>
            </Row>            
        </Container>
        
    )
  }
}

export default App