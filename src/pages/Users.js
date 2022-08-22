import React from 'react';
import UserTable from '../components/UserTable';
import AddUser from '../components/AddUser';
import { getUsers } from '../API';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
      IsApiError: false
    }
  }
  
  componentDidMount() {
    getUsers()
        .then(result => {
            this.setState({
                userData: result
            });
        } , error => {
            this.setState({ IsApiError: true });
        } )         
  }

  render () {

    return(
      <div className='main'>
            <h2>Users</h2>
            <UserTable data={this.state.userData} />
            <AddUser />
        </div>
    );
  }
}

export default Users;