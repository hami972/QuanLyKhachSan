import React, { useState } from 'react';

const AddItemForm = ({ addNewItem }) => {
    const [items, setItems] = useState([{ facility: '', quantity: '' }]);

    const handleAddItem = () => {
        setItems([...items, { facility: '', quantity: '' }]);
    };

    const handleChange = (index, key, value) => {
        const newItems = [...items];
        newItems[index][key] = value;
        setItems(newItems);
    };

    const handleRemoveItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNewItem(items);
        setItems([{ facility: '', quantity: '' }]);
    };

    return (
        <form onSubmit={handleSubmit}>
            {items.map((item, index) => (
                <div key={index}>
                    <select
                        value={item.facility}
                        onChange={(e) => handleChange(index, 'facility', e.target.value)}
                    >
                        <option value="">-- Select Facility --</option>
                        {/* Option items here */}
                    </select>
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                    />
                    <button type="button" onClick={() => handleRemoveItem(index)}>X</button>
                </div>
            ))}
            <button type="button" onClick={handleAddItem}>Add</button>
            <button type="submit">Submit</button>
        </form>
    );
};

const YourComponent = () => {
    const addNewItem = (items) => {
        // Handle adding items to your data structure or perform any action here
        console.log(items);
    };

    return (
        <div>
            <h2>Add New Items</h2>
            <AddItemForm addNewItem={addNewItem} />
        </div>
    );
};

export default YourComponent;