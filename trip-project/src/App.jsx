import { useState } from "react";

//// crud ==> create , read , update , delete

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((cur) => cur.filter((item) => item.id !== id));
  }

  function handleToggleItems(id) {
    setItems((cur) =>
      cur.map((ele) => (ele.id === id ? { ...ele, packed: !ele.packed } : ele)),
    );
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🥰 trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((ele) => (
          <Item
            ele={ele}
            key={ele.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ ele, onDeleteItem, onToggleItem }) {
  /////// derived state
  // const [packed , setPacked] = useState(false)
  return (
    <li>
      <input
        type="checkbox"
        value={ele.packed}
        onChange={() => onToggleItem(ele.id)}
      />
      <span style={ele.packed ? { textDecoration: "line-through" } : {}}>
        {ele.quantity} {ele.description}
      </span>
      <button
        onClick={function () {
          return onDeleteItem(ele.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((ele) => ele.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items to your Packing list 🚀</em>
      </footer>
    );
  }

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "you got everything ! Ready to go 🛩️"
          : `  💼 You have ${numItems} items on your list , and you already packed
        ${numPacked} (${percentage}%) `}
      </em>
    </footer>
  );
}
