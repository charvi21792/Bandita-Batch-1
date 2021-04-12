import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {faEye } from "@fortawesome/free-solid-svg-icons";
import {faPen } from "@fortawesome/free-solid-svg-icons";
import {faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'react-bootstrap';
import EditUser from './EditUser';
import ViewUser from './ViewUser';
import {ButtonGroup,ButtonToolbar} from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Link } from 'react-router-dom';

class Employeelist extends Component{

    constructor(props){
        super(props);
        this.state= {
            users:[],
            isLoading: false,
            isError: false,
            id: ''
        }
        this.handleRemove = this.handleRemove.bind(this);
    }
    
   async componentDidMount(){
       this.setState({isLoading: true});
       const response = await fetch("https://jsonplaceholder.typicode.com/users");
      // console.log((response.json));

       if(response.ok){
           const users = await response.json();
           this.setState({users, isLoading: false});
         // console.log(users);
       }else{
        this.setState({ isError: true, isLoading: false});
       }
    }

     viewUser(id){
        console.log(id);
        //const users = [...this.state.users];
        

    }
    

      handleModalShowHide(id) {
          console.log(id);
          //const users = [...this.state.users];
          this.setState({ id })
    }

    

    handleRemove(id){
        const users = [...this.state.users];
        const updatedList = users.filter(item => item.id !== id); 

        //update state
    this.setState({ users: updatedList });
    }

    editUser(user){
        const updatedList = this.state.users.map(item =>{
            if(user.id === item.id){
                return user;

            }   
                 return item;              
            
        }); 
        this.setState({ users: updatedList });
    }
   
    render() {
       const {users, isLoading, isError,showHide } = this.state
        if(isLoading){
            return <div>Loading...</div>
        }
        if(isError){
            return <div>Error</div>
        }
       
        return this.state.users.length > 0 ? (

            <div className="container" style={{ textAlign: "center" }}>
            <h1>Employee Details Table</h1>
            <div></div>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>UserName</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {
                        users.map((user,i) => (
                            <tr key={i}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{`${user.address.street},${user.address.city}`}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <ButtonToolbar aria-label="Toolbar with button groups">
                                        <ButtonGroup aria-label="First group">
                                        <Link to={`/users/${user.id}`}><Button className="btn-xs btn-primary m-2"> <FontAwesomeIcon icon={faEye} />View</Button></Link> 
                                        <Button className="btn-xs btn-warning m-2" onClick={(e) => this.handleModalShowHide(user.id)}><FontAwesomeIcon icon={faPen} /> Edit</Button>
                                        <Button className="btn-xs btn-danger m-2" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleRemove(user.id) } } > <FontAwesomeIcon icon={faTrash} />Delete</Button>
                                        </ButtonGroup>                                
                                    </ButtonToolbar>
                                    
                                </td>

                            </tr>
                        ))
                    }
                     <EditUser user={users.find(user=>user.id===this.state.id)} editUser={(user) => this.editUser(user)} reset={()=>this.setState({id:undefined})}/>
                     
                    </tbody>
                   
                    </Table>
                    </div>
        ) : (
            <div>No Users Found</div>
        )
    }
    
}



export default Employeelist;