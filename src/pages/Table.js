import React from 'react';
import Row from './Row.js';
import './Table.css';

const Table = (props) => {
  const { files, onDelete, onViewJson, onDownload, userGroup} = props;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Size (in Bytes)</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <Row key={file.Key} file={file} onDelete={onDelete} onViewJson={onViewJson} onDownload={onDownload} userGroup={userGroup}/>
        ))}
      </tbody>
    </table>
  );
};

export default Table;