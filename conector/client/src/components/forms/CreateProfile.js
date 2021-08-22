import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';


const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    bio: '',
    status: '',
    githubusername: '',
    skills: '',
    youtube: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    vedioid: '',
    colaborateid: '',
    chatid: ''
  });

  const [socialInputs, setSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    linkedin,
    instagram,
    vedioid,
    colaborateid,
    chatid
  } = formData;

  const onChange = e  => setFormData({ ...formData, [e.target.name] : e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  }

  return (
    <Fragment>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <p className="lead">
        <i className="fas fa-info"></i> Please fill all your info to standout from others
      </p>
      <hr />
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="HR">HR</option>
            <option value="Bussiness">Bussiness</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)}/>
          <small className="form-text"
            >Could be your own company or one you work for or school/college your are studing at</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)}/>
          <small className="form-text"
            >Personal portfolio website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)}/>
          <small className="form-text"
            >Please enter the current location of yours</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)}/>
          <small className="form-text"
            >Please use comma separated values (eg.
            MERN-Stack,Android development,HTML,CSS,etc)</small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={e => onChange(e)}
          />
          <small className="form-text"
            >Please enter your github user name so that everybody can see it</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
          <small className="form-text">Tell me about your self</small>
        </div>

        <div className="my-2">
          <button onClick={() => setSocialInputs(!socialInputs)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {socialInputs && <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input type="text" placeholder="Twitter URL" name="twitter"  value={twitter} onChange={e => onChange(e)}/>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)}/>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)}/>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)}/>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)}/>
            </div>

            <div className="form-group social-input">
              <i className="fas fa-phone-square fa-2x"></i>
              <input type="text" placeholder="Vedio id" name="vedioid" value={vedioid} onChange={e => onChange(e)}/>
            </div>

            <div className="form-group social-input">
              <i className="far fa-comments fa-2x"></i>
              <input type="text" placeholder="Phone Number" name="chatid" value={chatid} onChange={e => onChange(e)}/>
            </div>

            <div className="form-group social-input">
              <i className="far fa-file fa-2x"></i>
              <input type="text" placeholder="Colaborate id" name="colaborateid" value={colaborateid} onChange={e => onChange(e)}/>
            </div>
          </Fragment>
        }

        <small>* = required field</small>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboardl">Back</Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
}


export default connect(null, { createProfile})(withRouter(CreateProfile));
