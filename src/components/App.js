import React from "react";
import InvoiceList from "./InvoiceList";
import CreateInvoice from "./CreateInvoice";
import InvoiceDetails from "./InvoiceDetails";
import "../styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    // initializing state variables
    this.state = {
      availableInvoices: [],
      selectedInvoice: null,
      showInvoiceDetailsContainer: false,
    }

    // binding methods to the class instance
    this.handleInvoicesUpdate = this.handleInvoicesUpdate.bind(this);
    this.handleViewInvoice = this.handleViewInvoice.bind(this);
  }

  // lifecycle method that runs after the component is mounted
  componentDidMount() {
    // checking if client data is present in local storage
    if(!localStorage.getItem("clientStorage")) {
      // creating a list of clients if not present in local storage
      let clients = [
        {
          clientId: 1,
          clientName: "Solutions Éclatantes",
          clientAddress: "376 Oak St, Los Angeles, IL 40470",
          clientPhoneNumber: "0682453415",
          clientEmailAddress: "solutions.eclatantes@company.com"
        },
        {
          clientId: 2,
          clientName: "Technologie Evergreen",
          clientAddress: "572 Elm St, New York, CA 16311",
          clientPhoneNumber: "0673542944",
          clientEmailAddress: "technologie.evergreen@company.com"
        },
        {
          clientId: 3,
          clientName: "Gland & Chêne",
          clientAddress: "602 Oak St, New York, TX 66450",
          clientPhoneNumber: "0793452641",
          clientEmailAddress: "gland.chene@company.com"
        },
        {
          clientId: 4,
          clientName: "Rime & Raison",
          clientAddress: "908 Elm St, Chicago, TX 68765",
          clientPhoneNumber: "0893725461",
          clientEmailAddress: "rime.raison@company.com"
        },
        {
          clientId: 5,
          clientName: "Société Clarendon",
          clientAddress: "332 Maple St, Houston, IL 22649",
          clientPhoneNumber: "0972364258",
          clientEmailAddress: "societe.clarendon@company.com"
        },
        {
          clientId: 6,
          clientName: "Laboratoires Zéphyr",
          clientAddress: "268 Oak St, Houston, IL 53438",
          clientPhoneNumber: "0975342561",
          clientEmailAddress: "laboratoires.zephyr@company.com"
        },
        {
          clientId: 7,
          clientName: "Conseil Horizon",
          clientAddress: "878 Elm St, Chicago, NY 96126",
          clientPhoneNumber: "0573564215",
          clientEmailAddress: "conseil.horizon@company.com"
        },
        {
          clientId: 8,
          clientName: "Vue d'Horizon",
          clientAddress: "272 Main St, New York, TX 92115",
          clientPhoneNumber: "0673824605",
          clientEmailAddress: "vue.dhorizon@company.com"
        },
        {
          clientId: 9,
          clientName: "Floraison & Branche",
          clientAddress: "884 Maple St, Los Angeles, NY 47418",
          clientPhoneNumber: "0793415284",
          clientEmailAddress: "floraison.branche@company.com"
        },
        {
          clientId: 10,
          clientName: "Fonderie d'Étincelles",
          clientAddress: "588 Elm St, Los Angeles, IL 78006",
          clientPhoneNumber: "0863418245",
          clientEmailAddress: "fonderie.detincelles@company.com"
        }
      ];
      
      // saving client data to local storage
      localStorage.setItem("clientStorage", JSON.stringify(clients));
    }

    // checking if item data is present in local storage
    if(!localStorage.getItem("itemStorage")) {
      // creating a list of items if not present in local storage
      let items = [
        {
          itemId: 1,
          itemName: "Item 1",
          itemPrice: 69.57,
          itemDiscount: 10
        },
        {
          itemId: 2,
          itemName: "Item 2",
          itemPrice: 83.07,
          itemDiscount: 5.75
        },
        {
          itemId: 3,
          itemName: "Item 3",
          itemPrice: 91.96,
          itemDiscount: 2.5
        },
        {
          itemId: 4,
          itemName: "Item 4",
          itemPrice: 66.21,
          itemDiscount: 12.55
        },
        {
          itemId: 5,
          itemName: "Item 5",
          itemPrice: 57.87,
          itemDiscount: 20
        },
        {
          itemId: 6,
          itemName: "Item 6",
          itemPrice: 42.44,
          itemDiscount: 7.5
        },
        {
          itemId: 7,
          itemName: "Item 7",
          itemPrice: 84.41,
          itemDiscount: 9.75
        },
        {
          itemId: 8,
          itemName: "Item 8",
          itemPrice: 83.88,
          itemDiscount: 12.5
        },
        {
          itemId: 9,
          itemName: "Item 9",
          itemPrice: 1.6,
          itemDiscount: 0.5
        },
        {
          itemId: 10,
          itemName: "Item 10",
          itemPrice: 98.91,
          itemDiscount: 55.5
        }
      ]

      // saving item data to local storage
      localStorage.setItem("itemStorage", JSON.stringify(items));
    }

    // checking if invoice data is present in local storage
    if(!localStorage.getItem("invoiceStorage")) {
      // creating an empty list of invoices if not present in local storage
      const invoices = [];
      this.setState({ availableInvoices: invoices });
      localStorage.setItem("invoiceStorage", JSON.stringify(invoices));
    }

    // if invoice data is present in local storage, load it into state
    else {
      const storedInvoices = localStorage.getItem("invoiceStorage");
      this.setState({ availableInvoices: JSON.parse(storedInvoices) });
    }
  }

  // method to handle updating invoices in state
  handleInvoicesUpdate = (name, value) => {
    this.setState({ [name]: value });
  };

  // method to handle viewing a selected invoice
  handleViewInvoice = (invoice) => {
    this.setState({
      selectedInvoice: invoice,
      showInvoiceDetailsContainer: true
    });
  };
  
  render() {
    const { availableInvoices, selectedInvoice, showInvoiceDetailsContainer } = this.state;

    return (
      // main container with create invoice, invoice list, and invoice details components
      <main id="mainContainer" className="main-container">
        <CreateInvoice availableInvoices={availableInvoices} handleInvoicesUpdate={this.handleInvoicesUpdate} />
        <InvoiceList availableInvoices={availableInvoices} onViewInvoice={this.handleViewInvoice} />
        {showInvoiceDetailsContainer && (<InvoiceDetails invoice={selectedInvoice} />)}
      </main>
    );
  }
}

export default App;