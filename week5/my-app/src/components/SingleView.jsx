/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
/* eslint-enable no-unused-vars */

const SingleView = ({ item, setSelectedItem }) => {
    if (!item) return null;
  
    return (
      <dialog open={true}>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        {item.media_type === 'image' ? (
          <img src={item.filename} alt={item.title} /> 
        ) : (
          <video controls>
            <source src={item.filename} type="video/mp4" />
          </video>
        )}
        <button onClick={() => setSelectedItem(null)}>Close</button>
      </dialog>
    );
  };
  

SingleView.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    media_type: PropTypes.oneOf(['image', 'video']).isRequired
  }),
  setSelectedItem: PropTypes.func.isRequired
};

export default SingleView;
