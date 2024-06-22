import React from "react";

class Item extends React.Component {
  handleSelectChange = (event) => {
    const { index, updateItem } = this.props;
    const { items, availableItems } = this.props;
    const itemName = event.target.value;
  
    const selectedItem = availableItems.find(item => item.itemName === itemName);
    if (selectedItem) {
      const itemQuantity = items[index].itemQuantity || 1;
      const itemTotal = (selectedItem.itemPrice * itemQuantity) * (1 - selectedItem.itemDiscount / 100);

      const updates = {
        itemId: selectedItem.itemId,
        itemName: itemName,
        itemPrice: selectedItem.itemPrice,
        itemDiscount: selectedItem.itemDiscount,
        itemTotal: itemTotal.toFixed(2),
        itemQuantity: itemQuantity,
      };

      updateItem(index, updates);
    }
  };

  handleQuantityChange = (event) => {
    const { index, updateItem } = this.props;
    const { item } = this.props;
    const itemQuantity = event.target.value;
    const itemTotal = (item.itemPrice * itemQuantity) * (1 - item.itemDiscount / 100);

    if(itemQuantity === "" || itemQuantity === "0" || isNaN(itemQuantity)) {
      const updates = {
        itemQuantity: "1",
        itemTotal: (item.itemPrice * 1) * (1 - item.itemDiscount / 100).toFixed(2)
      }

      return updateItem(index, updates);
    }

    const updates = {
      itemQuantity: itemQuantity,
      itemTotal: itemTotal.toFixed(2)
    }

    updateItem(index, updates);
  };

  render() {
    const { item, index, availableItems, selectedItems } = this.props;

    return (
      <div className="item">
        <select id={`itemName-${index}`} className="input-select mt-6" name="itemName" value={item.itemName} onChange={this.handleSelectChange}>
          <option value="" disabled>Sélectionner un article...</option>
          {availableItems.map((availableItem) => (
            <option key={availableItem.itemId} value={availableItem.itemName} disabled={selectedItems.has(availableItem.itemName)}>{availableItem.itemName}</option>
          ))}
        </select>

        <input id={`itemQuantity-${index}`} className="input-field mt-6" name="itemQuantity" type="text" value={item.itemQuantity} onChange={this.handleQuantityChange} required />

        <input id={`itemPrice-${index}`} className="input-field mt-6" name="itemPrice" type="text" value={item.itemPrice} disabled required />

        <input id={`itemDiscount-${index}`} className="input-field mt-6" name="itemDiscount" type="text" value={item.itemDiscount} disabled required />

        <input id={`itemTotal-${index}`} className="input-field mt-6" name="itemTotal" type="text" value={item.itemTotal} disabled required />
      </div>
    );
  }
}

export default Item;