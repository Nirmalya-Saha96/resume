import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Item = ({ profile: {
  user: { _id, name, avatar },
  status,
  company,
  location,
  skills,
  }
    }) => {
      return (
        <div className='profile nirmalya-table'>
          <img src={avatar} alt='avatar' className='round-img' />
          <div>
            <h2>{name}</h2>
            <p>{status} {company && <span> at {company}</span>}</p>
            <p className='my-1'>{location && <span>{location}</span>}</p>
            <Link to={`/profile/${_id}`} className='btn btn-primary'>View Profile</Link>
          </div>
          <ul>
            {skills.map((skill, index) => (
              <li key={index} className=' scolor'>
                <i className='fas fa-angle-right'></i>{' '}{skill}
              </li>
            ))}
          </ul>
        </div>
      );
    }

Item.propTypes = {

}

export default Item;
