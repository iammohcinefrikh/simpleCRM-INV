import React from "react";

class InvoiceList extends React.Component {
  // function to calculate the total of item totals excluding tax (HT)
  calculateTotalItemTotalHT = (invoiceItems) => {
    let total = 0;
    invoiceItems.forEach(item => {
      total += parseFloat(item.itemTotal);
    });
    return total.toFixed(2);
  }

  // function to calculate the total of item totals including tax (TTC)
  calculateTotalItemTotalTTC = (invoiceItems) => {
    let totalHT = parseFloat(this.calculateTotalItemTotalHT(invoiceItems));
    let total = totalHT + (totalHT * 0.2); // Assuming 20% tax rate

    return total.toFixed(2);
  }

  render() {
    const { availableInvoices, onViewInvoice } = this.props;

    return (
      <div className="invoice-list-container">
        {/* table to display list of invoices */}
        <table>
          <thead>
            <tr>
              <th>Numéro de facture</th>
              <th>Client</th>
              <th>Montant HT (DH)</th>
              <th>TVA (%)</th>
              <th>Montant TTC (DH)</th>
              <th>Détails</th>
            </tr>
          </thead>
          <tbody>
            {availableInvoices.map((invoice, index) => {
              return (
                <tr key={index}>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.invoiceParty}</td>
                  <td>{this.calculateTotalItemTotalHT(invoice.invoiceItems)}</td>
                  <td>20</td> {/* assuming a fixed tax rate of 20% */}
                  <td>{this.calculateTotalItemTotalTTC(invoice.invoiceItems)}</td>
                  <td><button onClick={() => onViewInvoice(invoice)}>Voir</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default InvoiceList;