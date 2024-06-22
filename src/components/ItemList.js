import React from "react";
import Item from "./Item";

class ItemList extends React.Component {
  render() {
    const { items, updateItem, availableItems, selectedItems } = this.props;

    return (
      <div className="item-container">
        {/* header row for the item list */}
        <div className="item-container-header">
          <p>Article</p>
          <p>Quantité</p>
          <p>Prix unitaire (DH)</p>
          <p>Remise (%)</p>
          <p>Montant (DH)</p>
        </div>
        {/* mapping through items and rendering each Item component */}
        {items.map((item, index) => (
          <Item 
            key={index} 
            index={index} 
            item={item} 
            items={items} 
            availableItems={availableItems} 
            selectedItems={selectedItems} 
            updateItem={updateItem} 
          />
        ))}
      </div>
    );
  }
}

export default ItemList;