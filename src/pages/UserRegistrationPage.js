import React, { Component }   from 'react';
import { UserList } from '../layout/UserList';

const API = 'http://localhost:3001/';
const DEFAULT_QUERY = 'users?_sort=id&_order=desc';

export class UserRegistrationPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            users: [],
            isLoading: false,
            error: null,
            lastName: '',
            firstName: '',
            userName: '',
            email: ''
        };

        this.getUsers = this.getUsers.bind(this);
        this.postNewUser = this.postNewUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    postNewUser(){
        const lastName = this.state.lastName;
        const firstName = this.state.firstName;
        const userName = this.state.userName;
        const email = this.state.email;

        fetch(API + DEFAULT_QUERY,
            {
                method: 'POST',
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify({firstName:firstName, lastName:lastName, userName:userName, email:email})
            }
        ).then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong...')
            }
        }).then((data) => {
            console.log('Insertion of ' + JSON.stringify(data));
            this.getUsers();
        })
        .catch((err) => console.log(err));

    }

    getUsers() {
        this.setState({ isLoading: true });

        fetch(API + DEFAULT_QUERY)
            .then(response => {
                if(response.ok) {
                    return response.json()
                } else {
                    throw new Error('Something went wrong...')
                }
            })
            .then(data => this.setState({ users: data, isLoading: false}))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    handleChange(event){
        let change = {};
        change[event.target.id] = event.target.value;
        this.setState(change);
    }

    componentDidMount() {
        this.getUsers();
    }

    render(){
        const users = this.state.users;
        const isLoading = this.state.isLoading;
        const error = this.state.error;

        const handleChange = this.handleChange;

        const lastName = this.state.lastName;
        const firstName = this.state.firstName;
        const userName = this.state.userName;
        const email = this.state.email;

        return (
            <div className="content container-fluid">
                <div className="row mb-4">
                    <div className="col-sm">
                        <h1 className="display-4">User Registration</h1>
                        <p className="lead">This page shows an example of a simple user registration and listing.</p>
                    </div>
                </div>
    
                <div className="card mb-4">
                    <div className="card-header">Register Here</div>
    
                    <div className="card-body">     
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        value={lastName}
                                        onChange={handleChange}
                                        placeholder="Enter your last name" />
                                </div>       
                            </div>

                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        value={firstName}
                                        onChange={handleChange}
                                        placeholder="Enter your first name" />
                                </div>       
                            </div>

                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="userName">User Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="userName"
                                        value={userName}
                                        onChange={handleChange}
                                        placeholder="Enter your user name" />
                                </div>       
                            </div>
                        </div>

                        <div className="row">    
                            <div className="col-8">
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={handleChange}
                                        aria-describedby="emailHelp"
                                        placeholder="Enter email" />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                            </div>
                        </div>
    
                        <button type="submit" className="btn btn-primary float-right" onClick={this.postNewUser}>Register</button>
                    </div>
                </div>
    
                <div className="card mb-4">
                    <div className="card-header">List of Users</div>
    
                    <div className="card-body">
                        <UserList users={users} isLoading={isLoading} error={error} />
                    </div>
                </div>
    
            </div>
        );
    }
}