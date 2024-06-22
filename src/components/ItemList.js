import React from "react";
import Item from "./Item";

class ItemList extends React.Component {
  render() {
    const { items, updateItem, availableItems, selectedItems } = this.props;

    return (
      <div className="item-container">
        <div className="item-container-header">
          <p>Article</p>
          <p>Quantité</p>
          <p>Prix unitaire (DH)</p>
          <p>Remise (%)</p>
          <p>Montant (DH)</p>
        </div>
        {items.map((item, index) => (
          <Item key={index} index={index} item={item} items={items} availableItems={availableItems} selectedItems={selectedItems} updateItem={updateItem} />
        ))}
      </div>
    );
  }
}

export default ItemList;