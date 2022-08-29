import React from "react";
import ReactModal from "react-modal";
import { getToken } from "../App";
import { addUser } from "../API";


class AddUser extends React.Component {
    constructor () {
      super();
      this.state = {
        showModal: false,
        userName: "", 
        userEmail: "", 
        userLogin: "",
        userRole: "0",
        userStatus: "1",
        userPassword: "",
        userPasswordConfirm: ""
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

      // validate username
      if (this.state.userName.length < 3) {
        alert("Name must be at least 3 characters");
        return;
      }
      // validate email
      if (this.state.userEmail.length < 10 || !this.state.userEmail.includes("@")) {
        alert("Email must be at least 10 characters and contain an @");
        return;
      }
      // validate login
      if (this.state.userLogin.length < 3) {
        alert("Login must be at least 3 characters");
        return;
      }
      // validate password matches password confirmation
      if (this.state.userRole == "1") {
        if (this.state.userPassword == "") {
          alert("Password cannot be empty!");
          return;
        }
        if (this.state.userPassword !== this.state.userPasswordConfirm) {
          alert("Password and Password Confirmation do not match!");
          return;
        }
      }

      const result = await addUser({
        name: this.state.userName,
        email: this.state.userEmail,
        username: this.state.userLogin, 
        role: this.state.userRole,
        status: this.state.userStatus,
        password: this.state.userPassword,
        token: getToken()       
      });

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
              width: '30%',
              transform: 'translate(-40%, -10%)',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ccc',
              borderRadius: '25px',
            },
          };
      return (
        <div>
          <button className="normalbutton" onClick={this.handleOpenModal}>Add User</button>
          <ReactModal 
             isOpen={this.state.showModal}
             contentLabel="Component to add user"
             ariaHideApp={false}
             style={customStyles}
          >
            <div className="modal">
            <h2>Add User</h2>
            <form onSubmit={this.handleSubmit}>
                <div>
                <label className="form-label">
                    Name:</label>
                    <input className="form-input" type="text" name="userName" value={this.state.userName} onChange={this.handleChange.bind(this)}/>
                </div>

                <div>
                <label className="form-label">
                    Email:</label>
                    <input className="form-input" type="text" name="userEmail" value={this.state.userEmail} onChange={this.handleChange.bind(this)}/>
                </div>

                <div>
                <label className="form-label">
                    Login ID:</label>
                    <input className="form-input" type="text" name="userLogin" value={this.state.userLogin} onChange={this.handleChange.bind(this)}/>
                </div>
                <div>
                  <label className="form-label">Role:</label>
                  <select className="form-select" name="userRole" value={this.state.userRole} onChange={this.handleChange.bind(this)}>
                    <option value="0">Member</option>
                    <option value="1">Admin</option>
                  </select>
                </div>
                <div>
                  <p>Password is required for Admin role only.</p>
                <label className="form-label">
                    Password:</label>
                    <input className="form-input" type="password" name="userPassword" value={this.state.userPassword} onChange={this.handleChange.bind(this)}/>
                </div>
                <div>
                <label className="form-label">
                    Confirm password:</label>
                    <input className="form-input" type="password" name="userPasswordConfirm" value={this.state.userPasswordConfirm} onChange={this.handleChange.bind(this)}/>
                </div>
                <br/>
            </form>
            <button className="normalbutton" onClick={this.handleSubmit}>Save</button>
            <button className="normalbutton" onClick={this.handleCloseModal}>Cancel</button>
            </div>
          </ReactModal>
        </div>
      );
    }
  }

  export default AddUser;