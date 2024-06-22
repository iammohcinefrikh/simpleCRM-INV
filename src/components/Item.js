import React from "react";

class Item extends React.Component {
  // handler for item selection change
  handleSelectChange = (event) => {
    const { index, updateItem } = this.props;
    const { items, availableItems } = this.props;
    const itemName = event.target.value;
  
    // find the selected item from available items
    const selectedItem = availableItems.find(item => item.itemName === itemName);
    if (selectedItem) {
      const itemQuantity = items[index].itemQuantity || 1;
      // calculate total price considering item discount
      const itemTotal = (selectedItem.itemPrice * itemQuantity) * (1 - selectedItem.itemDiscount / 100);

      // prepare updates object
      const updates = {
        itemId: selectedItem.itemId,
        itemName: itemName,
        itemPrice: selectedItem.itemPrice,
        itemDiscount: selectedItem.itemDiscount,
        itemTotal: itemTotal.toFixed(2),
        itemQuantity: itemQuantity,
      };

      // update the item in the parent component
      updateItem(index, updates);
    }
  };

  // handler for item quantity change
  handleQuantityChange = (event) => {
    const { index, updateItem } = this.props;
    const { item } = this.props;
    const itemQuantity = event.target.value;
    const itemName = item.itemName;
    const itemTotal = (item.itemPrice * itemQuantity) * (1 - item.itemDiscount / 100);

    // handle cases where quantity is invalid or zero
    if(itemQuantity === "" || itemQuantity === "0" || isNaN(itemQuantity)) {
      console.log("exception triggered");
      const updates = {
        itemQuantity: "1",
        itemTotal: (item.itemPrice * 1) * (1 - item.itemDiscount / 100).toFixed(2)
      };

      return updateItem(index, updates);
    }

    // handle cases where item name is not selected
    if(!itemName) {
      const updates = {
        itemQuantity: itemQuantity
      };

      updateItem(index, updates);
    }

    // handle normal case where quantity and total are updated
    else {
      const updates = {
        itemQuantity: itemQuantity,
        itemTotal: itemTotal.toFixed(2)
      };

      updateItem(index, updates);
    }
  };

  render() {
    const { item, index, availableItems, selectedItems } = this.props;

    return (
      <div className="item">
        {/* dropdown to select item */}
        <select id={`itemName-${index}`} className="input-select mt-6" name="itemName" value={item.itemName} onChange={this.handleSelectChange}>
          <option value="" disabled>Sélectionner un article...</option>
          {/* map available items to options */}
          {availableItems.map((availableItem) => (
            <option key={availableItem.itemId} value={availableItem.itemName} disabled={selectedItems.has(availableItem.itemName)}>{availableItem.itemName}</option>
          ))}
        </select>

        {/* input for item quantity */}
        <input id={`itemQuantity-${index}`} className="input-field mt-6" name="itemQuantity" type="text" value={item.itemQuantity} onChange={this.handleQuantityChange} required />

        {/* input for item price */}
        <input id={`itemPrice-${index}`} className="input-field mt-6" name="itemPrice" type="text" value={item.itemPrice} disabled required />

        {/* input for item discount */}
        <input id={`itemDiscount-${index}`} className="input-field mt-6" name="itemDiscount" type="text" value={item.itemDiscount} disabled required />

        {/* input for item total */}
        <input id={`itemTotal-${index}`} className="input-field mt-6" name="itemTotal" type="text" value={item.itemTotal} disabled required />
      </div>
    );
  }
}

export default Item;