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
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';


const MedicalDashboard = () => {
  // State for managing dashboard data
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

  // WebSocket connection for real-time updates (simulated)
  useEffect(() => {
    // Simulating a WebSocket connection
    const socket = new WebSocket('wss://example-medical-dashboard-socket.com');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // Handle different types of real-time updates
      switch(data.type) {
        case 'NEW_APPOINTMENT':
          setDashboardData(prev => ({
            ...prev,
            todayAppointments: prev.todayAppointments + 1,
            appointments: [...prev.appointments, data.appointment]
          }));
          break;
        
        case 'APPOINTMENT_REQUEST':
          setDashboardData(prev => ({
            ...prev,
            appointmentRequests: [...prev.appointmentRequests, data.request]
          }));
          break;
        
        case 'PATIENT_UPDATE':
          setDashboardData(prev => ({
            ...prev,
            nextPatient: data.patient
          }));
          break;
      }
    };

    return () => socket.close();
  }, []);

  // Handlers for interactive components
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
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
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
          <div className="row">
            {daysOfWeek.map(day => (
              <div key={day} className="col text-center fw-bold text-muted">
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
                      ? 'bg-primary text-white' 
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
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Navigation */}
        <div className="col-2 bg-white vh-100 shadow-sm">
          <div className="d-flex align-items-center p-3 border-bottom">
            <img 
              src="/api/placeholder/64/64" 
              alt="Doctor Profile" 
              className="rounded-circle me-3"
              style={{width: '64px', height: '64px'}}
            />
            <div>
              <h6 className="mb-0 fw-bold">{}</h6>
              <small className="text-muted">MBBs, FCPS, MD Medicine</small>
            </div>
          </div>
          
          <nav className="nav flex-column mt-3">
            {[
              { name: 'Dashboard', icon: faHome },
              { name: 'Appointment', icon: faClipboardList },
              { name: 'Payment', icon: faWallet },
              { name: 'Profile', icon: faUser },
              { name: 'Logout', icon: faSignOutAlt }
            ].map((item) => (
              <a 
                key={item.name} 
                href="#" 
                className="nav-link text-dark py-2 px-3 d-flex align-items-center"
              >
                <FontAwesomeIcon icon={item.icon} className="me-2" />
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Main Dashboard Content */}
        <div className="col-10 bg-light p-4">
          {/* Top Header with Search and Icons */}
          <div className="d-flex justify-content-end align-items-center mb-4">
            <div className="d-flex align-items-center">
              <button className="btn btn-link text-dark me-3" onClick={() => alert('Message inbox')}>
                <FontAwesomeIcon icon={faEnvelope} />
              </button>
              <button className="btn btn-link text-dark me-3" onClick={() => alert('Notifications')}>
                <FontAwesomeIcon icon={faBell} />
              </button>
              <input 
                type="text" 
                placeholder="Search" 
                className="form-control rounded-pill me-3"
                style={{width: '200px'}}
              />
              <button className="btn btn-link text-dark" onClick={() => alert('More options')}>
                <FontAwesomeIcon icon={faEllipsisV} />
              </button>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="row mb-4">
            <div className="col-4">
              <div className="card" role="button" onClick={() => alert('Total Patients Details')}>
                <div className="card-body d-flex align-items-center">
                  <div className="bg-primary-subtle rounded-circle p-3 me-3">
                    <FontAwesomeIcon icon={faUsers} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-muted mb-1">Total Patient</p>
                    <h4 className="mb-0">{dashboardData.totalPatients}+</h4>
                    <small className="text-muted">Till Today</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card" role="button" onClick={() => alert('Today\'s Patients Details')}>
                <div className="card-body d-flex align-items-center">
                  <div className="bg-success-subtle rounded-circle p-3 me-3">
                    <FontAwesomeIcon icon={faUserPlus} className="text-success" />
                  </div>
                  <div>
                    <p className="text-muted mb-1">Today Patient</p>
                    <h4 className="mb-0">{dashboardData.todayPatients}</h4>
                    <small className="text-muted">21 Dec-2021</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card" role="button" onClick={() => alert('Today\'s Appointments Details')}>
                <div className="card-body d-flex align-items-center">
                  <div className="bg-warning-subtle rounded-circle p-3 me-3">
                    <FontAwesomeIcon icon={faCalendar} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-muted mb-1">Today Appointments</p>
                    <h4 className="mb-0">{dashboardData.todayAppointments}</h4>
                    <small className="text-muted">21 Dec-2021</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments and Next Patient Section */}
          <div className="row mb-4">
            {/* Today's Appointments */}
            <div className="col-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Today Appointment</h5>
                </div>
                <div className="card-body">
                  {dashboardData.appointments.map((appointment) => (
                    <div 
                      key={appointment.name} 
                      className="d-flex justify-content-between align-items-center mb-3"
                      role="button"
                      onClick={() => alert(`Appointment details for ${appointment.name}`)}
                    >
                      <div className="d-flex align-items-center">
                        <img 
                          src="/api/placeholder/40/40" 
                          alt={appointment.name} 
                          className="rounded-circle me-3"
                          style={{width: '40px', height: '40px'}}
                        />
                        <div>
                          <h6 className="mb-1">{appointment.name}</h6>
                          <small className="text-muted">{appointment.type}</small>
                        </div>
                      </div>
                      <span className="text-primary">{appointment.time}</span>
                    </div>
                  ))}
                  <button className="btn btn-link w-100 text-center">See All</button>
                </div>
              </div>
            </div>

            {/* Next Patient Details */}
            <div className="col-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Next Patient Details</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src="/api/placeholder/64/64" 
                      alt="Patient" 
                      className="rounded-circle me-3"
                      style={{width: '64px',
                      height: '64px'}}/>
                    <div>
                      <h5 className="mb-1">{dashboardData.nextPatient.name}</h5>
                      <small className="text-muted">Patient ID: {dashboardData.nextPatient.patientId}</small>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <small className="text-muted">D.O.B</small>
                      <p>{dashboardData.nextPatient.dob}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Sex</small>
                      <p>{dashboardData.nextPatient.sex}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Weight</small>
                      <p>{dashboardData.nextPatient.weight}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Reg. Date</small>
                      <p>{dashboardData.nextPatient.regDate}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <small className="text-muted d-block mb-2">Patient History</small>
                    <div>
                      {dashboardData.nextPatient.medicalHistory.map((condition) => (
                        <span key={condition} className={`badge me-2 ${
                          condition === 'Asthma' ? 'bg-primary' : 
                          condition === 'Hypertension' ? 'bg-danger' : 
                          'bg-warning'
                        }`}>
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="d-flex">
                    <button className="btn btn-primary me-2 flex-grow-1" onClick={() => alert('Calling patient')}>
                      <FontAwesomeIcon icon={faPhone} className="me-2" />
                      (988) 556-0102
                    </button>
                    <button className="btn btn-outline-primary me-2 flex-grow-1" onClick={() => alert('View Documents')}>
                      <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                      Document
                    </button>
                    <button className="btn btn-outline-primary flex-grow-1" onClick={() => alert('Start Chat')}>
                      <FontAwesomeIcon icon={faComment} className="me-2" />
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Requests and Calendar */}
          <div className="row">
            {/* Appointment Requests */}
            <div className="col-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Appointment Request</h5>
                </div>
                <div className="card-body">
                  {dashboardData.appointmentRequests.map((request) => (
                    <div key={request.name} className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center">
                        <img 
                          src="/api/placeholder/40/40" 
                          alt={request.name} 
                          className="rounded-circle me-3"
                          style={{width: '40px', height: '40px'}}
                        />
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
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => alert(`Details for ${request.name}`)}
                        >
                          📝
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-link w-100 text-center">See All</button>
                </div>
              </div>
            </div>

            {/* Dynamic Calendar */}
            <div className="col-6">
              <DynamicCalendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;