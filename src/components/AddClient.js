import React from "react";

class AddClient extends React.Component {
  // function to close the add client dialog
  closeAddClientDialog = () => {
    const addClientDialog = document.getElementById("addClientDialog");
    addClientDialog.close();
  }

  render() {
    const { handleChange, validateInput, clientName, clientEmail, clientPhone, clientAddress, addClient } = this.props;

    return (
      <dialog id="addClientDialog" className="add-client-dialog">
        {/* input field for client name */}
        <div className="input-container">
          <label htmlFor="clientNameInput" className="input-label">Nom du client</label>
          <input id="clientNameInput" className="input-field mt-6" name="clientName" type="text" placeholder="John Doe" value={clientName} onChange={handleChange} onBlur={validateInput} required />
        </div>

        {/* input field for client email */}
        <div className="input-container mt-24">
          <label htmlFor="clientEmailInput" className="input-label">Adresse électronique du client</label>
          <input id="clientEmailInput" className="input-field mt-6" name="clientEmail" type="text" placeholder="john.doe@example.com" value={clientEmail} onChange={handleChange} onBlur={validateInput} required />
        </div>

        {/* input field for client phone number */}
        <div className="input-container mt-24">
          <label htmlFor="clientPhoneInput" className="input-label">Numéro de téléphone du client</label>
          <input id="clientPhoneInput" className="input-field mt-6" name="clientPhone" type="text" placeholder="0000000000" value={clientPhone} onChange={handleChange} onBlur={validateInput} required />
        </div>

        {/* input field for client address */}
        <div className="input-container mt-24">
          <label htmlFor="clientAddressInput" className="input-label">Adresse du client</label>
          <input id="clientAddressInput" className="input-field mt-6" name="clientAddress" type="text" placeholder="123 Avenue X, Ville, 00000" value={clientAddress} onChange={handleChange} onBlur={validateInput} required />
        </div>

        {/* action buttons for adding or canceling */}
        <div className="action-buttons-container mt-44">
          <button id="addItemButton" className="secondary-button" onClick={this.closeAddClientDialog}>Annuler</button>
          <button id="addItemButton" className="primary-button" onClick={addClient}>Ajouter</button>
        </div>
      </dialog>
    );
  }
}

export default AddClient;