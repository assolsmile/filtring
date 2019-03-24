import React from 'react';
import {Media} from "reactstrap";

const Listing = ({title, addressToDisplay, pictureUrl, productType, features, commercializationType}) => {

  return (
    <Media>
      <Media left top href="#">
        <Media object src={pictureUrl} alt="Generic placeholder image"/>
      </Media>
      <Media body>
        <Media heading>
          {title}
        </Media>
        <p><span>ProductType:</span>{productType}</p>
        <p><span>Address:</span> {addressToDisplay}</p>
        <p><span>Features:</span> {features.join(", ")}</p>
        <p><span>Type: </span>{commercializationType}</p>
      </Media>
    </Media>
  )
};

export default Listing;
