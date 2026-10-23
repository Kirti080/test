
import { useState, useEffect } from 'react';

function retry() {

  const [name, setName] = useState("");

  const [list, setList] = useState(() => {
    const savedList = localStorage.getItem("myList");
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(list));
  }, [list]);


  const handleAdd = () => {
    if (name.trim() === "") return;

    setList([...list, name.trim()]);
    setName("");
  };

  const handleDelete = (indexToDelete) => {
    setList(list.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="div-container">
      <h1>List of Students</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button className="btn" onClick={handleAdd}>
        Add
      </button>

      <h2 className="list-header">Students</h2>

      <ul className="data-card">
        {list.map((item, index) => (
          <li key={index}>
            {item}
            <button
              className="btn"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default retry;
