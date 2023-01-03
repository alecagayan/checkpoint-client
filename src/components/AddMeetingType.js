import React from "react";
import ReactModal from "react-modal";
import { getToken } from "../App";
import { addMeetingType } from "../API";


class AddMeetingType extends React.Component {
    constructor () {
      super();
      this.state = {
        showModal: false,
        typeName: "", 
        typeMultiplier: "", 
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
      if (this.state.typeName.length < 2) {
        alert("Name must be at least 2 characters");
        return;
      }
      // check if multiplier is a number
      if (isNaN(this.state.typeMultiplier)) {
        alert("Multiplier must be a number");
        return;
      }


      const result = await addMeetingType({
        name: this.state.typeName,
        multiplier: this.state.typeMultiplier,
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
              top: '10%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              width: '30%',
              transform: 'translate(-50%, 0%)',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ccc',
              borderRadius: '25px',
            },
          };
      return (
        <div>
          <button className="normalbutton" onClick={this.handleOpenModal}>Add Meeting Type</button>
          <ReactModal 
             isOpen={this.state.showModal}
             contentLabel="Component to add meeting type"
             ariaHideApp={false}
             style={customStyles}
          >
            <div className="modal">
            <h2>Add Meeting Type</h2>
            <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                <label className="form-label">
                    Name:</label>
                    <input className="form-input" type="text" name="typeName" value={this.state.typeName} onChange={this.handleChange.bind(this)} autoFocus/>
                </div>

                <div className="form-row">
                <label className="form-label">
                    Multiplier:</label>
                    <input className="form-input" type="text" name="typeMultiplier" value={this.state.typeMultiplier} onChange={this.handleChange.bind(this)}/>
                </div>
            </form>
            <button className="normalbutton" onClick={this.handleSubmit}>Save</button>
            <button className="normalbutton" onClick={this.handleCloseModal}>Cancel</button>
            </div>
          </ReactModal>
        </div>
      );
    }
  }

  export default AddMeetingType;