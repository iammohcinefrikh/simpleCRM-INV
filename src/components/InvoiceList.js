import React from "react";

class InvoiceList extends React.Component {
  calculateTotalItemTotalHT = (invoiceItems) => {
    let total = 0;
    invoiceItems.forEach(item => {
      total += parseFloat(item.itemTotal);
    });
    return total;
  }

  render() {
    const { availableInvoices } = this.props;

    return (
      <div className="invoice-list-container">
        <table className="invoice-list-table">
          <thead>
            <tr>
              <th>Numéro de facture</th>
              <th>Client</th>
              <th>Montant HT</th>
              <th>TVA</th>
              <th>Montant TTC</th>
              <th>Détails</th>
            </tr>
          </thead>
          <tbody>
            {availableInvoices.map((invoice, index) => {
              return <tr key={index}>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.invoiceParty}</td>
                <td>{this.calculateTotalItemTotalHT(invoice.invoiceItems)}</td>
                <td>20%</td>
                <td>Luctus sollicitudin</td>
                <td>Aenean vitae</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default InvoiceList;