import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserMd, 
  faPhone, 
  faCalendarCheck,
  faSearch,
  faPlus,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const DoctorsTable = () => {
  // State for doctors data
  const [doctors, setDoctors] = useState([]);
  
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    email: '',
    speciality: '',
    contactNumber: ''
  });
  
  // State for modal visibility
  const [showModal, setShowModal] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new doctor to the list
    setDoctors([...doctors, formData]);
    // Reset form
    setFormData({
      name: '',
      regNo: '',
      email: '',
      speciality: '',
      contactNumber: ''
    });
    // Close modal
    setShowModal(false);
  };
  
  return (
    <div className="container-fluid p-4">
      <div className="row mb-4">
        <div className="col-6">
          <h2 className="mb-0">
            <FontAwesomeIcon icon={faUserMd} className="me-2 text-primary" />
            Medinexus Doctors
          </h2>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <div className="me-3">
            <div className="input-group">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                Filter by
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Speciality</a></li>
                <li><a className="dropdown-item" href="#">Name</a></li>
                <li><a className="dropdown-item" href="#">Registration No.</a></li>
              </ul>
            </div>
          </div>
          <div className="me-3">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search" />
              <button className="btn btn-outline-secondary" type="button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
          <button 
            className="btn btn-primary" 
            onClick={() => setShowModal(true)}
          >
            <FontAwesomeIcon icon={faPlus} className="me-1" />
            Add Doctor
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Registered No.</th>
                  <th>Email Address</th>
                  <th>Speciality</th>
                  <th>Contact Number</th>
                  <th>Channelling</th>
                </tr>
              </thead>
              <tbody>
                {doctors.length > 0 ? (
                  doctors.map((doctor, index) => (
                    <tr key={index}>
                      <td>{doctor.name}</td>
                      <td>{doctor.regNo}</td>
                      <td>{doctor.email}</td>
                      <td>{doctor.speciality}</td>
                      <td>
                        <FontAwesomeIcon icon={faPhone} className="me-2 text-primary" />
                        {doctor.contactNumber}
                      </td>
                      <td className="text-center">
                        <button className="btn btn-outline-primary btn-sm">
                          <FontAwesomeIcon icon={faCalendarCheck} className="me-1" />
                          Channel
                        </button>
                        <button className="btn btn-link btn-sm ms-1 text-secondary">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No doctors added yet. Click "Add Doctor" to add new entries.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Doctor Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Doctor</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="regNo" className="form-label">Registration Number</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="regNo" 
                      name="regNo"
                      value={formData.regNo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="speciality" className="form-label">Speciality</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="speciality" 
                      name="speciality"
                      value={formData.speciality}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="contactNumber" 
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsTable;