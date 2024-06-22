import React from "react";

class InvoiceDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  // function to calculate total item total excluding tax (HT)
  calculateTotalItemTotalHT = (invoiceItems) => {
    let total = 0;
    invoiceItems.forEach(item => {
      total += parseFloat(item.itemTotal);
    });
    return total.toFixed(2);
  }

  render() {
    const { invoice } = this.props;
    
    // return null if invoice is not available
    if (!invoice) return null;

    return (
      <div className="invoice-details-container">
        {/* table to display invoice details */}
        <table>
          <thead>
            <tr>
              <th>Article</th>
              <th>Quantité</th>
              <th>Prix unitaire (DH)</th>
              <th>Remise (%)</th>
              <th>Montant TTC (DH)</th>
            </tr>
          </thead>
          <tbody>
            {/* map through invoice items to display each row */}
            {invoice.invoiceItems.map((item, index) => (
              <tr key={index}>
                <td>{item.itemName}</td>
                <td>{item.itemQuantity}</td>
                <td>{item.itemPrice}</td>
                <td>{item.itemDiscount}</td>
                <td>{item.itemTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* container for displaying total HT */}
        <div className="invoice-details-total-container">
          <div className="invoice-details-total-header">
            <p>Total HT (DH)</p>
          </div>
          <div className="invoice-details-total-value">
            {/* display calculated total HT */}
            <p>{this.calculateTotalItemTotalHT(invoice.invoiceItems)}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default InvoiceDetails;