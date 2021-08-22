import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import { getProfiles} from '../../actions/profile';
import Item from './Items';
import SearchBox from '../layout/SearchBox';


const Profiles = ({ getProfiles, profile: { profiles, loading }}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [c, setC] = useState('');

  const onSearchChange = e => {
    setC(e.target.value);
  }

  return loading ? ( <Loader /> ) :
    (<Fragment>
        <h1 className='large text-primary'>Connections</h1>
        <p className='lead'>
          <i className='fab fa-connectdevelop'></i> Connect with developers/HRs
        </p>

        <div className='profiles'>
        <SearchBox searchChange={ onSearchChange}/>
          {profiles.length > 0 ? (
            profiles = profiles.filter(profile => (
               profile.user.name.toLowerCase().includes(c.toLowerCase())
            )),


            profiles.map(profile => (
              <Item key={profile._id} profile={profile} />
            ))
          ) : ( <h4> No connections found</h4> )}
        </div>
      </Fragment>

  );
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
