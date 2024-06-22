import React from "react";
import AddInvoiceDetails from "./AddInvoiceDetails";
import ItemList from "./ItemList";
import InvoiceDetails from "./InvoiceDetails";

class CreateInvoice extends React.Component {
  constructor(props) {
    super(props);
    // initializing state variables
    this.state = {
      items: [],
      selectedItems: new Set(),
      availableItems: [],
      availableClients: [],
      showItemsContainer: false
    }

    // binding methods to the class instance
    this.updateState = this.updateState.bind(this);
  }

  // lifecycle method that runs after the component is mounted
  componentDidMount() {
    // retrieving stored items from local storage
    const storedItems = localStorage.getItem("itemStorage");
    // retrieving stored clients from local storage
    const storedClients = localStorage.getItem("clientStorage");

    // setting available items in state if stored items exist
    if(storedItems) {
      this.setState({ availableItems: JSON.parse(storedItems) });
    }

    // setting available clients in state if stored clients exist
    if(storedClients) {
      this.setState({ availableClients: JSON.parse(storedClients) });
    }
  }

  // method to update an item based on its index and new updates
  updateItem = (index, updates) => {
    const updatedItems = this.state.items.map((item, i) =>
      i === index ? { ...item, ...updates } : item
    );
    this.setState({ items: updatedItems }, () => {
      this.updateSelectedItems();
    });
  };

  // method to update the set of selected items
  updateSelectedItems = () => {
    const selectedItems = new Set();
    this.state.items.forEach((item) => {
      if (item.itemName !== "") {
        selectedItems.add(item.itemName);
      }
    });
    this.setState({ selectedItems });
  };

  // method to update the state with new values
  updateState = (newState) => {
    this.setState((prevState) => ({
      ...prevState,
      ...newState
    }));
  };

  render() {
    const { availableInvoices, handleInvoicesUpdate } = this.props;
    const { items, availableItems, availableClients, selectedItems } = this.state;

    return (
      // container for adding invoice details and item list
      <div className="add-invoice-container">
        <AddInvoiceDetails availableInvoices={availableInvoices} handleInvoicesUpdate={handleInvoicesUpdate} items={items} availableItems={availableItems} availableClients={availableClients} updateState={this.updateState} />
        
        {this.state.showItemsContainer && (<ItemList items={items} availableItems={availableItems} selectedItems={selectedItems} updateItem={this.updateItem} />)}
      </div>
    )
  }
}

export default CreateInvoice;