import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faUserPlus, 
  faCalendar, 
  faEnvelope, 
  faBell, 
  faEllipsisV, 
  faPhone, 
  faFileAlt, 
  faComment,
  faHome,
  faClipboardList,
  faWallet,
  faUser,
  faSignOutAlt,
  faChevronLeft,
  faChevronRight,
  faHeartbeat,
  faStethoscope,
  faPhoneAlt,
  faCheck,
  faTimes,
  faUserCircle,
  faBriefcaseMedical,
  faCalendarDay,
  faAllergies
} from '@fortawesome/free-solid-svg-icons';

const MedicalDashboard = () => {
  // State for managing dashboard data
  const [dashboardData, setDashboardData] = useState({
    totalPatients: 2000,
    todayPatients: 68,
    todayAppointments: 85,
    appointments: [
      { id: 'APT-001', name: 'M.J. Mical', type: 'Health Checkup', time: 'On Going', age: 42, bloodGroup: 'B+', allergies: ['Sulfa Drugs'], currentCondition: 'Health Checkup' },
      { id: 'APT-002', name: 'Sanath Deo', type: 'Health Checkup', time: '12:30 PM', age: 35, bloodGroup: 'O+', allergies: ['Penicillin', 'Peanuts'], currentCondition: 'Health Checkup' },
      { id: 'APT-003', name: 'Loeara Phanj', type: 'Report', time: '01:00 PM', age: 28, bloodGroup: 'A-', allergies: [], currentCondition: 'Report Consultation' },
      { id: 'APT-004', name: 'Komola Haris', type: 'Common Cold', time: '01:30 PM', age: 47, bloodGroup: 'AB+', allergies: ['Aspirin'], currentCondition: 'Common Cold' }
    ],
    appointmentRequests: [
      { id: 'REQ-001', name: 'Maria Sarafat', condition: 'Cold' },
      { id: 'REQ-002', name: 'Jhon Deo', condition: 'Over Sweating' }
    ],
    nextPatient: {
      id: '022090902005',
      name: 'Sanath Deo',
      patientId: '022090902005',
      dob: '15 January 1989',
      sex: 'Male',
      weight: '59 Kg',
      regDate: '10 Dec-2021',
      medicalHistory: ['Asthma', 'Hypertension', 'Fever']
    }
  });

  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  const doctorData = {
    id: 'DOC-2023-789',
    fullName: 'Dr. Ravindu Silva',
    specialization: 'MBBs, FCPS, MD Medicine',
    yearsOfExperience: 12,
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday']
  };

  const menuItems = [
    { name: 'Dashboard', icon: faHome },
    { name: 'Appointment', icon: faClipboardList },
    { name: 'Payment', icon: faWallet },
    { name: 'Profile', icon: faUser },
    { name: 'Logout', icon: faSignOutAlt }
  ];

  // WebSocket connection for real-time updates (simulated)
  useEffect(() => {
    // Simulating a WebSocket connection
    const socket = {
      onmessage: null,
      close: () => {}
    };

    // Simulate receiving a message after 5 seconds
    const timer = setTimeout(() => {
      if (socket.onmessage) {
        socket.onmessage({
          data: JSON.stringify({
            type: 'APPOINTMENT_REQUEST',
            request: { id: 'REQ-003', name: 'Amara Jayasinghe', condition: 'Migraine' }
          })
        });
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      socket.close();
    };
  }, []);

  // Handlers for interactive components
  const handleAppointmentAccept = (request) => {
    setDashboardData(prev => ({
      ...prev,
      appointmentRequests: prev.appointmentRequests.filter(r => r.id !== request.id),
      appointments: [...prev.appointments, { 
        id: `APT-${prev.appointments.length + 1}`,
        name: request.name, 
        type: request.condition, 
        time: 'Scheduled',
        age: 30,
        bloodGroup: 'O+',
        allergies: [],
        currentCondition: request.condition
      }]
    }));
  }

  const handleAppointmentReject = (request) => {
    setDashboardData(prev => ({
      ...prev,
      appointmentRequests: prev.appointmentRequests.filter(r => r.id !== request.id)
    }));
  }

  const handlePatientSelect = (appointment) => {
    setSelectedPatient(appointment);
  };

  const DynamicCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
  
    // Generate calendar days
    const generateCalendarDays = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      
      // First day of the month
      const firstDay = new Date(year, month, 1);
      // Last day of the month
      const lastDay = new Date(year, month + 1, 0);
      
      // Days from previous month to fill the start of the calendar
      const startingDayOfWeek = firstDay.getDay();
      
      const calendarDays = [];
      
      // Previous month's days
      const prevMonth = new Date(year, month, 0);
      for (let i = 0; i < startingDayOfWeek; i++) {
        calendarDays.push({
          date: prevMonth.getDate() - startingDayOfWeek + i + 1,
          month: 'prev',
          isToday: false
        });
      }
      
      // Current month's days
      for (let i = 1; i <= lastDay.getDate(); i++) {
        calendarDays.push({
          date: i,
          month: 'current',
          isToday: i === new Date().getDate() && 
                   month === new Date().getMonth() && 
                   year === new Date().getFullYear()
        });
      }
      
      // Next month's days to complete the grid
      const remainingSlots = 42 - calendarDays.length;
      for (let i = 1; i <= remainingSlots; i++) {
        calendarDays.push({
          date: i,
          month: 'next',
          isToday: false
        });
      }
      
      return calendarDays;
    };
  
    const [calendarDays, setCalendarDays] = useState(generateCalendarDays(currentDate));
  
    // Update calendar when date changes
    useEffect(() => {
      setCalendarDays(generateCalendarDays(currentDate));
    }, [currentDate]);
  
    // Navigate to previous month
    const goToPreviousMonth = () => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };
  
    // Navigate to next month
    const goToNextMonth = () => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };
  
    // Months array for display
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    // Days of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <button 
            className="btn btn-link text-dark" 
            onClick={goToPreviousMonth}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <h5 className="card-title mb-0">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h5>
          <button 
            className="btn btn-link text-dark" 
            onClick={goToNextMonth}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <div className="card-body">
          <div className="row mb-2">
            {daysOfWeek.map(day => (
              <div key={day} className="col text-center fw-bold text-muted small">
                {day}
              </div>
            ))}
          </div>
          <div className="row">
            {calendarDays.map((day, index) => (
              <div 
                key={index} 
                className={`col text-center p-2 ${
                  day.month === 'current' 
                    ? day.isToday 
                      ? 'bg-primary text-white rounded' 
                      : '' 
                    : 'text-muted'
                }`}
              >
                {day.date}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderActiveTabContent = () => {
    switch(activeMenu) {
      case 'Dashboard':
        return (
          <>
            {/* Key Metrics Cards */}
            <div className="row mb-4 g-3">
              <div className="col-md-3">
                <div className="card bg-primary text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Total Patients</div>
                      <div className="fs-4">{dashboardData.totalPatients}+</div>
                      <small>Till Today</small>
                    </div>
                    <FontAwesomeIcon icon={faUsers} size="2x" />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-success text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Today Patients</div>
                      <div className="fs-4">{dashboardData.todayPatients}</div>
                      <small>21 Dec-2021</small>
                    </div>
                    <FontAwesomeIcon icon={faUserPlus} size="2x" />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-warning text-dark">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Today Appointments</div>
                      <div className="fs-4">{dashboardData.todayAppointments}</div>
                      <small>21 Dec-2021</small>
                    </div>
                    <FontAwesomeIcon icon={faCalendar} size="2x" />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-info text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Available Days</div>
                      <div className="fs-4">{doctorData.availableDays.length}</div>
                      <small>Per Week</small>
                    </div>
                    <FontAwesomeIcon icon={faCalendarDay} size="2x" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Appointments and Patient Details Section */}
            <div className="row mb-4">
              {/* Today's Appointments */}
              <div className="col-md-5 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">Today Appointment</h5>
                    <button className="btn btn-sm btn-outline-primary">See All</button>
                  </div>
                  <div className="card-body">
                    {dashboardData.appointments.map((appointment) => (
                      <div 
                        key={appointment.id} 
                        className={`d-flex justify-content-between align-items-center mb-3 p-2 ${
                          selectedPatient?.id === appointment.id ? 'bg-light rounded' : ''
                        }`}
                        role="button"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handlePatientSelect(appointment)}
                      >
                        <div className="d-flex align-items-center">
                          <div className="bg-light rounded-circle p-2 me-3">
                            <FontAwesomeIcon icon={faUser} />
                          </div>
                          <div>
                            <h6 className="mb-1">{appointment.name}</h6>
                            <small className="text-muted">{appointment.type}</small>
                          </div>
                        </div>
                        <span className="text-primary">{appointment.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Patient Details */}
              <div className="col-md-7 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-white">
                    <h5 className="card-title mb-0">Patient Details</h5>
                  </div>
                  <div className="card-body">
                    {selectedPatient ? (
                      <>
                        <div className="d-flex align-items-center mb-4">
                          <div className="bg-light rounded-circle p-3 me-3">
                            <FontAwesomeIcon icon={faUser} size="2x" />
                          </div>
                          <div>
                            <h4 className="mb-1">{selectedPatient.name}</h4>
                            <small className="text-muted">ID: {selectedPatient.id}</small>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <small className="text-muted">Age</small>
                              <p className="mb-0">{selectedPatient.age} Years</p>
                            </div>
                            <div className="mb-3">
                              <small className="text-muted">Blood Group</small>
                              <p className="mb-0">
                                <FontAwesomeIcon icon={faHeartbeat} className="me-2" />
                                {selectedPatient.bloodGroup}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <small className="text-muted">Current Condition</small>
                              <p className="mb-0">{selectedPatient.currentCondition}</p>
                            </div>
                            <div className="mb-3">
                              <small className="text-muted">Appointment Time</small>
                              <p className="mb-0">{selectedPatient.time}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <small className="text-muted">Allergies</small>
                          <div>
                            {selectedPatient.allergies.length > 0 ? (
                              selectedPatient.allergies.map((allergy, index) => (
                                <span key={index} className="badge bg-danger me-2 mb-2">
                                  <FontAwesomeIcon icon={faAllergies} className="me-1" />
                                  {allergy}
                                </span>
                              ))
                            ) : (
                              <span>None reported</span>
                            )}
                          </div>
                        </div>

                        <div className="d-grid gap-2 d-md-flex mt-4">
                          <button className="btn btn-primary me-md-2">
                            <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                            View Full History
                          </button>
                          <button className="btn btn-outline-primary me-md-2">
                            <FontAwesomeIcon icon={faPhone} className="me-2" />
                            Call Patient
                          </button>
                          <button className="btn btn-outline-primary">
                            <FontAwesomeIcon icon={faComment} className="me-2" />
                            Chat
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-muted py-5">
                        Select a patient from the appointments list to view details
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Requests and Calendar */}
            <div className="row">
              {/* Appointment Requests */}
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-header bg-white">
                    <h5 className="card-title mb-0">Appointment Request</h5>
                  </div>
                  <div className="card-body">
                    {dashboardData.appointmentRequests.length > 0 ? (
                      dashboardData.appointmentRequests.map((request) => (
                        <div key={request.id} className="d-flex justify-content-between align-items-center mb-3">
                          <div className="d-flex align-items-center">
                            <div className="bg-light rounded-circle p-2 me-3">
                              <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div>
                              <h6 className="mb-1">{request.name}</h6>
                              <small className="text-muted">{request.condition}</small>
                            </div>
                          </div>
                          <div>
                            <button 
                              className="btn btn-success btn-sm me-2"
                              onClick={() => handleAppointmentAccept(request)}
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </button>
                            <button 
                              className="btn btn-danger btn-sm me-2"
                              onClick={() => handleAppointmentReject(request)}
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                            <button 
                              className="btn btn-primary btn-sm"
                              onClick={() => alert(`Details for ${request.name}`)}
                            >
                              📝
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-muted py-3">
                        No pending appointment requests
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Dynamic Calendar */}
              <div className="col-md-6">
                <DynamicCalendar />
              </div>
            </div>
          </>
        );

      default:
        return (
          <div className="text-center py-5">
            <h4 className="text-muted">{activeMenu} Section</h4>
            <p className="text-secondary">This section is currently under development</p>
          </div>
        );
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* Sidebar Navigation */}
        <div className="col-md-2 bg-dark text-white" style={{ minHeight: '100vh', overflow: 'auto' }}>
          <div className="d-flex flex-column">
            <div className="text-center p-4 border-bottom border-secondary">
              <div className="rounded-circle bg-primary mx-auto d-flex justify-content-center align-items-center" 
                   style={{ width: '70px', height: '70px' }}>
                <FontAwesomeIcon icon={faStethoscope} size="2x" className="text-white" />
              </div>
              <div className="mt-3 fw-bold">Doctor Portal</div>
              <div className="small text-light">ID: {doctorData.id}</div>
            </div>
            
            <nav className="py-2">
              {menuItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`d-flex align-items-center p-3 ${activeMenu === item.name ? 'bg-primary' : ''}`}
                  style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
                  onClick={() => setActiveMenu(item.name)}
                >
                  <FontAwesomeIcon icon={item.icon} className="me-3" />
                  <span>{item.name}</span>
                </div>
              ))}
            </nav>

            <div className="p-3 border-top border-secondary mt-auto">
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faPhoneAlt} className="me-3" />
                <div className="small">
                  <div>Emergency:</div>
                  <div className="fw-bold">0112-123456</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="col-md-10 bg-light">
          <div className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
            <h4 className="m-0">Medical Dashboard</h4>
            <div className="d-flex align-items-center gap-3">
              <div className="input-group" style={{ width: '250px' }}>
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="form-control rounded-pill me-3"
                />
              </div>
              <button className="btn btn-link text-dark me-2" onClick={() => alert('Message inbox')}>
                <FontAwesomeIcon icon={faEnvelope} />
              </button>
              <button className="btn btn-link text-dark me-2" onClick={() => alert('Notifications')}>
                <FontAwesomeIcon icon={faBell} />
              </button>
              <div className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faUserCircle} size="lg" />
                <span>{doctorData.fullName}</span>
              </div>
            </div>
          </div>

          <div className="p-4">
            {renderActiveTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;