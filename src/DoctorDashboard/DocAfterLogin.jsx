import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, faUserPlus, faCalendar, faEnvelope, 
  faBell, faEllipsisV, faPhone, faFileAlt, 
  faComment, faHome, faClipboardList, faWallet, 
  faUser, faSignOutAlt, faChevronLeft, faChevronRight,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';

const MedicalDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalPatients: 2000,
    todayPatients: 68,
    todayAppointments: 85,
    appointments: [
      { name: 'M.J. Mical', type: 'Health Checkup', time: 'On Going' },
      { name: 'Sanath Deo', type: 'Health Checkup', time: '12:30 PM' },
      { name: 'Loeara Phanj', type: 'Report', time: '01:00 PM' },
      { name: 'Komola Haris', type: 'Common Cold', time: '01:30 PM' }
    ],
    appointmentRequests: [
      { name: 'Maria Sarafat', condition: 'Cold' },
      { name: 'Jhon Deo', condition: 'Over Sweating' }
    ],
    nextPatient: {
      name: 'Sanath Deo',
      patientId: '022090902005',
      dob: '15 January 1989',
      sex: 'Male',
      weight: '59 Kg',
      regDate: '10 Dec-2021',
      medicalHistory: ['Asthma', 'Hypertension', 'Fever']
    }
  });

  useEffect(() => {
    const socket = new WebSocket('wss://example-medical-dashboard-socket.com');
    return () => socket.close();
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
  }

  const handleAppointmentReject = (request) => {
    setDashboardData(prev => ({
      ...prev,
      appointmentRequests: prev.appointmentRequests.filter(r => r.name !== request.name)
    }));
  }

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

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-md-2 bg-dark text-white" style={{ minHeight: '100vh', overflow: 'auto' }}>
          <div className="d-flex flex-column">
            <div className="text-center p-4 border-bottom border-secondary">
              <div className="rounded-circle bg-primary mx-auto d-flex justify-content-center align-items-center" 
                   style={{ width: '70px', height: '70px' }}>
                <FontAwesomeIcon icon={faUserCircle} size="3x" className="text-white" />
              </div>
              <div className="mt-3 fw-bold">Dr. Kasun Perera</div>
              <div className="small text-light">MBBs, FCPS, MD Medicine</div>
            </div>

            <nav className="py-2">
              {[
                { key: 'Dashboard', icon: faHome },
                { key: 'Appointment', icon: faClipboardList },
                { key: 'Payment', icon: faWallet },
                { key: 'Profile', icon: faUser },
                { key: 'Logout', icon: faSignOutAlt }
              ].map((item, index) => (
                <div key={index} 
                     className="d-flex align-items-center p-3"
                     style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={item.icon} className="me-3" />
                  <span>{item.key}</span>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-10 bg-light">
          {/* Header */}
          <div className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
            <h4 className="m-0">Medical Practitioner Dashboard</h4>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faUserCircle} size="lg" />
                <span>Dr. Kasun Perera</span>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-4">
            {/* Key Metrics */}
            <div className="row mb-4 g-3">
              <div className="col-md-4">
                <div className="card bg-primary text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Total Patients</div>
                      <div className="fs-4">{dashboardData.totalPatients}+</div>
                    </div>
                    <FontAwesomeIcon icon={faUsers} size="2x" />
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="card bg-success text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Today's Patients</div>
                      <div className="fs-4">{dashboardData.todayPatients}</div>
                    </div>
                    <FontAwesomeIcon icon={faUserPlus} size="2x" />
                  </div>
                </div>
              </div>

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
            </div>

            {/* Appointments Section */}
            <div className="row mb-4">
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 className="m-0">Today's Appointments</h5>
                    <button className="btn btn-sm btn-outline-primary">See All</button>
                  </div>
                  <div className="card-body">
                    {dashboardData.appointments.map((appointment, index) => (
                      <div key={index} className="d-flex justify-content-between align-items-center mb-3">
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

              {/* Next Patient */}
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-white">
                    <h5 className="m-0">Next Patient Details</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-light rounded-circle p-3 me-3">
                        <FontAwesomeIcon icon={faUser} size="2x" />
                      </div>
                      <div>
                        <h5 className="mb-1">{dashboardData.nextPatient.name}</h5>
                        <small className="text-muted">ID: {dashboardData.nextPatient.patientId}</small>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <small className="text-muted">D.O.B</small>
                        <p>{dashboardData.nextPatient.dob}</p>
                      </div>
                      <div className="col-md-6">
                        <small className="text-muted">Sex</small>
                        <p>{dashboardData.nextPatient.sex}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">Medical History</small>
                      <div>
                        {dashboardData.nextPatient.medicalHistory.map((condition, index) => (
                          <span key={index} className="badge bg-primary me-2 mb-1">
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="d-grid gap-2 d-md-flex">
                      <button className="btn btn-primary me-md-2">
                        <FontAwesomeIcon icon={faPhone} className="me-2" />
                        Call Patient
                      </button>
                      <button className="btn btn-outline-primary">
                        <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                        Documents
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Requests and Calendar */}
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
                          <button className="btn btn-success btn-sm me-2" onClick={() => handleAppointmentAccept(request)}>
                            ✓
                          </button>
                          <button className="btn btn-danger btn-sm me-2" onClick={() => handleAppointmentReject(request)}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;