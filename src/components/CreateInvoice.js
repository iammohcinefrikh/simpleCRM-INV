import React from "react";
import AddInvoiceDetails from "./AddInvoiceDetails";
import ItemList from "./ItemList";

class CreateInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectedItems: new Set(),
      availableItems: [],
      availableClients: [],
      showItemsContainer: false
    }

    this.updateState = this.updateState.bind(this);
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
      <div className="add-invoice-container">
        <AddInvoiceDetails availableInvoices={availableInvoices} handleInvoicesUpdate={handleInvoicesUpdate} items={items} availableItems={availableItems} availableClients={availableClients} updateState={this.updateState} />
        {this.state.showItemsContainer && (<ItemList items={items} availableItems={availableItems} selectedItems={selectedItems} updateItem={this.updateItem} />)}
      </div>
    )
  }
}

export default CreateInvoice;