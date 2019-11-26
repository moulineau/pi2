
import React, { Component } from 'react'
import { Table } from 'reactstrap';
class DataTable extends Component {

   render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.nom}</td>
          <td>{item.prenom}</td>
          <td>{item.email}</td>        
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>nom</th>
            <th>prenom</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable