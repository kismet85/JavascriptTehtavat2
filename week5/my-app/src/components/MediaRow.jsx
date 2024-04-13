/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
/* eslint-enable no-unused-vars */

const MediaRow = ({ item, setSelectedItem }) => {
  const handleItemClick = () => {
    setSelectedItem(item);
  };

  return (
    <tr key={item.media_id}>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <button onClick={handleItemClick}>View</button>
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  item: PropTypes.shape({
    media_id: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    filesize: PropTypes.number.isRequired,
    media_type: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default MediaRow;
