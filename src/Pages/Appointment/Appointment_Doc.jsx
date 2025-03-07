import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function HealthcareAppointmentSystem() {
  // State management
  const [practitioners, setPractitioners] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedPractitioner, setSelectedPractitioner] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [medicalIssue, setMedicalIssue] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  // Add a new state to track active tab
  const [activeTab, setActiveTab] = useState('book');
  // Add state for editing appointments
  const [editingAppointment, setEditingAppointment] = useState(null);
  // Add search functionality
  const [searchTerm, setSearchTerm] = useState('');
  // Add filter by practitioner type
  const [practitionerTypeFilter, setPractitionerTypeFilter] = useState('all');

  // Mock data for healthcare practitioners
  useEffect(() => {
    // This would normally be an API call
    const mockPractitioners = [
      // Doctors
      { id: 1, name: 'Dr. Waruna Hashan', type: 'doctor', specialty: 'Cardiology' },
      { id: 2, name: 'Dr. Rasal Dassanayaka', type: 'doctor', specialty: 'Pediatrics' },
      { id: 3, name: 'Dr. Pasindu Waidayarathna', type: 'doctor', specialty: 'Neurology' },
      { id: 4, name: 'Dr. Harshana Rathnayaka', type: 'doctor', specialty: 'Orthopedics' },
      { id: 5, name: 'Dr. Lakindu Sirimewan', type: 'doctor', specialty: 'Dermatology' },
      // Nurses
      { id: 6, name: 'Nurse Kumari Perera', type: 'nurse', specialty: 'General Care' },
      { id: 7, name: 'Nurse Sanduni Silva', type: 'nurse', specialty: 'Pediatric Care' },
      { id: 8, name: 'Nurse Raveen Fernando', type: 'nurse', specialty: 'Wound Care' },
      { id: 9, name: 'Nurse Dinithi Gamage', type: 'nurse', specialty: 'Diabetic Care' },
      // Pharmacists
      { id: 10, name: 'Pharm. Chamara Gunawardana', type: 'pharmacist', specialty: 'Medication Review' },
      { id: 11, name: 'Pharm. Tharushi Mendis', type: 'pharmacist', specialty: 'Vaccination' },
      { id: 12, name: 'Pharm. Nuwan Jayasinghe', type: 'pharmacist', specialty: 'Chronic Disease Management' }
    ];
    setPractitioners(mockPractitioners);

    // Initialize with empty appointments array
    setAppointments([]);
  }, []);

  // Generate time slots when date changes
  useEffect(() => {
    if (appointmentDate && selectedPractitioner) {
      const practitionerId = parseInt(selectedPractitioner);
      const bookedSlots = appointments
        .filter(app => app.practitionerId === practitionerId && app.date === appointmentDate)
        .map(app => app.time);
      
      // Generate time slots based on practitioner type
      const practitioner = practitioners.find(p => p.id === practitionerId);
      let startHour = 8;
      let endHour = 16;
      
      if (practitioner) {
        if (practitioner.type === 'nurse') {
          startHour = 7; // Nurses start earlier
          endHour = 17; // Nurses end later
        } else if (practitioner.type === 'pharmacist') {
          startHour = 9; // Pharmacists start later
          endHour = 18; // Pharmacists end later
        }
      }
      
      // Generate time slots
      const allSlots = [];
      for (let i = startHour; i <= endHour; i++) {
        const hour = i % 12 === 0 ? 12 : i % 12;
        const ampm = i < 12 ? 'AM' : 'PM';
        allSlots.push(`${hour}:00 ${ampm}`);
        allSlots.push(`${hour}:30 ${ampm}`);
      }
      
      // Filter out booked slots
      const available = allSlots.filter(slot => !bookedSlots.includes(slot));
      setAvailableSlots(available);
    } else {
      setAvailableSlots([]);
    }
  }, [appointmentDate, selectedPractitioner, appointments, practitioners]);

  // Effect for editing an appointment
  useEffect(() => {
    if (editingAppointment) {
      // Populate form with appointment data
      setSelectedPractitioner(editingAppointment.practitionerId.toString());
      setAppointmentDate(editingAppointment.date);
      setAppointmentTime(editingAppointment.time);
      setPatientName(editingAppointment.patientName);
      setPatientPhone(editingAppointment.patientPhone || '');
      setPatientEmail(editingAppointment.patientEmail || '');
      setMedicalIssue(editingAppointment.medicalIssue || '');
      
      // Switch to booking tab
      setActiveTab('book');
    }
  }, [editingAppointment]);

  // Reset form fields
  const resetForm = () => {
    setSelectedPractitioner('');
    setAppointmentDate('');
    setAppointmentTime('');
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setMedicalIssue('');
    setEditingAppointment(null);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!selectedPractitioner || !appointmentDate || !appointmentTime || !patientName || !patientPhone) {
      setErrorMessage('Please fill all required fields');
      setSuccessMessage('');
      return;
    }
    
    if (editingAppointment) {
      // Update existing appointment
      const updatedAppointments = appointments.map(app => 
        app.id === editingAppointment.id 
          ? {
              ...app,
              practitionerId: parseInt(selectedPractitioner),
              patientName,
              patientPhone,
              patientEmail,
              date: appointmentDate,
              time: appointmentTime,
              medicalIssue
            }
          : app
      );
      
      setAppointments(updatedAppointments);
      
      const practitioner = practitioners.find(p => p.id === parseInt(selectedPractitioner));
      const practitionerType = practitioner ? practitioner.type : 'healthcare provider';
      setSuccessMessage(`${capitalizeFirstLetter(practitionerType)} appointment updated successfully!`);
    } else {
      // Create new appointment
      const newAppointment = {
        id: appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1,
        practitionerId: parseInt(selectedPractitioner),
        patientName,
        patientPhone,
        patientEmail,
        date: appointmentDate,
        time: appointmentTime,
        medicalIssue,
        status: 'Scheduled'
      };
      
      // Add to appointments
      setAppointments([...appointments, newAppointment]);
      
      const practitioner = practitioners.find(p => p.id === parseInt(selectedPractitioner));
      const practitionerType = practitioner ? practitioner.type : 'healthcare provider';
      setSuccessMessage(`${capitalizeFirstLetter(practitionerType)} appointment scheduled successfully!`);
    }
    
    setErrorMessage('');
    
    // Reset form
    resetForm();
    
    // Switch to view tab after successful scheduling
    setActiveTab('view');
  };

  // Capitalize first letter helper
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Get practitioner name by ID
  const getPractitionerName = (id) => {
    const practitioner = practitioners.find(p => p.id === id);
    return practitioner ? practitioner.name : 'Unknown Provider';
  };
  
  // Get practitioner specialty by ID
  const getPractitionerSpecialty = (id) => {
    const practitioner = practitioners.find(p => p.id === id);
    return practitioner ? practitioner.specialty : '';
  };
  
  // Get practitioner type by ID
  const getPractitionerType = (id) => {
    const practitioner = practitioners.find(p => p.id === id);
    return practitioner ? practitioner.type : '';
  };

  // Handle tab change
  const handleTabChange = (tab, e) => {
    e.preventDefault();
    setActiveTab(tab);
    
    // Reset form and messages when switching to book tab
    if (tab === 'book' && !editingAppointment) {
      resetForm();
      setSuccessMessage('');
      setErrorMessage('');
    }
  };

  // Handle edit appointment
  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
  };

  // Handle cancel/delete appointment
  const handleDeleteAppointment = (appointmentId) => {
    // Filter out the appointment with the given ID
    const updatedAppointments = appointments.filter(app => app.id !== appointmentId);
    setAppointments(updatedAppointments);
  };

  // Get filtered practitioners based on type
  const getFilteredPractitioners = () => {
    if (practitionerTypeFilter === 'all') {
      return practitioners;
    }
    return practitioners.filter(p => p.type === practitionerTypeFilter);
  };

  // Filter appointments based on search term and practitioner type
  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = 
      app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      getPractitionerName(app.practitionerId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getPractitionerSpecialty(app.practitionerId).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTypeFilter = 
      practitionerTypeFilter === 'all' || 
      getPractitionerType(app.practitionerId) === practitionerTypeFilter;
    
    return matchesSearch && matchesTypeFilter;
  });

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Healthcare Appointment System</h1>
      
      {/* Tabs for navigation */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <a 
            className={`nav-link ${activeTab === 'book' ? 'active' : ''}`} 
            href="#book"
            onClick={(e) => handleTabChange('book', e)}
          >
            Book Appointment
          </a>
        </li>
        <li className="nav-item">
          <a 
            className={`nav-link ${activeTab === 'view' ? 'active' : ''}`} 
            href="#view"
            onClick={(e) => handleTabChange('view', e)}
          >
            Manage Appointments
          </a>
        </li>
      </ul>
      
      {/* Booking Form Section */}
      {activeTab === 'book' && (
        <div className="row">
          {/* Booking Form */}
          <div className="col-md-7">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">
                  {editingAppointment ? 'Reschedule Appointment' : 'Schedule an Appointment'}
                </h4>
              </div>
              <div className="card-body">
                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label mb-3">Appointment Type*</label>
                    <div className="d-flex">
                      <div className="form-check me-4">
                        <input 
                          className="form-check-input" 
                          type="radio" 
                          name="practitionerType" 
                          id="doctorType"
                          checked={practitionerTypeFilter === 'doctor'}
                          onChange={() => setPractitionerTypeFilter('doctor')}
                        />
                        <label className="form-check-label" htmlFor="doctorType">
                          Doctor
                        </label>
                      </div>
                      <div className="form-check me-4">
                        <input 
                          className="form-check-input" 
                          type="radio" 
                          name="practitionerType" 
                          id="nurseType"
                          checked={practitionerTypeFilter === 'nurse'}
                          onChange={() => setPractitionerTypeFilter('nurse')}
                        />
                        <label className="form-check-label" htmlFor="nurseType">
                          Nurse
                        </label>
                      </div>
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="radio" 
                          name="practitionerType" 
                          id="pharmacistType"
                          checked={practitionerTypeFilter === 'pharmacist'}
                          onChange={() => setPractitionerTypeFilter('pharmacist')}
                        />
                        <label className="form-check-label" htmlFor="pharmacistType">
                          Pharmacist
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="practitioner" className="form-label">Select Healthcare Provider*</label>
                    <select 
                      className="form-select" 
                      id="practitioner"
                      value={selectedPractitioner}
                      onChange={(e) => setSelectedPractitioner(e.target.value)}
                      required
                    >
                      <option value="">Choose a provider</option>
                      {getFilteredPractitioners().map(practitioner => (
                        <option key={practitioner.id} value={practitioner.id}>
                          {practitioner.name} - {practitioner.specialty}
                        </option>
                      ))}
                    </select>
                    {practitionerTypeFilter === 'all' && (
                      <small className="text-muted">Select a provider type to see specific options</small>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">Appointment Date*</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      id="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="time" className="form-label">Appointment Time*</label>
                    <select 
                      className="form-select" 
                      id="time"
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      disabled={!appointmentDate || !selectedPractitioner}
                      required
                    >
                      <option value="">Select a time slot</option>
                      {availableSlots.map((slot, index) => (
                        <option key={index} value={slot}>{slot}</option>
                      ))}
                      {/* Show current time if editing and not found in available slots */}
                      {editingAppointment && appointmentTime && !availableSlots.includes(appointmentTime) && (
                        <option value={appointmentTime}>{appointmentTime} (Current)</option>
                      )}
                    </select>
                    {(!appointmentDate || !selectedPractitioner) && (
                      <small className="text-muted">Please select a provider and date first</small>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Patient Name*</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Contact Number*</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="phone"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="For appointment confirmations"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      placeholder="For appointment reminders (optional)"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="medical-issue" className="form-label">Reason for Visit</label>
                    <textarea 
                      className="form-control" 
                      id="medical-issue" 
                      rows="3"
                      value={medicalIssue}
                      onChange={(e) => setMedicalIssue(e.target.value)}
                      placeholder="Briefly describe your symptoms or reason for visit"
                    ></textarea>
                  </div>
                  
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      {editingAppointment ? 'Update Appointment' : 'Confirm Appointment'}
                    </button>
                    {editingAppointment && (
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={resetForm}
                      >
                        Cancel Changes
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Provider Information and Upcoming Appointments */}
          <div className="col-md-5">
            {selectedPractitioner && (
              <div className="card shadow mb-4">
                <div className="card-header bg-info text-white">
                  <h4 className="mb-0">Provider Information</h4>
                </div>
                <div className="card-body">
                  <h5>{getPractitionerName(parseInt(selectedPractitioner))}</h5>
                  <p className="mb-2"><strong>Type:</strong> {capitalizeFirstLetter(getPractitionerType(parseInt(selectedPractitioner)))}</p>
                  <p className="mb-2"><strong>Specialty:</strong> {getPractitionerSpecialty(parseInt(selectedPractitioner))}</p>
                  
                  {/* Different availability based on practitioner type */}
                  {getPractitionerType(parseInt(selectedPractitioner)) === 'doctor' && (
                    <p className="mb-0"><strong>Availability:</strong> Monday-Friday, 8:00 AM - 5:00 PM</p>
                  )}
                  {getPractitionerType(parseInt(selectedPractitioner)) === 'nurse' && (
                    <p className="mb-0"><strong>Availability:</strong> Monday-Saturday, 7:00 AM - 6:00 PM</p>
                  )}
                  {getPractitionerType(parseInt(selectedPractitioner)) === 'pharmacist' && (
                    <p className="mb-0"><strong>Availability:</strong> Monday-Sunday, 9:00 AM - 7:00 PM</p>
                  )}
                </div>
              </div>
            )}
            
            <div className="card shadow">
              <div className="card-header bg-info text-white">
                <h4 className="mb-0">Upcoming Appointments</h4>
              </div>
              <div className="card-body">
                {appointments.length === 0 ? (
                  <p className="text-center">No appointments scheduled</p>
                ) : (
                  <div className="list-group">
                    {appointments.slice(0, 3).map(appointment => (
                      <div key={appointment.id} className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{appointment.patientName}</h5>
                          <small className={`badge ${appointment.status === 'Completed' ? 'bg-success' : 'bg-warning'}`}>
                            {appointment.status}
                          </small>
                        </div>
                        <p className="mb-1">
                          <strong>Provider:</strong> {getPractitionerName(appointment.practitionerId)}
                        </p>
                        <p className="mb-1">
                          <strong>Type:</strong> {capitalizeFirstLetter(getPractitionerType(appointment.practitionerId))}
                        </p>
                        <p className="mb-1">
                          <strong>Date:</strong> {appointment.date} at {appointment.time}
                        </p>
                      </div>
                    ))}
                    {appointments.length > 3 && (
                      <button 
                        className="btn btn-outline-primary mt-2 w-100"
                        onClick={(e) => handleTabChange('view', e)}
                      >
                        View All Appointments
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Appointment Stats */}
            <div className="card mt-3 shadow">
              <div className="card-header bg-secondary text-white">
                <h5 className="mb-0">Appointment Summary</h5>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-4">
                    <h3>{appointments.length}</h3>
                    <p className="text-muted">Total</p>
                  </div>
                  <div className="col-4">
                    <h3>{appointments.filter(a => a.status === 'Completed').length}</h3>
                    <p className="text-muted">Completed</p>
                  </div>
                  <div className="col-4">
                    <h3>{appointments.filter(a => a.status === 'Scheduled').length}</h3>
                    <p className="text-muted">Scheduled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* View Appointments Tab */}
      {activeTab === 'view' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow">
              <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                <h4 className="mb-0">All Healthcare Appointments</h4>
                <div className="btn-group">
                  <button 
                    className={`btn btn-sm ${practitionerTypeFilter === 'all' ? 'btn-light' : 'btn-outline-light'}`}
                    onClick={() => setPractitionerTypeFilter('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`btn btn-sm ${practitionerTypeFilter === 'doctor' ? 'btn-light' : 'btn-outline-light'}`}
                    onClick={() => setPractitionerTypeFilter('doctor')}
                  >
                    Doctors
                  </button>
                  <button 
                    className={`btn btn-sm ${practitionerTypeFilter === 'nurse' ? 'btn-light' : 'btn-outline-light'}`}
                    onClick={() => setPractitionerTypeFilter('nurse')}
                  >
                    Nurses
                  </button>
                  <button 
                    className={`btn btn-sm ${practitionerTypeFilter === 'pharmacist' ? 'btn-light' : 'btn-outline-light'}`}
                    onClick={() => setPractitionerTypeFilter('pharmacist')}
                  >
                    Pharmacists
                  </button>
                </div>
              </div>
              <div className="card-body">
                {appointments.length === 0 ? (
                  <div className="text-center my-4">
                    <h5>No appointments scheduled</h5>
                    <button
                      className="btn btn-primary mt-3"
                      onClick={(e) => handleTabChange('book', e)}
                    >
                      Schedule Your First Appointment
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search by patient, provider, or specialty..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="col-md-4 ms-auto text-end">
                        <button 
                          className="btn btn-primary"
                          onClick={(e) => handleTabChange('book', e)}
                        >
                          + New Appointment
                        </button>
                      </div>
                    </div>
                    
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Patient</th>
                            <th>Provider</th>
                            <th>Type</th>
                            <th>Specialty</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAppointments.map(appointment => (
                            <tr key={appointment.id}>
                              <td>{appointment.id}</td>
                              <td>{appointment.patientName}</td>
                              <td>{getPractitionerName(appointment.practitionerId)}</td>
                              <td>{capitalizeFirstLetter(getPractitionerType(appointment.practitionerId))}</td>
                              <td>{getPractitionerSpecialty(appointment.practitionerId)}</td>
                              <td>{appointment.date}</td>
                              <td>{appointment.time}</td>
                              <td>
                                <span className={`badge ${appointment.status === 'Completed' ? 'bg-success' : 'bg-warning'}`}>
                                  {appointment.status}
                                </span>
                              </td>
                              <td>
                                <button 
                                  className="btn btn-sm btn-outline-primary me-2"
                                  onClick={() => handleEditAppointment(appointment)}
                                >
                                  Reschedule
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDeleteAppointment(appointment.id)}
                                >
                                  Cancel
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <p className="text-muted mb-0">Showing {filteredAppointments.length} appointments</p>
                      <div>
                        <button className="btn btn-sm btn-outline-secondary me-2">Previous</button>
                        <button className="btn btn-sm btn-outline-secondary">Next</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Appointment Statistics */}
            <div className="row mt-4">
              <div className="col-md-3">
                <div className="card text-center bg-light">
                  <div className="card-body">
                    <h5>Total Appointments</h5>
                    <h2>{appointments.length}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center bg-light">
                  <div className="card-body">
                    <h5>Doctor Appointments</h5>
                    <h2>{appointments.filter(a => getPractitionerType(a.practitionerId) === 'doctor').length}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center bg-light">
                  <div className="card-body">
                    <h5>Nurse Appointments</h5>
                    <h2>{appointments.filter(a => getPractitionerType(a.practitionerId) === 'nurse').length}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center bg-light">
                  <div className="card-body">
                    <h5>Pharmacist Appointments</h5>
                    <h2>{appointments.filter(a => getPractitionerType(a.practitionerId) === 'pharmacist').length}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HealthcareAppointmentSystem;