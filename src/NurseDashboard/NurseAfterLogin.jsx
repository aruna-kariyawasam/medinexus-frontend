import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome, faUser, faUserMd, faPills, 
    faCalendarCheck, faSignOutAlt, faNotesMedical, 
    faUserInjured, faProcedures, faHeartbeat, 
    faClipboardList, faStethoscope, faPhoneAlt,
    faChartLine, faEdit, faPlus, faTimes, faCheck,
    faUserCircle
  } from '@fortawesome/free-solid-svg-icons';
const NurseDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  // Sri Lankan context data
  const [nurseData, setNurseData] = useState({
    nurseInfo: {
      name: 'Nayana Perera',
      id: 'SLN-2023-456',
      department: 'General Medicine',
      shift: 'Morning (7AM - 3PM)',
      supervisor: 'Dr. Rajapakse',
      hospital: 'National Hospital of Sri Lanka'
    },
    patientVitals: [
      { 
        id: 'P-1001', 
        name: 'Sandaruwan Silva', 
        age: 58,
        nic: '651234567V',
        room: 'Ward A-201', 
        bp: '130/85', 
        temp: '98.6°F', 
        pulse: '78 bpm', 
        respRate: '16/min', 
        o2Sat: '97%', 
        lastChecked: '8:30 AM', 
        status: 'Stable',
        diagnosis: 'Diabetes Management'
      },
      { 
        id: 'P-1002', 
        name: 'Kamala Herath', 
        age: 65,
        nic: '551234567V',
        room: 'Ward B-203', 
        bp: '142/90', 
        temp: '99.2°F', 
        pulse: '88 bpm', 
        respRate: '18/min', 
        o2Sat: '95%', 
        lastChecked: '8:45 AM', 
        status: 'Needs Attention',
        diagnosis: 'Hypertension'
      },
      { 
        id: 'P-1003', 
        name: 'Priyantha Fernando', 
        age: 42,
        nic: '801234567V',
        room: 'Ward C-205', 
        bp: '118/75', 
        temp: '98.4°F', 
        pulse: '72 bpm', 
        respRate: '15/min', 
        o2Sat: '98%', 
        lastChecked: '9:15 AM', 
        status: 'Stable',
        diagnosis: 'Post-Operative Care'
      },
      { 
        id: 'P-1004', 
        name: 'Nirmala Ratnayake', 
        age: 72,
        nic: '481234567V',
        room: 'ICU-208', 
        bp: '160/95', 
        temp: '100.1°F', 
        pulse: '92 bpm', 
        respRate: '20/min', 
        o2Sat: '93%', 
        lastChecked: '9:30 AM', 
        status: 'Critical',
        diagnosis: 'Pneumonia'
      }
    ],
    medicationSchedule: [
      { 
        patient: 'Sandaruwan Silva', 
        room: 'Ward A-201', 
        medication: 'Atorvastatin 20mg (Zivast)', 
        time: '10:00 AM', 
        status: 'Pending' 
      },
      { 
        patient: 'Kamala Herath', 
        room: 'Ward B-203', 
        medication: 'Metformin 500mg (Glycomet)', 
        time: '10:00 AM', 
        status: 'Pending' 
      },
      { 
        patient: 'Priyantha Fernando', 
        room: 'Ward C-205', 
        medication: 'Lisinopril 10mg (Zestril)', 
        time: '10:00 AM', 
        status: 'Pending' 
      },
      { 
        patient: 'Nirmala Ratnayake', 
        room: 'ICU-208', 
        medication: 'Furosemide 40mg (Lasix)', 
        time: '10:00 AM', 
        status: 'Pending' 
      }
    ],
    appointments: [
      { 
        time: '11:00 AM', 
        doctor: 'Dr. Wijesinghe', 
        patient: 'Sandaruwan Silva', 
        type: 'Post-Op Check', 
        room: 'Exam 2' 
      },
      { 
        time: '11:30 AM', 
        doctor: 'Dr. Jayawardena', 
        patient: 'Kamala Herath', 
        type: 'Blood Pressure Follow-up', 
        room: 'Exam 1' 
      },
      { 
        time: '1:15 PM', 
        doctor: 'Dr. Subramaniam', 
        patient: 'Nirmala Ratnayake', 
        type: 'Fever Evaluation', 
        room: 'Exam 3' 
      }
    ],
    tasks: [
      { 
        id: 1, 
        description: 'Change IV for Nirmala Ratnayake in ICU-208', 
        priority: 'High', 
        completed: false 
      },
      { 
        id: 2, 
        description: 'Collect blood samples for dengue NS1 antigen test', 
        priority: 'Medium', 
        completed: false 
      },
      { 
        id: 3, 
        description: 'Document patient education for diabetes management', 
        priority: 'Medium', 
        completed: false 
      },
      { 
        id: 4, 
        description: 'Restock leptospirosis treatment kits', 
        priority: 'Low', 
        completed: true 
      }
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

  const handleTaskCompletion = (taskId) => {
    const updatedTasks = nurseData.tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setNurseData({
      ...nurseData,
      tasks: updatedTasks
    });
  };

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
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-md-2 bg-dark text-white" style={{ minHeight: '100vh', overflow: 'auto' }}>
          <div className="d-flex flex-column">
            <div className="text-center p-4 border-bottom border-secondary">
              <div className="rounded-circle bg-primary mx-auto d-flex justify-content-center align-items-center" 
                   style={{ width: '70px', height: '70px' }}>
                <FontAwesomeIcon icon={faStethoscope} size="2x" className="text-white" />
              </div>
              <div className="mt-3 fw-bold">Nurse Portal</div>
              <div className="small text-light">ID: {nurseData.nurseInfo.id}</div>
            </div>

            <nav className="py-2">
              {menuItems.map((item, index) => (
                <div key={index} 
                     className={`d-flex align-items-center p-3 ${activeMenu === item.name ? 'bg-primary' : ''}`}
                     style={{ cursor: 'pointer' }}
                     onClick={() => setActiveMenu(item.name)}>
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

        {/* Main Content */}
        <div className="col-md-10 bg-light">
          {/* Header */}
          <div className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
            <h4 className="m-0">National Hospital Nursing Dashboard</h4>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faUserCircle} size="lg" />
                <span>{nurseData.nurseInfo.name}</span>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-4">
            {/* Quick Stats */}
            <div className="row mb-4 g-3">
              <div className="col-md-3">
                <div className="card bg-primary text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Assigned Patients</div>
                      <div className="fs-4">{nurseData.patientVitals.length}</div>
                    </div>
                    <FontAwesomeIcon icon={faUserInjured} size="2x" />
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <div className="card bg-warning text-dark">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Medications Due</div>
                      <div className="fs-4">{nurseData.medicationSchedule.filter(med => med.status === 'Pending').length}</div>
                    </div>
                    <FontAwesomeIcon icon={faPills} size="2x" />
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card bg-success text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Appointments</div>
                      <div className="fs-4">{nurseData.appointments.length}</div>
                    </div>
                    <FontAwesomeIcon icon={faCalendarCheck} size="2x" />
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card bg-danger text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">Critical Patients</div>
                      <div className="fs-4">{nurseData.patientVitals.filter(patient => patient.status === 'Critical').length}</div>
                    </div>
                    <FontAwesomeIcon icon={faHeartbeat} size="2x" />
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Vitals Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="m-0">
                  <FontAwesomeIcon icon={faHeartbeat} className="text-primary me-2" />
                  Patient Vitals
                </h5>
                <button className="btn btn-sm btn-outline-primary">
                  <FontAwesomeIcon icon={faEdit} className="me-2" />
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

            {/* Medication & Tasks Row */}
            <div className="row mb-4">
              <div className="col-md-7 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 className="m-0">
                      <FontAwesomeIcon icon={faPills} className="text-primary me-2" />
                      Medication Schedule
                    </h5>
                    <button className="btn btn-sm btn-outline-primary">
                      <FontAwesomeIcon icon={faChartLine} className="me-2" />
                      View All
                    </button>
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
                                  <div className="btn-group">
                                    <button 
                                      className="btn btn-sm btn-success" 
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
                                  </div>
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

              <div className="col-md-5 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 className="m-0">
                      <FontAwesomeIcon icon={faClipboardList} className="text-primary me-2" />
                      Task List
                    </h5>
                    <button className="btn btn-sm btn-outline-primary">
                      <FontAwesomeIcon icon={faPlus} className="me-2" />
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
                              checked={task.completed}
                              onChange={() => handleTaskCompletion(task.id)}
                            />
                            <label className={`form-check-label ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
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
                <h5 className="m-0">
                  <FontAwesomeIcon icon={faCalendarCheck} className="text-primary me-2" />
                  Today's Appointments
                </h5>
                <button className="btn btn-sm btn-outline-primary">
                  <FontAwesomeIcon icon={faChartLine} className="me-2" />
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