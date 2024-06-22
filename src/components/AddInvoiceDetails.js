import React from "react";
import ItemList from "./ItemList";
import AddClient from "./AddClient";

class AddInvoiceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectedItems: new Set(),
      availableItems: [],
      availableClients: [],
      invoiceParty: "Sélectionner un client...",
      invoiceNumber: "",
      invoiceDate: "",
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      clientAddress: "",
      showItemsContainer: false,
      isButtonActive: false
    };

    this.addItem = this.addItem.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.addClient = this.addClient.bind(this);
  }

  componentDidMount() {
    const storedItems = localStorage.getItem("itemStorage");
    const storedClients = localStorage.getItem("clientStorage");

    if(storedItems) {
      this.setState({ availableItems: JSON.parse(storedItems) });
    }

    if(storedClients) {
      this.setState({ availableClients: JSON.parse(storedClients) });
    }
  }

  addItem = () => {
    const { isButtonActive } = this.state;

    if(!isButtonActive) {
      this.setState({
        isButtonActive: true
      });
    }

    if(this.state.items.length < this.state.availableItems.length) {
      this.setState((prevState) => ({
        items: prevState.items.length === 0 ? [{ itemId: "", itemName: "", itemQuantity: "", itemPrice: "", itemDiscount: "", itemTotal: "" }] : [...prevState.items, { itemId: "", itemName: "", itemQuantity: "", itemPrice: "", itemDiscount: "", itemTotal: "" }],
        showItemsContainer: true
      }));
    }
  };

  updateItem = (index, updates) => {
    const updatedItems = this.state.items.map((item, i) =>
      i === index ? { ...item, ...updates } : item
    );
    this.setState({ items: updatedItems }, () => {
      this.updateSelectedItems();
    });
  };

  updateSelectedItems = () => {
    const selectedItems = new Set();
    this.state.items.forEach((item) => {
      if (item.itemName !== "") {
        selectedItems.add(item.itemName);
      }
    });
    this.setState({ selectedItems });
  };

  handleChange = (event) => {
    let { name: inputName, value: inputValue } = event.target;

    if(inputName === "invoiceParty" && inputValue === "+ Insérer un client") {
      const addClientDialog = document.getElementById("addClientDialog");
      return addClientDialog.showModal();
    }

    this.setState({ [inputName]: inputValue });
  };

  validateInput = (event) => {
    let { name: inputName, value: inputValue } = event.target;
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^0[5-8]\d{8}$/;

    switch(inputName) {
      case "invoiceNumber":
        if(parseInt(inputValue) <= 0 || isNaN(inputValue)) {
          this.setState({ invoiceNumber: "" });
        }
        break;
      case "invoiceDate":
        if(!dateRegex.test(inputValue)) {
          this.setState({ invoiceDate: "" });
        }
        break;
      case "clientName":
        if(inputValue === "" || inputValue.length <= 3) {
          this.setState({ clientName: "" });
        }
        break;
      case "clientEmail":
        if(!emailRegex.test(inputValue)) {
          this.setState({ clientEmail: "" });
        }
        break;
      case "clientPhone":
        if(!phoneRegex.test(inputValue)) {
          this.setState({ clientPhone: "" });
        }
        break;
      case "clientAddress":
        if(inputValue === "" || inputValue.length <= 3) {
          this.setState({ clientAddress: "" });
        }
        break;
      default:
        break;
    }
  }

  createInvoice = () => {
    const { invoiceNumber, invoiceDate, invoiceParty, items } = this.state;
    const { availableInvoices, handleInvoicesUpdate } = this.props;
    const storedInvoices = JSON.parse(localStorage.getItem("invoiceStorage"));
    const errorMessage = "Une erreur s'est produite, vérifiez les informations manquantes sur votre facture et réessayez."

    if(invoiceNumber === "" || invoiceDate === "" || invoiceParty === "Sélectionner un client...") {
      return alert(errorMessage);
    }

    if(storedInvoices) {
      for (const invoice of storedInvoices) {
        console.log(invoice);
        if(Number(invoice.invoiceNumber) === Number(invoiceNumber)) {
          return alert("Le numéro de facture que vous avez choisi est déjà pris, choisissez-en un autre et réessayez.");
        }
      }
    }
    
    for (const item of items) {
      if (item.itemName === "") {
        return alert(errorMessage);
      }
    }

    const invoice = {
      invoiceId: storedInvoices.length + 1,
      invoiceNumber: Number(invoiceNumber),
      invoiceDate: invoiceDate,
      invoiceParty: invoiceParty,
      invoiceItems: items
    };

    storedInvoices.push(invoice);
    localStorage.setItem("invoiceStorage", JSON.stringify(storedInvoices));

    handleInvoicesUpdate("availableInvoices", storedInvoices);

    this.setState({
      showItemsContainer: false,
      items: [],
      selectedItems: new Set(),
      invoiceParty: "Sélectionner un client...",
      invoiceNumber: "",
      invoiceDate: ""
    });

    alert("Facture ajoutée avec succès.");
  }

  addClient = () => {
    const { clientName, clientEmail, clientPhone, clientAddress, availableClients } = this.state;
    const storedClients = JSON.parse(localStorage.getItem("clientStorage"));
    const addClientDialog = document.getElementById("addClientDialog");

    if(clientName === "" || clientEmail === "" || clientPhone === "" || clientAddress === "") {
      return alert("Une erreur s'est produite, assurez-vous de remplir toutes les informations demandées et réessayez.");
    }

    const client = {
      clientId: storedClients.length + 1,
      clientName: clientName,
      clientAddress: clientAddress,
      clientPhoneNumber: clientPhone,
      clientEmailAddress: clientEmail
    }

    const updatedClients = [...availableClients, client];
    localStorage.setItem("clientStorage", JSON.stringify(updatedClients));

    this.setState({
      availableClients: updatedClients,
      invoiceParty: clientName,
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      clientAddress: ""
    });

    addClientDialog.close();
  }

  render() {
    const allItemsSelected = this.state.items.length >= this.state.availableItems.length;
    const { availableClients, items, isButtonActive } = this.state;

    return (
      <div className="add-invoice-container">
        <div className="invoice-details-container">
          {/* invoice number input */}
          <div className="input-container">
            <label htmlFor="invoiceNumberInput" className="input-label">Numéro de facture</label>
            <input id="invoiceNumberInput" className="input-field mt-6" name="invoiceNumber" placeholder="01" value={this.state.invoiceNumber} onChange={this.handleChange} onBlur={this.validateInput} required />
          </div>

          {/* invoice date input */}
          <div className="input-container">
            <label htmlFor="invoiceDateInput" className="input-label">Date de facture</label>
            <input id="invoiceDateInput" className="input-field mt-6" name="invoiceDate" type="text" placeholder="DD/MM/YYYY" value={this.state.invoiceDate} onChange={this.handleChange} onBlur={this.validateInput} required />
          </div>

          {/* invoice party select */}
          <div className="input-container">
            <label htmlFor="invoicePartySelect" className="input-label">Facturé à</label>
            <select id="invoicePartySelect" className="input-select mt-6" name="invoiceParty" value={this.state.invoiceParty} onChange={this.handleChange} onBlur={this.validateInput} required>
              <option value={"Sélectionner un client..."} disabled>Sélectionner un client...</option>
              {availableClients.map((availableClient) => {
                return <option key={availableClient.clientId} value={availableClient.clientName}>{availableClient.clientName}</option>
              })}
              <option value={"+ Insérer un client"}>+ Insérer un client</option>
            </select>
          </div>

          {/* add item buttons */}
          <button id="addItemButton" className="secondary-button" onClick={this.addItem} disabled={allItemsSelected}>Insérer un article</button>

          {/* add invoice button */}
          <button id="insertInvoiceButton" className={`${isButtonActive ? "primary-button" : "primary-button disabled-button"}`} onClick={this.createInvoice} disabled={!items.length}>Établir la facture</button>
        </div>
        {/* ItemsContainer component */}
        {this.state.showItemsContainer && (<ItemList items={this.state.items} availableItems={this.state.availableItems} selectedItems={this.state.selectedItems} updateItem={this.updateItem} />)}
        {/* AddClient component */}
        <AddClient handleChange={this.handleChange} validateInput={this.validateInput} clientName={this.state.clientName} clientEmail={this.state.clientEmail} clientPhone={this.state.clientPhone} clientAddress={this.state.clientAddress} addClient={this.addClient} />
      </div>
    );
  }
}

export default AddInvoiceDetails;