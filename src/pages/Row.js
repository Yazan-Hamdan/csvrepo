import React from 'react';
import './Row.css';

const Row = (props) => {
  const { file, onDelete, onViewJson } = props;
  const { name, size, createdAt } = file;

  const handleDelete = () => {
    onDelete(name);
  };

  const handleViewJson = () => {
    onViewJson(file.Key);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{size}</td>
      <td>{createdAt}</td>
      <td>
        <button className="delete-button" onClick={handleDelete}>
          Delete File
        </button>
        <button className="view-button" onClick={handleViewJson}>
          View as JSON
        </button>
      </td>
    </tr>
  );
};

export default Row;