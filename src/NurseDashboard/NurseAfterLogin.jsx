import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faUser, faUserMd, faPills, 
  faCalendarCheck, faSignOutAlt, faNotesMedical, 
  faUserInjured, faProcedures, faHeartbeat, 
  faClipboardList, faStethoscope, faPhoneAlt,
  faChartLine, faEdit, faPlus, faTimes, faCheck
} from '@fortawesome/free-solid-svg-icons';

const NurseDashboard = () => {
  // Active menu state
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  // Sample data for nurse dashboard
  const [nurseData, setNurseData] = useState({
    nurseInfo: {
      name: 'Sarah Johnson',
      id: 'N-2023-456',
      department: 'General Medicine',
      shift: 'Morning (7AM - 3PM)',
      supervisor: 'Dr. Williams'
    },
    patientVitals: [
      { id: 'P-1001', name: 'John Smith', room: '201-A', bp: '130/85', temp: '98.6°F', pulse: '78 bpm', respRate: '16/min', o2Sat: '97%', lastChecked: '8:30 AM', status: 'Stable' },
      { id: 'P-1002', name: 'Mary Johnson', room: '203-B', bp: '142/90', temp: '99.2°F', pulse: '88 bpm', respRate: '18/min', o2Sat: '95%', lastChecked: '8:45 AM', status: 'Needs Attention' },
      { id: 'P-1003', name: 'Robert Davis', room: '205-A', bp: '118/75', temp: '98.4°F', pulse: '72 bpm', respRate: '15/min', o2Sat: '98%', lastChecked: '9:15 AM', status: 'Stable' },
      { id: 'P-1004', name: 'Patricia Wilson', room: '208-B', bp: '160/95', temp: '100.1°F', pulse: '92 bpm', respRate: '20/min', o2Sat: '93%', lastChecked: '9:30 AM', status: 'Critical' }
    ],
    medicationSchedule: [
      { patient: 'John Smith', room: '201-A', medication: 'Atorvastatin 20mg', time: '10:00 AM', status: 'Pending' },
      { patient: 'Mary Johnson', room: '203-B', medication: 'Metformin 500mg', time: '10:00 AM', status: 'Pending' },
      { patient: 'Robert Davis', room: '205-A', medication: 'Lisinopril 10mg', time: '10:00 AM', status: 'Pending' },
      { patient: 'Patricia Wilson', room: '208-B', medication: 'Furosemide 40mg', time: '10:00 AM', status: 'Pending' },
      { patient: 'John Smith', room: '201-A', medication: 'Metoprolol 25mg', time: '2:00 PM', status: 'Pending' },
      { patient: 'Mary Johnson', room: '203-B', medication: 'Amlodipine 5mg', time: '2:00 PM', status: 'Pending' }
    ],
    appointments: [
      { time: '11:00 AM', doctor: 'Dr. Roberts', patient: 'John Smith', type: 'Post-Op Check', room: 'Exam 2' },
      { time: '11:30 AM', doctor: 'Dr. Williams', patient: 'Mary Johnson', type: 'Blood Pressure Follow-up', room: 'Exam 1' },
      { time: '1:15 PM', doctor: 'Dr. Chen', patient: 'Patricia Wilson', type: 'Fever Evaluation', room: 'Exam 3' }
    ],
    tasks: [
      { id: 1, description: 'Change IV for Patricia Wilson in Room 208-B', priority: 'High', completed: false },
      { id: 2, description: 'Collect blood samples for lab work from Room 201-A and 205-A', priority: 'Medium', completed: false },
      { id: 3, description: 'Document patient education for new diabetic medications', priority: 'Medium', completed: false },
      { id: 4, description: 'Restock supply cart for afternoon shift', priority: 'Low', completed: true }
    ]
  });

  // Handle medication status change
  const handleMedicationStatus = (index, status) => {
    const updatedMedications = [...nurseData.medicationSchedule];
    updatedMedications[index].status = status;
    setNurseData({
      ...nurseData,
      medicationSchedule: updatedMedications
    });
  };

  // Handle task completion toggle
  const handleTaskCompletion = (taskId) => {
    const updatedTasks = nurseData.tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setNurseData({
      ...nurseData,
      tasks: updatedTasks
    });
  };

  // Menu items
  const menuItems = [
    { name: 'Dashboard', icon: faHome },
    { name: 'Profile', icon: faUser },
    { name: 'Channel Doctors', icon: faUserMd },
    { name: 'Pharmacy Service', icon: faPills },
    { name: 'Appointments', icon: faCalendarCheck },
    { name: 'Patients', icon: faUserInjured },
    { name: 'Logout', icon: faSignOutAlt }
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 d-flex flex-column bg-white shadow-sm p-0" style={{ minHeight: '100vh' }}>
          <div className="text-center p-4 border-bottom">
            <div className="rounded-circle bg-primary d-inline-flex justify-content-center align-items-center" style={{ width: '60px', height: '60px' }}>
              <FontAwesomeIcon icon={faStethoscope} size="2x" className="text-white" />
            </div>
            <div className="mt-2 fw-bold">Nurse Portal</div>
          </div>
          
          <div className="d-flex flex-column flex-grow-1">
            {menuItems.map((item, index) => (
              <div 
                key={index}
                className={`d-flex align-items-center p-3 ${activeMenu === item.name ? 'bg-light border-start border-primary border-3' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveMenu(item.name)}
              >
                <FontAwesomeIcon 
                  icon={item.icon} 
                  className={`me-3 ${activeMenu === item.name ? 'text-primary' : 'text-secondary'}`} 
                />
                <span className={activeMenu === item.name ? 'text-primary fw-medium' : 'text-dark'}>
                  {item.name}
                </span>
              </div>
            ))}
            <div className="mt-auto"></div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="col-md-10 bg-light p-0">
          {/* Header */}
          <div className="bg-dark text-white d-flex justify-content-between align-items-center p-3">
            <div className="d-flex align-items-center">
              <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center me-2" style={{ width: '40px', height: '40px' }}>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div>
                <div className="fw-bold">{nurseData.nurseInfo.name}</div>
                <div className="small">ID: {nurseData.nurseInfo.id} | {nurseData.nurseInfo.department}</div>
              </div>
            </div>
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faPhoneAlt} className="me-2" />
              Emergency Contact
            </button>
          </div>
          
          {/* Dashboard Content */}
          <div className="p-4">
            {/* Quick Stats Row */}
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="card bg-primary text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-title">Assigned Patients</h6>
                      <h2 className="mb-0">{nurseData.patientVitals.length}</h2>
                    </div>
                    <FontAwesomeIcon icon={faUserInjured} size="2x" />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-warning text-dark">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-title">Medications Due</h6>
                      <h2 className="mb-0">{nurseData.medicationSchedule.filter(med => med.status === 'Pending').length}</h2>
                    </div>
                    <FontAwesomeIcon icon={faPills} size="2x" />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-success text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-title">Appointments Today</h6>
                      <h2 className="mb-0">{nurseData.appointments.length}</h2>
                    </div>
                    <FontAwesomeIcon icon={faCalendarCheck} size="2x" />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-danger text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-title">Critical Patients</h6>
                      <h2 className="mb-0">{nurseData.patientVitals.filter(patient => patient.status === 'Critical').length}</h2>
                    </div>
                    <FontAwesomeIcon icon={faHeartbeat} size="2x" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Patient Vitals Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <FontAwesomeIcon icon={faHeartbeat} className="text-primary me-2" />
                  Patient Vitals
                </h5>
                <button className="btn btn-sm btn-outline-primary">
                  <FontAwesomeIcon icon={faEdit} className="me-1" />
                  Update Vitals
                </button>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Patient</th>
                        <th>Room</th>
                        <th>BP</th>
                        <th>Temp</th>
                        <th>Pulse</th>
                        <th>Resp</th>
                        <th>O₂ Sat</th>
                        <th>Last Check</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nurseData.patientVitals.map((patient, index) => (
                        <tr key={index}>
                          <td>{patient.name}</td>
                          <td>{patient.room}</td>
                          <td>{patient.bp}</td>
                          <td>{patient.temp}</td>
                          <td>{patient.pulse}</td>
                          <td>{patient.respRate}</td>
                          <td>{patient.o2Sat}</td>
                          <td>{patient.lastChecked}</td>
                          <td>
                            <span className={`badge ${
                              patient.status === 'Stable' ? 'bg-success' : 
                              patient.status === 'Needs Attention' ? 'bg-warning' : 
                              'bg-danger'
                            }`}>
                              {patient.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="row mb-4">
              {/* Medication Schedule Card */}
              <div className="col-md-7">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                      <FontAwesomeIcon icon={faPills} className="text-primary me-2" />
                      Medication Schedule
                    </h5>
                    <div>
                      <button className="btn btn-sm btn-outline-primary me-2">
                        <FontAwesomeIcon icon={faChartLine} className="me-1" />
                        View All
                      </button>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Patient</th>
                            <th>Room</th>
                            <th>Medication</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {nurseData.medicationSchedule.map((med, index) => (
                            <tr key={index}>
                              <td>{med.patient}</td>
                              <td>{med.room}</td>
                              <td>{med.medication}</td>
                              <td>{med.time}</td>
                              <td>
                                <span className={`badge ${
                                  med.status === 'Pending' ? 'bg-warning' : 
                                  med.status === 'Administered' ? 'bg-success' : 
                                  'bg-danger'
                                }`}>
                                  {med.status}
                                </span>
                              </td>
                              <td>
                                {med.status === 'Pending' && (
                                  <>
                                    <button 
                                      className="btn btn-sm btn-success me-1" 
                                      onClick={() => handleMedicationStatus(index, 'Administered')}
                                    >
                                      <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                    <button 
                                      className="btn btn-sm btn-danger" 
                                      onClick={() => handleMedicationStatus(index, 'Skipped')}
                                    >
                                      <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                  </>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Task List Card */}
              <div className="col-md-5">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                      <FontAwesomeIcon icon={faClipboardList} className="text-primary me-2" />
                      Task List
                    </h5>
                    <button className="btn btn-sm btn-outline-primary">
                      <FontAwesomeIcon icon={faPlus} className="me-1" />
                      Add Task
                    </button>
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      {nurseData.tasks.map((task) => (
                        <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              id={`task-${task.id}`} 
                              checked={task.completed}
                              onChange={() => handleTaskCompletion(task.id)}
                            />
                            <label 
                              className={`form-check-label ${task.completed ? 'text-decoration-line-through text-muted' : ''}`} 
                              htmlFor={`task-${task.id}`}
                            >
                              {task.description}
                            </label>
                          </div>
                          <span className={`badge ${
                            task.priority === 'High' ? 'bg-danger' : 
                            task.priority === 'Medium' ? 'bg-warning' : 
                            'bg-info'
                          }`}>
                            {task.priority}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Appointments Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <FontAwesomeIcon icon={faCalendarCheck} className="text-primary me-2" />
                  Today's Appointments
                </h5>
                <button className="btn btn-sm btn-outline-primary">
                  <FontAwesomeIcon icon={faChartLine} className="me-1" />
                  View Schedule
                </button>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Time</th>
                        <th>Doctor</th>
                        <th>Patient</th>
                        <th>Type</th>
                        <th>Room</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nurseData.appointments.map((appointment, index) => (
                        <tr key={index}>
                          <td>{appointment.time}</td>
                          <td>{appointment.doctor}</td>
                          <td>{appointment.patient}</td>
                          <td>{appointment.type}</td>
                          <td>{appointment.room}</td>
                          <td>
                            <select className="form-select form-select-sm">
                              <option>Scheduled</option>
                              <option>Checked In</option>
                              <option>In Progress</option>
                              <option>Completed</option>
                              <option>Cancelled</option>
                            </select>
                          </td>
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

export default NurseDashboard;