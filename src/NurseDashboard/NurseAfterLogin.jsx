import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome, faUser, faUserMd, faPills, 
    faCalendarCheck, faSignOutAlt, faNotesMedical, 
    faUserInjured, faProcedures, faHeartbeat, 
    faClipboardList, faStethoscope, faPhoneAlt,
    faChartLine, faEdit, faPlus, faTimes, faCheck,
    faUserCircle, faCalendarDay, faBriefcaseMedical,
    faChevronLeft, faChevronRight, faAllergies, faSyringe,
    faFileAlt, faComment
} from '@fortawesome/free-solid-svg-icons';

const NurseDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [nurseData] = useState({
    id: 'SLN-2023-456',
    fullName: 'Nayana Perera',
    gender: 'Female',
    dateOfBirth: '1990-05-15',
    specialization: 'General Medicine',
    medicalLicenseNumber: 'SLMC-12345',
    yearsOfExperience: 8,
    email: 'nayana.perera@nationalhospital.lk',
    phoneNumber: '077-1234567',
    address: '123 Galle Road, Colombo 03',
    username: 'nayana.perera',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    todayAppointments: [
      {
        id: 'APT-001',
        patientName: 'Kamala Herath',
        date: '2023-12-15',
        time: '10:00 AM',
        type: 'Routine Checkup',
        status: 'Pending',
        age: 45,
        bloodGroup: 'A+',
        allergies: ['Penicillin'],
        currentCondition: 'Hypertension'
      },
      {
        id: 'APT-002',
        patientName: 'Priyantha Fernando',
        date: '2023-12-16',
        time: '02:30 PM',
        type: 'Post-Operative Care',
        status: 'Confirmed',
        age: 32,
        bloodGroup: 'O-',
        allergies: ['None'],
        currentCondition: 'Diabetes'
      }
    ],
    appointmentRequests: [
      {
        id: 'REQ-001',
        patientName: 'Sunil Perera',
        requestedDate: '2023-12-17',
        condition: 'Fever'
      }
    ]
  });

  const menuItems = [
    { name: 'Dashboard', icon: faHome },
    { name: 'Profile', icon: faUser },
    { name: 'Channel Doctors', icon: faUserMd },
    { name: 'Pharmacy Service', icon: faPills },
    { name: 'Appointments', icon: faCalendarCheck },
    { name: 'Patients', icon: faUserInjured },
    { name: 'Logout', icon: faSignOutAlt }
  ];

  const handlePatientSelect = (appointment) => {
    setSelectedPatient(appointment);
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
          <button className="btn btn-link text-dark" onClick={goToPreviousMonth}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <h5 className="card-title mb-0">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h5>
          <button className="btn btn-link text-dark" onClick={goToNextMonth}>
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
            <div className="row mb-4 g-3">
              <div className="col-md-3">
                <div className="card bg-primary text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Years of Experience</div>
                      <div className="fs-4">{nurseData.yearsOfExperience}</div>
                    </div>
                    <FontAwesomeIcon icon={faBriefcaseMedical} size="2x" />
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <div className="card bg-info text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Available Days</div>
                      <div className="fs-4">{nurseData.availableDays.length}</div>
                    </div>
                    <FontAwesomeIcon icon={faCalendarDay} size="2x" />
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card bg-warning text-dark">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Pending Appointments</div>
                      <div className="fs-4">
                        {nurseData.todayAppointments.filter(a => a.status === 'Pending').length}
                      </div>
                    </div>
                    <FontAwesomeIcon icon={faCalendarCheck} size="2x" />
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card bg-success text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Total Appointments</div>
                      <div className="fs-4">{nurseData.todayAppointments.length}</div>
                    </div>
                    <FontAwesomeIcon icon={faClipboardList} size="2x" />
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
                    {nurseData.todayAppointments.map((appointment) => (
                      <div 
                        key={appointment.id}
                        className={`d-flex justify-content-between align-items-center mb-3 p-2 ${
                          selectedPatient?.id === appointment.id ? 'bg-light rounded' : ''
                        }`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handlePatientSelect(appointment)}
                      >
                        <div className="d-flex align-items-center">
                          <div className="bg-light rounded-circle p-2 me-3">
                            <FontAwesomeIcon icon={faUser} />
                          </div>
                          <div>
                            <h6 className="mb-1">{appointment.patientName}</h6>
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
                            <h4 className="mb-1">{selectedPatient.patientName}</h4>
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
                            {selectedPatient.allergies.map((allergy, index) => (
                              <span key={index} className="badge bg-danger me-2 mb-2">
                                <FontAwesomeIcon icon={faAllergies} className="me-1" />
                                {allergy}
                              </span>
                            ))}
                            {selectedPatient.allergies.length === 0 && 'None reported'}
                          </div>
                        </div>

                        <div className="d-grid gap-2 d-md-flex mt-4">
                          <button className="btn btn-primary me-md-2">
                            <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                            View Full History
                          </button>
                          <button className="btn btn-outline-primary">
                            <FontAwesomeIcon icon={faComment} className="me-2" />
                            Send Update
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
                    {nurseData.appointmentRequests.map((request, index) => (
                      <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                          <div className="bg-light rounded-circle p-2 me-3">
                            <FontAwesomeIcon icon={faUser} />
                          </div>
                          <div>
                            <h6 className="mb-1">{request.patientName}</h6>
                            <small className="text-muted">{request.condition}</small>
                          </div>
                        </div>
                        <div>
                          <button className="btn btn-success btn-sm me-2">
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                          <button className="btn btn-danger btn-sm">
                            <FontAwesomeIcon icon={faTimes} />
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
        <div className="col-md-2 bg-dark text-white" style={{ minHeight: '100vh', overflow: 'auto' }}>
          <div className="d-flex flex-column">
            <div className="text-center p-4 border-bottom border-secondary">
              <div className="rounded-circle bg-primary mx-auto d-flex justify-content-center align-items-center" 
                   style={{ width: '70px', height: '70px' }}>
                <FontAwesomeIcon icon={faStethoscope} size="2x" className="text-white" />
              </div>
              <div className="mt-3 fw-bold">Nurse Portal</div>
              <div className="small text-light">ID: {nurseData.id}</div>
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

        <div className="col-md-10 bg-light">
          <div className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
            <h4 className="m-0">National Hospital Nursing Dashboard</h4>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faUserCircle} size="lg" />
                <span>{nurseData.fullName}</span>
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

export default NurseDashboard;