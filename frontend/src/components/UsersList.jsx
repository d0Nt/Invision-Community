import React from 'react';
import './../css/UsersList.css';
export default class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        fetch("/api/users/1")
        .then((results) => { 
            if(!results.ok)
                return {error: "error"};
            return results.json()
        })
        .then((response) => {
            if(typeof response.error === 'undefined'){
                this.setState({data: response});
            }else
                console.log(response.error);
        });
    }
    render() {
        return (
            <div className="content full">
                <table>
                    <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Avatar</td>
                        <td>Group</td>
                        <td>Registered</td>
                        <td>Last visit</td>
                        <td>Posts</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map((user, id) => {      
                        return (<tr key={id}>
                            <td>{user.id}</td>
                            <td><img height="32" src={user.photoUrl} /></td>
                            <td>{user.name}</td>
                            <td>{user.primaryGroup}</td>
                            <td>{user.joined}</td>
                            <td>{user.lastVisit}</td>
                            <td>{user.posts}</td>
                        </tr>) 
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}