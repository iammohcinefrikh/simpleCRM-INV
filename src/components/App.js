import React from "react";
import AddInvoiceDetails from "./AddInvoiceDetails";
import InvoiceList from "./InvoiceList";
import "../styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableInvoices: []
    }

    this.handleInvoicesUpdate = this.handleInvoicesUpdate.bind(this);
  }

  componentDidMount() {
    if(!localStorage.getItem("clientStorage")) {
      let clients = [
        {
          clientId: 1,
          clientName: "Solutions Éclatantes",
          clientAddress: "376 Oak St, Los Angeles, IL 40470",
          clientPhoneNumber: "(692) 611-9821",
          clientEmailAddress: "solutions.eclatantes@company.com"
        },
        {
          clientId: 2,
          clientName: "Technologie Evergreen",
          clientAddress: "572 Elm St, New York, CA 16311",
          clientPhoneNumber: "(212) 459-1535",
          clientEmailAddress: "technologie.evergreen@company.com"
        },
        {
          clientId: 3,
          clientName: "Gland & Chêne",
          clientAddress: "602 Oak St, New York, TX 66450",
          clientPhoneNumber: "(606) 161-5580",
          clientEmailAddress: "gland.chene@company.com"
        },
        {
          clientId: 4,
          clientName: "Rime & Raison",
          clientAddress: "908 Elm St, Chicago, TX 68765",
          clientPhoneNumber: "(829) 753-4252",
          clientEmailAddress: "rime.raison@company.com"
        },
        {
          clientId: 5,
          clientName: "Société Clarendon",
          clientAddress: "332 Maple St, Houston, IL 22649",
          clientPhoneNumber: "(882) 881-3048",
          clientEmailAddress: "societe.clarendon@company.com"
        },
        {
          clientId: 6,
          clientName: "Laboratoires Zéphyr",
          clientAddress: "268 Oak St, Houston, IL 53438",
          clientPhoneNumber: "(123) 448-4785",
          clientEmailAddress: "laboratoires.zephyr@company.com"
        },
        {
          clientId: 7,
          clientName: "Conseil Horizon",
          clientAddress: "878 Elm St, Chicago, NY 96126",
          clientPhoneNumber: "(619) 659-1208",
          clientEmailAddress: "conseil.horizon@company.com"
        },
        {
          clientId: 8,
          clientName: "Vue d'Horizon",
          clientAddress: "272 Main St, New York, TX 92115",
          clientPhoneNumber: "(414) 394-6779",
          clientEmailAddress: "vue.dhorizon@company.com"
        },
        {
          clientId: 9,
          clientName: "Floraison & Branche",
          clientAddress: "884 Maple St, Los Angeles, NY 47418",
          clientPhoneNumber: "(128) 764-5250",
          clientEmailAddress: "floraison.branche@company.com"
        },
        {
          clientId: 10,
          clientName: "Fonderie d'Étincelles",
          clientAddress: "588 Elm St, Los Angeles, IL 78006",
          clientPhoneNumber: "(740) 380-7499",
          clientEmailAddress: "fonderie.detincelles@company.com"
        }
      ];
      
      localStorage.setItem("clientStorage", JSON.stringify(clients));
    }

    if(!localStorage.getItem("itemStorage")) {
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

      localStorage.setItem("itemStorage", JSON.stringify(items));
    }

    if(!localStorage.getItem("invoiceStorage")) {
      const invoices = [];
      this.setState({ availableInvoices: invoices });
      localStorage.setItem("invoiceStorage", JSON.stringify(invoices));
    }

    else {
      const storedInvoices = localStorage.getItem("invoiceStorage");
      this.setState({ availableInvoices: JSON.parse(storedInvoices) });
    }
  }

  handleInvoicesUpdate = (name, value) => {
    this.setState({ [name]: value });
  };
  
  render() {
    return (
      <main id="mainContainer" className="main-container">
        <AddInvoiceDetails availableInvoices={this.state.availableInvoices} handleInvoicesUpdate={this.handleInvoicesUpdate} />
        <InvoiceList availableInvoices={this.state.availableInvoices} />
      </main>
    );
  }
}

export default App;