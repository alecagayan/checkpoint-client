import React from "react";
import ReactModal from "react-modal";

async function addUser(userData) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/adduser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(data => data.json())
   }


class AddUser extends React.Component {
    constructor () {
      super();
      this.state = {
        showModal: false,
        userName: "", 
        userEmail: "", 
        userLogin: ""
      };
      
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleSaveModal = this.handleSubmit.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    
    handleOpenModal () {
      this.setState({ showModal: true });
    }
    
    handleSubmit = async e => {

      e.preventDefault();
      const result = await addUser({
        name: this.state.userName,
        email: this.state.userEmail,
        username: this.state.userLogin,        
      });
      //console.log('we received response: ', result);

      this.setState({ showModal: false });

    }
      
    handleCloseModal () {
      this.setState({ showModal: false });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value} );
    }

    render () {
        const customStyles = {
            content: {
              top: '35%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              width: '60%',
              transform: 'translate(-40%, -10%)',
            },
          };
      return (
        <div>
          <button onClick={this.handleOpenModal}>Add User</button>
          <ReactModal 
             isOpen={this.state.showModal}
             contentLabel="Minimal Modal Example"
             ariaHideApp={false}
             style={customStyles}
          >
            <h2>Add User</h2>
            <form onSubmit={this.handleSubmit}>
                <div>
                <label>
                    Name:
                    <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange.bind(this)}/>
                </label>
                </div>

                <div>
                <label>
                    Email:
                    <input type="text" name="userEmail" value={this.state.userEmail} onChange={this.handleChange.bind(this)}/>
                </label>
                </div>

                <div>
                <label>
                    Login ID:
                    <input type="text" name="userLogin" value={this.state.userLogin} onChange={this.handleChange.bind(this)}/>
                </label>
                </div>
            </form>
            <button onClick={this.handleSubmit}>Save</button>
            <button onClick={this.handleCloseModal}>Cancel</button>

          </ReactModal>
        </div>
      );
    }
  }

  export default AddUser;