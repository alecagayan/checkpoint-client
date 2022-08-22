import React from 'react';
import UserTable from '../components/UserTable';
import AddUser from '../components/AddUser';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
      IsApiError: false
    }
    
  }
  
  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL + "/rbapi/users")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    userData: result
                });
            },
            (error) => {
                this.setState({ IsApiError: true });
            }
        )

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