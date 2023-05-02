import React from 'react';
import './Row.css';

const Row = (props) => {
  const { file, onDelete, onViewJson, onDownload, userGroup } = props;
  const { name, size, createdAt } = file;
  let file_name = name.split('.')[0]

  const handleDelete = () => {
    onDelete(file_name);
  };

  const handleViewJson = () => {
    onViewJson(file_name);
  };

  const handleDownload = () => {
    onDownload(file_name)
  }

  return (
    <tr>
      <td>{file_name}</td>
      <td>{size}</td>
      <td>{createdAt}</td>
      <td>
      <button className="download-button" onClick={handleDownload}>
          Download CSV
        </button>
        <button className="view-button" onClick={handleViewJson}>
          View as JSON
        </button>
        { userGroup == 'Admins' &&
        <button className="delete-button" onClick={handleDelete}>
          Delete File
        </button>
        }
      </td>
    </tr>
  );
};

export default Row;