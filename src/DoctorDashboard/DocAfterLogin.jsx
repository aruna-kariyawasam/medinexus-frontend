import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, faCalendar, faHome, 
  faUser, faSignOutAlt, faChevronLeft, 
  faChevronRight, faUserCircle, faNotesMedical,
  faFileAlt, faComment, faAllergies, faHeartbeat,
  faSyringe, faPhone
} from '@fortawesome/free-solid-svg-icons';

const MedicalDashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [doctorData, setDoctorData] = useState({
    fullName: "Dr. Kasun Perera",
    specialization: "Cardiology",
    yearsOfExperience: 15,
    clinicAddress: "123 Medical Street, Health City",
    email: "kasunp@mediclinic.com",
    phoneNumber: "+94 77 123 4567",
    availableDays: ["Mon", "Wed", "Fri"],
    availableTimeSlots: ["09:00 AM", "11:00 AM", "02:00 PM"]
  });

  const [dashboardData, setDashboardData] = useState({
    todayAppointments: 3,
    appointments: [
      { 
        name: 'M.J. Mical', 
        type: 'Health Checkup', 
        time: 'On Going',
        age: 45,
        bloodGroup: 'A+',
        allergies: ['Penicillin', 'Dust Mites'],
        currentDiseases: ['Hypertension'],
        patientId: 'PAT001'
      },
      { 
        name: 'Sanath Deo', 
        type: 'Health Checkup', 
        time: '12:30 PM',
        age: 32,
        bloodGroup: 'O-',
        allergies: ['Shellfish'],
        currentDiseases: ['Diabetes Type II'],
        patientId: 'PAT002'
      },
      { 
        name: 'Loeara Phanj', 
        type: 'Report', 
        time: '01:00 PM',
        age: 28,
        bloodGroup: 'B+',
        allergies: ['None'],
        currentDiseases: ['Migraine'],
        patientId: 'PAT003'
      },
    ],
    appointmentRequests: [
      { name: 'Maria Sarafat', condition: 'Cold' },
      { name: 'Jhon Deo', condition: 'Over Sweating' }
    ]
  });

  useEffect(() => {
    // Fetch doctor data from backend API
    // fetch('/api/doctors/current')
    //   .then(response => response.json())
    //   .then(data => setDoctorData(data));
  }, []);

  const handleAppointmentAccept = (request) => {
    setDashboardData(prev => ({
      ...prev,
      appointmentRequests: prev.appointmentRequests.filter(r => r.name !== request.name),
      appointments: [...prev.appointments, { 
        name: request.name, 
        type: 'Pending', 
        time: 'Scheduled' 
      }]
    }));
  };

  const handleAppointmentReject = (request) => {
    setDashboardData(prev => ({
      ...prev,
      appointmentRequests: prev.appointmentRequests.filter(r => r.name !== request.name)
    }));
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const DynamicCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
  
    const generateCalendarDays = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startingDayOfWeek = firstDay.getDay();
      
      const calendarDays = [];
      const prevMonth = new Date(year, month, 0);
      for (let i = 0; i < startingDayOfWeek; i++) {
        calendarDays.push({
          date: prevMonth.getDate() - startingDayOfWeek + i + 1,
          month: 'prev',
          isToday: false
        });
      }
      
      for (let i = 1; i <= lastDay.getDate(); i++) {
        calendarDays.push({
          date: i,
          month: 'current',
          isToday: i === new Date().getDate() && 
                   month === new Date().getMonth() && 
                   year === new Date().getFullYear()
        });
      }
      
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
  
    useEffect(() => {
      setCalendarDays(generateCalendarDays(currentDate));
    }, [currentDate]);
  
    const goToPreviousMonth = () => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };
  
    const goToNextMonth = () => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };
  
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
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
    switch(activeTab) {
      case 'Dashboard':
        return (
          <>
            <div className="row mb-4 g-3">
              <div className="col-md-4">
                <div className="card bg-info text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Today's Appointments</div>
                      <div className="fs-4">{dashboardData.todayAppointments}</div>
                    </div>
                    <FontAwesomeIcon icon={faCalendar} size="2x" />
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="card bg-success text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Available Days</div>
                      <div className="fs-4">{doctorData.availableDays?.length}</div>
                    </div>
                    <FontAwesomeIcon icon={faCalendar} size="2x" />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card bg-primary text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Experience</div>
                      <div className="fs-4">{doctorData.yearsOfExperience} Years</div>
                    </div>
                    <FontAwesomeIcon icon={faUser} size="2x" />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-5 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 className="m-0">Today's Appointments</h5>
                    <button className="btn btn-sm btn-outline-primary">See All</button>
                  </div>
                  <div className="card-body">
                    {dashboardData.appointments.map((appointment, index) => (
                      <div 
                        key={index} 
                        className={`d-flex justify-content-between align-items-center mb-3 p-2 ${
                          selectedPatient?.patientId === appointment.patientId ? 'bg-light rounded' : ''
                        }`}
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

              <div className="col-md-7 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-white">
                    <h5 className="m-0">Patient Details</h5>
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
                            <small className="text-muted">Patient ID: {selectedPatient.patientId}</small>
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
                              <p className="mb-0">{selectedPatient.type}</p>
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
                            {selectedPatient.allergies.map((allergy, index) => (
                              <span key={index} className="badge bg-danger me-2 mb-2">
                                <FontAwesomeIcon icon={faAllergies} className="me-1" />
                                {allergy}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-3">
                          <small className="text-muted">Current Medical Conditions</small>
                          <div>
                            {selectedPatient.currentDiseases.map((disease, index) => (
                              <span key={index} className="badge bg-warning text-dark me-2 mb-2">
                                <FontAwesomeIcon icon={faSyringe} className="me-1" />
                                {disease}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="d-grid gap-2 d-md-flex mt-4">
                          <button className="btn btn-primary me-md-2">
                            <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                            View Full History
                          </button>
                          <button className="btn btn-outline-primary">
                            <FontAwesomeIcon icon={faComment} className="me-2" />
                            Send Message
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

            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-header bg-white">
                    <h5 className="m-0">Appointment Requests</h5>
                  </div>
                  <div className="card-body">
                    {dashboardData.appointmentRequests.map((request, index) => (
                      <div key={index} className="d-flex justify-content-between align-items-center mb-3">
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
                            ✓
                          </button>
                          <button 
                            className="btn btn-danger btn-sm me-2" 
                            onClick={() => handleAppointmentReject(request)}
                          >
                            ✗
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <DynamicCalendar />
              </div>
            </div>
          </>
        );
      case 'Profile':
      case 'Appointments':
      case 'My Patients':
      case 'Nursing Service':
      default:
        return <div className="text-center py-5">Content for {activeTab} is under development</div>;
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        <div className="col-md-2 bg-dark text-white" style={{ minHeight: '100vh', overflow: 'auto' }}>
          <div className="d-flex flex-column">
            <div className="text-center p-4 border-bottom border-secondary">
              <div className="rounded-circle bg-primary mx-auto d-flex justify-content-center align-items-center" 
                   style={{ width: '70px', height: '70px' }}>
                <FontAwesomeIcon icon={faUserCircle} size="3x" className="text-white" />
              </div>
              <div className="mt-3 fw-bold">{doctorData.fullName}</div>
              <div className="small text-light">{doctorData.specialization}</div>
            </div>

            <nav className="py-2">
              {[
                { key: 'Dashboard', icon: faHome },
                { key: 'Profile', icon: faUser },
                { key: 'Appointments', icon: faCalendar },
                { key: 'My Patients', icon: faUsers },
                { key: 'Nursing Service', icon: faNotesMedical },
                { key: 'Logout', icon: faSignOutAlt }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`d-flex align-items-center p-3 ${activeTab === item.key ? 'bg-primary' : ''}`}
                  style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
                  onClick={() => setActiveTab(item.key)}
                >
                  <FontAwesomeIcon icon={item.icon} className="me-3" />
                  <span>{item.key}</span>
                </div>
              ))}
            </nav>
          </div>
        </div>

        <div className="col-md-10 bg-light">
          <div className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
            <h4 className="m-0">Medical Practitioner Dashboard</h4>
            <div className="d-flex align-items-center gap-3">
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