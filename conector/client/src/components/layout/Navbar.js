import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li><Link to='/profiles'>Developers |</Link></li>
      <li><Link to='/dashboard'><i className='fas fa-user'></i>{' '}<span className='hide-sm'>Dashboard</span></Link></li>
      <li><Link to='/posts'><i className='fas fa-home'></i>{' '}<span className='hide-sm'>Posts</span></Link></li>
      <li><Link to='/blogs'><i className='fab fa-blogger-b'></i>{' '}<span className='hide-sm'>Blogs</span></Link></li>
      <li><Link to='/jobs'><i className='fas fa-ad'></i>{' '}<span className='hide-sm'>Jobs</span></Link></li>
      <li><Link to='/messenger'><i className="fab fa-facebook-messenger"></i>{' '}<span className='hide-sm'>Messenger</span></Link></li>
      <li><Link to='/vedio'><i className="fas fa-phone-square fa-2x"></i>{' '}<span className='hide-sm'>Vedio Call</span></Link></li>
      <li><Link to='/colaborate'><i className="fas fa-file-alt"></i>{' '}<span className='hide-sm'>Doccument</span></Link></li>
      <li><Link to='/codepen'><i className="fas fa-code"></i>{' '}<span className='hide-sm'>Codepen</span></Link></li>
      <li><Link onClick={logout} to='/'><i className='fas fa-sign-out-alt'></i>{' '}<span className='hide-sm'>Logout</span></Link></li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to='/profiles'>Developers</Link></li>
      <li><Link to='/register'>Register</Link></li>
      <li><Link to='/login'>Login</Link></li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'>
          <i className="fas fa-users"></i>Connector
        </Link>
      </h1>
      { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
    </nav>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
