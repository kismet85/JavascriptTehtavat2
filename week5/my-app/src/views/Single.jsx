/* eslint-disable no-unused-vars */
import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
/* eslint-enable no-unused-vars */

const Single = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const item = state?.item;

  

  if (!item) return null;

  return (
    <div>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      {item.media_type === "image" ? (
        <img src={item.filename} alt={item.title} />
      ) : (
        <video controls>
          <source src={item.filename} type="video/mp4" />
        </video>
      )}
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

Single.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    media_type: PropTypes.oneOf(["image", "video"]).isRequired,
  }),
};

export default Single;
