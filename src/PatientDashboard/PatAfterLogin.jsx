import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faUser, faUserMd, faUserNurse, faPills, 
  faCalendarCheck, faSignOutAlt, faUserCircle, faHeartbeat, 
  faNotesMedical, faCalendarAlt, faPen, faEdit, faPlus, faPhoneAlt,
  faEnvelope, faIdCard, faMapMarkerAlt, faTint, faExclamationTriangle,
  faStethoscope, faAddressBook, faUserFriends, faLock, faUnlockAlt
} from '@fortawesome/free-solid-svg-icons';

const PatientDashboard = () => {
  // Active menu state
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  
  // Patient data state based on the provided attributes
  const [patientData, setPatientData] = useState({
    personalDetails: {
      id: 'PT-202405-001',
      fullName: 'Jane Doe',
      gender: 'Female',
      dateOfBirth: '15-May-1991',
      email: 'jane.doe@example.com',
      phoneNumber: '(555) 123-4567',
      homeAddress: '123 Main Street, Apt 4B, New York, NY 10001',
      username: 'jane.doe'
    },
    medicalDetails: {
      bloodGroup: 'O+',
      allergies: ['Penicillin', 'Peanuts', 'Latex'],
      existingMedicalConditions: ['Asthma', 'Hypertension', 'Migraine']
    },
    emergencyContact: {
      emergencyContactName: 'John Doe',
      emergencyContactRelationship: 'Spouse',
      emergencyContactNumber: '(555) 987-6543'
    },
    vitalStats: {
      height: '168 cm',
      weight: '65 kg',
      bloodPressure: '120/80 mmHg',
      bmi: '23.0 (Normal)',
      temperature: '98.6°F',
      pulseRate: '72 bpm',
      respirationRate: '16 breaths/min',
      oxygenSaturation: '98%'
    },
    appointments: [
      { doctor: 'Dr. Smith (Cardiologist)', date: 'March 15, 2025 - 10:00 AM', status: 'Confirmed' },
      { doctor: 'Dr. Johnson (Primary Care)', date: 'March 22, 2025 - 2:30 PM', status: 'Pending' },
      { doctor: 'Lab Work (Blood Test)', date: 'March 25, 2025 - 8:00 AM', status: 'Confirmed' }
    ],
    recentPrescriptions: [
      { medication: 'Lisinopril 10mg', instructions: 'Take once daily', prescribedBy: 'Dr. Smith', date: 'Feb 15, 2025' },
      { medication: 'Albuterol Inhaler', instructions: 'Use as needed', prescribedBy: 'Dr. Johnson', date: 'Feb 28, 2025' }
    ]
  });

  // Sample edit function (in a real app, this would save to backend)
  const handleEdit = (section, field, newValue) => {
    setPatientData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: newValue
      }
    }));
  };

  // Menu items
  const menuItems = [
    { name: 'Dashboard', icon: faHome },
    { name: 'My Profile', icon: faUser },
    { name: 'Appointments', icon: faCalendarCheck },
    { name: 'Medical Records', icon: faNotesMedical },
    { name: 'Prescriptions', icon: faPills },
    { name: 'Find Doctors', icon: faUserMd },
    { name: 'Nurse Services', icon: faUserNurse },
    { name: 'Account Settings', icon: faLock },
    { name: 'Logout', icon: faSignOutAlt }
  ];

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-md-2 bg-dark text-white" style={{ minHeight: '100vh' }}>
          <div className="d-flex flex-column h-100">
            {/* Patient Logo Area */}
            <div className="text-center p-4 border-bottom border-secondary">
              <div className="rounded-circle bg-primary mx-auto d-flex justify-content-center align-items-center" style={{ width: '70px', height: '70px' }}>
                <FontAwesomeIcon icon={faUserCircle} size="3x" className="text-white" />
              </div>
              <div className="mt-3 fw-bold">{patientData.personalDetails.fullName}</div>
              <div className="small text-light">Patient ID: {patientData.personalDetails.id}</div>
            </div>
            
            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <div 
                  key={index}
                  className={`d-flex align-items-center p-3 ${activeMenu === item.name ? 'bg-primary text-white' : 'text-light'}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActiveMenu(item.name)}
                >
                  <FontAwesomeIcon icon={item.icon} className="me-3" />
                  <span className="fw-medium">{item.name}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-auto p-3 border-top border-secondary">
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faPhoneAlt} className="me-3 text-light" />
                <div className="small text-light">
                  <div>Help Desk</div>
                  <div className="fw-bold">1-800-123-4567</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="col-md-10 bg-light">
          {/* Header */}
          <div className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
            <h4 className="m-0">Patient Dashboard</h4>
            <div className="d-flex align-items-center">
              <div className="me-3">
                <span className="badge bg-primary me-2">
                  <FontAwesomeIcon icon={faUser} className="me-1" />
                  Patient
                </span>
                <span className="small text-muted">Last Login: Today, 9:41 AM</span>
              </div>
              <div className="dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center" type="button" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false">
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                  {patientData.personalDetails.fullName}
                </button>
              </div>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <div className="p-4">
            {/* Quick Stats */}
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="card bg-primary text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Upcoming Appointments</div>
                      <div className="fs-4 fw-bold">{patientData.appointments.length}</div>
                    </div>
                    <FontAwesomeIcon icon={faCalendarAlt} size="2x" />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-success text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Active Prescriptions</div>
                      <div className="fs-4 fw-bold">{patientData.recentPrescriptions.length}</div>
                    </div>
                    <FontAwesomeIcon icon={faPills} size="2x" />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-info text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Blood Group</div>
                      <div className="fs-4 fw-bold">{patientData.medicalDetails.bloodGroup}</div>
                    </div>
                    <FontAwesomeIcon icon={faTint} size="2x" />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-warning text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Allergies</div>
                      <div className="fs-4 fw-bold">{patientData.medicalDetails.allergies.length}</div>
                    </div>
                    <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Patient Information Section */}
            <div className="row mb-4">
              {/* Personal Details Card */}
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 className="m-0">
                      <FontAwesomeIcon icon={faIdCard} className="text-primary me-2" />
                      Personal Information
                    </h5>
                    <button className="btn btn-sm btn-outline-primary">
                      <FontAwesomeIcon icon={faEdit} className="me-2" />
                      Edit
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="small text-muted">Patient ID</div>
                        <div>{patientData.personalDetails.id}</div>
                      </div>
                      <div className="col-md-6">
                        <div className="small text-muted">Full Name</div>
                        <div>{patientData.personalDetails.fullName}</div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="small text-muted">Gender</div>
                        <div>{patientData.personalDetails.gender}</div>
                      </div>
                      <div className="col-md-6">
                        <div className="small text-muted">Date of Birth</div>
                        <div>{patientData.personalDetails.dateOfBirth}</div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="small text-muted">Email</div>
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon icon={faEnvelope} className="text-muted me-2" />
                          {patientData.personalDetails.email}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="small text-muted">Phone Number</div>
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon icon={faPhoneAlt} className="text-muted me-2" />
                          {patientData.personalDetails.phoneNumber}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="small text-muted">Home Address</div>
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-muted me-2" />
                          {patientData.personalDetails.homeAddress}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Medical Details Card */}
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 className="m-0">
                      <FontAwesomeIcon icon={faStethoscope} className="text-primary me-2" />
                      Medical Information
                    </h5>
                    <button className="btn btn-sm btn-outline-primary">
                      <FontAwesomeIcon icon={faEdit} className="me-2" />
                      Edit
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="small text-muted">Blood Group</div>
                        <div>{patientData.medicalDetails.bloodGroup}</div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="small text-muted">Allergies</div>
                      <div>
                        {patientData.medicalDetails.allergies.map((allergy, index) => (
                          <span key={index} className="badge bg-danger me-2 mb-1">{allergy}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="small text-muted">Existing Medical Conditions</div>
                      <div>
                        {patientData.medicalDetails.existingMedicalConditions.map((condition, index) => (
                          <span key={index} className="badge bg-warning text-dark me-2 mb-1">{condition}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Second Row */}
            <div className="row mb-4">
              {/* Emergency Contact Card */}
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 className="m-0">
                      <FontAwesomeIcon icon={faAddressBook} className="text-primary me-2" />
                      Emergency Contact
                    </h5>
                    <button className="btn btn-sm btn-outline-primary">
                      <FontAwesomeIcon icon={faEdit} className="me-2" />
                      Edit
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <div className="small text-muted">Contact Name</div>
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon icon={faUserFriends} className="text-muted me-2" />
                          {patientData.emergencyContact.emergencyContactName}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="small text-muted">Relationship</div>
                        <div>{patientData.emergencyContact.emergencyContactRelationship}</div>
                      </div>
                      <div className="col-md-6">
                        <div className="small text-muted">Contact Number</div>
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon icon={faPhoneAlt} className="text-muted me-2" />
                          {patientData.emergencyContact.emergencyContactNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Account Information Card */}
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 className="m-0">
                      <FontAwesomeIcon icon={faLock} className="text-primary me-2" />
                      Account Information
                    </h5>
                    <button className="btn btn-sm btn-outline-primary">
                      <FontAwesomeIcon icon={faEdit} className="me-2" />
                      Edit
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="small text-muted">Username</div>
                        <div>{patientData.personalDetails.username}</div>
                      </div>
                      <div className="col-md-6">
                        <div className="small text-muted">Password</div>
                        <div className="d-flex align-items-center">
                          <span>••••••••</span>
                          <button className="btn btn-sm btn-link ms-2">
                            <FontAwesomeIcon icon={faUnlockAlt} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <div className="alert alert-info mb-0">
                          <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
                          For security reasons, we recommend changing your password every 90 days.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Vital Statistics Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="m-0">
                  <FontAwesomeIcon icon={faHeartbeat} className="text-primary me-2" />
                  Vital Statistics
                </h5>
                <button className="btn btn-sm btn-outline-primary">
                  <FontAwesomeIcon icon={faEdit} className="me-2" />
                  Update
                </button>
              </div>
              <div className="card-body">
                <div className="row">
                  {Object.entries(patientData.vitalStats).map(([key, value], index) => (
                    <div key={index} className="col-md-3 mb-3">
                      <div className="card h-100">
                        <div className="card-body p-3">
                          <div className="small text-muted">
                            {key === 'bmi' ? 'BMI' : 
                             key.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + 
                             key.replace(/([A-Z])/g, ' $1').slice(1)}
                          </div>
                          <div className="fw-bold">{value}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Appointments Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="m-0">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-primary me-2" />
                  Upcoming Appointments
                </h5>
                <button className="btn btn-sm btn-primary">
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  New Appointment
                </button>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Doctor</th>
                        <th>Date & Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patientData.appointments.map((appointment, index) => (
                        <tr key={index}>
                          <td>{appointment.doctor}</td>
                          <td>{appointment.date}</td>
                          <td>
                            <span className={`badge ${appointment.status === 'Confirmed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                              {appointment.status}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-secondary me-2">
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              <FontAwesomeIcon icon={faSignOutAlt} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Recent Prescriptions */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="m-0">
                  <FontAwesomeIcon icon={faPills} className="text-primary me-2" />
                  Recent Prescriptions
                </h5>
                <button className="btn btn-sm btn-outline-primary">
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  View All
                </button>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Medication</th>
                        <th>Instructions</th>
                        <th>Prescribed By</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patientData.recentPrescriptions.map((prescription, index) => (
                        <tr key={index}>
                          <td>{prescription.medication}</td>
                          <td>{prescription.instructions}</td>
                          <td>{prescription.prescribedBy}</td>
                          <td>{prescription.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;