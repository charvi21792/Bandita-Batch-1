import React from 'react';
import { Table,Button } from 'react-bootstrap';
import { withRouter,Link } from 'react-router-dom';
import {Modal ,Row, Form, Col} from 'react-bootstrap';
//import Employeelist from './Employeelist';

//import { withRouter } from 'react-router-dom'
class ViewUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
             isLoaded: false,
            users: null
        }
    }

    componentDidMount(){
        //console.log(this.props);
        const userId = this.props.match.params.id;
        let api = 'https://jsonplaceholder.typicode.com/users/' + userId;
        fetch(api).then((response) => response.json()).then((apiData) => {
            this.setState({users: apiData});
           console.log(this.state.users);
        }).catch(error => {
            console.log(error);
        });
    }

       
    render(){
        const {users} = this.state;
        return (
            users ? (
        <div className="container" >
            <h1 style={{textAlign: "center"}}>Employee Details </h1>

           <Link to='/'><Button className="btn btn-primary" style={{textAlign: "center"}}>Go back</Button></Link> 
            <div>
            <Form  className="container" style={{marginTop: 10}}>
            
                         <Row>
                        <Col md={6}>
                    
                        <Form.Group controlId="name">
                            <Form.Label style={{textAlign:"left"}}>Name</Form.Label>
                            <Form.Control
                            type="text"
                            name="name"
                            value={users.name} readOnly />
                        </Form.Group>
                        <Form.Group controlId="username">
                            <Form.Label>UserName</Form.Label>
                            <Form.Control
                            type="text"
                            name="username"
                            value={users.username} readOnly />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                            type="text"
                            name="email"
                            value={users.email} readOnly />
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                            type="text"
                            name="address.street"
                            value={users.address.street} readOnly />
                              <Form.Control
                            type="text"
                            name="address.city"
                            value={users.address.city} readOnly />
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                            type="text"
                            name="phone"
                            value={users.phone} readOnly  />
                        </Form.Group>
                        </Col>
                </Row>
                        </Form>
                        
            
                        </div>
            
        </div>
        
        
            ) : <div>No data found</div>
        );
    }
}

export default withRouter(ViewUser);