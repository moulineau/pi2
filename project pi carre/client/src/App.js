import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import DataTable from './Components/Tables/DataTable';
import { CSVLink } from "react-csv";

class App extends Component {
  state = {
    items: []
  }

  getItems(){
      fetch('/use/allUsers', { credentials: 'include'})
          .then(response => {
              if (response.ok) {
                  return response.json();
              } else {
                  throw response;
              }
          })
          .then(items => this.setState({items}))
          .catch(err => {
              err.json().then(errMess => {
                  console.log("error : ", errMess.message);
                  if (errMess.message === "Un-Authorized User" || errMess.message === "Not Admin" ) {
                      this.props.history.push(`/users/${localStorage.user_id}`, {});
                      window.location.reload();
                  }
                  else {
                      this.props.history.push("/login", {})
                  }
              })

          })
  }  

  componentDidMount(){
    this.getItems()
  }
  Home = () => {
     this.props.history.push("/", {});
  };
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
            <Button
                onClick={this.Home}
                color="danger"
                style={{ float: "right", marginRight: "5px" }}> Home
            </Button>
          </Col>
            </Row>  
        </Container>
    )
  }
}

export default App