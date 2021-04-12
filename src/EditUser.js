import React, { Component } from 'react';
import {Modal ,Row, Form, Col, Button} from 'react-bootstrap';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.user?.id,
            name: props.user?.name,
            username: props.user?.username,
            email: props.user?.email,
            address : props.user?.address,
            phone: props.user?.phone,
            showHide : !!props.user
        }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(props, state){
        console.log('state');
        if((!props.user && !!this.props.user) || (props.user?.id !== this.props.user?.id)|| (!!props.user && !this.props.user)){
            console.log('props');
            this.setState( { id: this.props.user?.id,
                name: this.props.user?.name,
                username: this.props.user?.username,
                email: this.props.user?.email,
                address : this.props.user?.address,
                phone: this.props.user?.phone,
                showHide : !!this.props.user
            })
        }
        console.log('close');
        return {...state};

    }

    handleModalShowHide(save=false) {
        const {showHide,...user} = this.state;
        if(save === true){
            this.props.editUser(user);
        }
        this.setState(prevState =>({ showHide: !prevState.showHide }),()=>this.props.reset())
        
    }

    handleChange(event) {
        const { name,value } = event.target;
        if(name.indexOf('address')>-1){
            this.setState(prevState =>({
               address:{...prevState.address,[name=== 'address.street'?'street':'city']:value}
              }))
        }
        this.setState({
          [name]:value,
        })
      }
     
      handleSubmit(event) {
        event.preventDefault();
        this.props.onFormSubmit(this.state);
        this.setState(this.State);
      }


  
    render() {
        console.log('hi',this.state.showHide);
        return (
            <div>           

            <Modal show={this.state.showHide}>
                <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                <Modal.Title>Edit Employee Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Row>
                        <Col md={12}>
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            placeholder="Name"/>
                        </Form.Group>
                        <Form.Group controlId="username">
                            <Form.Label>UserName</Form.Label>
                            <Form.Control
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            placeholder="username" />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="email" />
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                            type="text"
                            name="address.street"
                            value={this.state.address?.street}
                            onChange={this.handleChange}
                            placeholder="street" />
                              <Form.Control
                            type="text"
                            name="address.city"
                            value={this.state.address?.city}
                            onChange={this.handleChange}
                            placeholder="city" />
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                            type="text"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.handleChange}
                            placeholder="phone" />
                        </Form.Group>
                        {/* <Form.Group>
                            <Form.Control type="hidden" name="id" value={this.state.id} />
                            <Button variant="success" type="submit">Save</Button>
                        </Form.Group> */}
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => this.handleModalShowHide(true)}>
                   Update
                </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
    }
}

export default EditUser;