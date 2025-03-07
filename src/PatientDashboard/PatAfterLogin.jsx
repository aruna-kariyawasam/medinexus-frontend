import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faUser, faUserMd, faUserNurse, faPills, 
  faCalendarCheck, faSignOutAlt, faUserCircle, faHeartbeat, 
  faNotesMedical, faCalendarAlt, faEdit, faPlus, faPhoneAlt,
  faEnvelope, faIdCard, faMapMarkerAlt, faTint, faExclamationTriangle,
  faStethoscope, faAddressBook, faLock, faLanguage, faUnlockAlt,
  faUserFriends, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [isSinhala, setIsSinhala] = useState(false);

  // Translation dictionary
  const translations = {
    Dashboard: { en: 'Dashboard', si: 'උපකරණ පුවරුව' },
    MyProfile: { en: 'My Profile', si: 'මගේ පැතිකඩ' },
    Appointments: { en: 'Appointments', si: 'නිළ රැස්වීම්' },
    MedicalRecords: { en: 'Medical Records', si: 'වෛද්ය වාර්තා' },
    Prescriptions: { en: 'Prescriptions', si: 'ප්රතිකාර නියම' },
    FindSpecialists: { en: 'Find Specialists', si: 'විශේෂඥයින් සොයන්න' },
    NurseServices: { en: 'Nurse Services', si: 'හෙද සේවා' },
    AccountSettings: { en: 'Account Settings', si: 'ගිණුම් සැකසුම්' },
    Logout: { en: 'Logout', si: 'පිටවීම' },
    Gender: { en: 'Gender', si: 'ලිංගභේදය' },
    DOB: { en: 'Date of Birth', si: 'උපන් දිනය' },
    EmergencyContact: { en: 'Emergency Contact', si: 'අනතුරු ඇඟවීම් සම්බන්ධතා' },
    BloodGroup: { en: 'Blood Group', si: 'රුධිර වර්ගය' },
    Allergies: { en: 'Allergies', si: 'ඇලර්ජි' },
    MedicalConditions: { en: 'Medical Conditions', si: 'සෞඛ්ය තත්ත්වයන්' },
    Emergency: { en: 'Emergency', si: 'හදිසි' },
    Address: { en: 'Address', si: 'ලිපිනය' },
    Edit: { en: 'Edit', si: 'සංස්කරණය' },
    NIC: { en: 'NIC', si: 'ජා.හැ.අ.' },
    VitalStats: { en: 'Vital Statistics', si: 'ජීවන තත්ව සංඛ්යාන' },
    Update: { en: 'Update', si: 'යාවත්කාලීන කරන්න' },
    Height: { en: 'Height', si: 'උස' },
    Weight: { en: 'Weight', si: 'බර' },
    BMI: { en: 'BMI', si: 'BMI' },
    BloodPressure: { en: 'Blood Pressure', si: 'රුධිර පීඩනය' },
    Temperature: { en: 'Temperature', si: 'උෂ්ණත්වය' },
    PulseRate: { en: 'Pulse Rate', si: 'නාඩි වේගය' },
    RespirationRate: { en: 'Respiration Rate', si: 'ශ්වසන වේගය' },
    OxygenSaturation: { en: 'Oxygen Saturation', si: 'ඔක්සිජන් සන්තෘප්තිය' },
    UpcomingAppointments: { en: 'Upcoming Appointments', si: 'ඉදිරි හමුවීම්' },
    NewAppointment: { en: 'New Appointment', si: 'නව හමුවීම' },
    Doctor: { en: 'Doctor', si: 'වෛද්යවරයා' },
    DateAndTime: { en: 'Date & Time', si: 'දිනය සහ වේලාව' },
    Status: { en: 'Status', si: 'තත්ත්වය' },
    Actions: { en: 'Actions', si: 'ක්‍රියාමාර්ග' },
    Confirmed: { en: 'Confirmed', si: 'තහවුරු විය' },
    Pending: { en: 'Pending', si: 'අපේක්ෂිත' },
    Medication: { en: 'Medication', si: 'ඖෂධ' },
    Instructions: { en: 'Instructions', si: 'උපදෙස්' },
    PrescribedBy: { en: 'Prescribed By', si: 'නියම කළේ' },
    Date: { en: 'Date', si: 'දිනය' },
    ViewAll: { en: 'View All', si: 'සියල්ල බලන්න' },
    AccountInfo: { en: 'Account Information', si: 'ගිණුම් තොරතුරු' },
    Username: { en: 'Username', si: 'පරිශීලක නාමය' },
    Password: { en: 'Password', si: 'මුරපදය' },
    Email: { en: 'Email', si: 'විද්‍යුත් තැපෑල' },
    PhoneNumber: { en: 'Phone Number', si: 'දුරකථන අංකය' },
    Relationship: { en: 'Relationship', si: 'සම්බන්ධතාවය' },
    ContactNumber: { en: 'Contact Number', si: 'සම්බන්ධතා අංකය' },
    PersonalInformation: { en: 'Personal Information', si: 'පුද්ගලික තොරතුරු' },
    MedicalInformation: { en: 'Medical Information', si: 'වෛද්‍ය තොරතුරු' },
    SecurityWarning: { en: 'For security reasons, we recommend changing your password every 90 days.', si: 'ආරක්ෂක හේතූන් මත, අපි දින 90 කට වරක් ඔබේ මුරපදය වෙනස් කිරීමට නිර්දේශ කරමු.' },
    LabResults: { en: 'Lab Results', si: 'පරීක්ෂණ ප්‍රතිඵල' },
    NewResults: { en: 'New Results', si: 'නව ප්‍රතිඵල' },
    ImagingReports: { en: 'Imaging Reports', si: 'රූප ගත කිරීම් වාර්තා' },
    NewReports: { en: 'New Reports', si: 'නව වාර්තා' },
    SurgicalHistory: { en: 'Surgical History', si: 'ශල්ය ඉතිහාසය' },
    Procedure: { en: 'Procedure', si: 'ක්රියා පටිපාටිය' }
  };

  // Patient data with bilingual support
  const [patientData] = useState({
    personalDetails: {
      id: 'LKPT-2024-001',
      fullName: { en: 'Nayana Perera', si: 'නයන පෙරේරා' },
      gender: { en: 'Female', si: 'ගැහැණු' },
      dateOfBirth: '1991-05-15',
      email: 'nayana.perera@gmail.com',
      phoneNumber: '077-1234567',
      homeAddress: { 
        en: '123 Galle Road, Colombo 03', 
        si: 'ගාල්ල පාර 123, කොළඹ 03' 
      },
      nic: '199115012345',
      username: 'nayana.perera'
    },
    medicalDetails: {
      bloodGroup: 'B+',
      allergies: [
        { en: 'Penicillin', si: 'පෙනිසිලින්' },
        { en: 'Dust', si: 'දූවිලි' }
      ],
      conditions: [
        { en: 'Diabetes', si: 'දියවැඩියාව' },
        { en: 'Hypertension', si: 'අධි රුධිර පීඩනය' }
      ]
    },
    emergencyContact: {
      name: { en: 'Ranjith Bandara', si: 'රංජිත් බණ්ඩාර' },
      relationship: { en: 'Husband', si: 'සැමි' },
      phone: '077-7654321'
    },
    vitalStats: {
      height: { en: '168 cm', si: '168 සෙ.මී.' },
      weight: { en: '65 kg', si: '65 කි.ග්‍රෑ.' },
      bloodPressure: { en: '120/80 mmHg', si: '120/80 mmHg' },
      bmi: { en: '23.0 (Normal)', si: '23.0 (සාමාන්‍ය)' },
      temperature: { en: '98.6°F', si: '98.6°F' },
      pulseRate: { en: '72 bpm', si: '72 bpm' },
      respirationRate: { en: '16 breaths/min', si: '16 ශ්වසන/මිනිත්තු' },
      oxygenSaturation: { en: '98%', si: '98%' }
    },
    appointments: [
      { 
        doctor: { en: 'Dr. Silva (Cardiologist)', si: 'ඩො. සිල්වා (හෘද වෛද්ය)' }, 
        date: '2024-03-15 10:00',
        status: { en: 'Confirmed', si: 'තහවුරු විය' }
      },
      {
        doctor: { en: 'Dr. Perera (Primary Care)', si: 'ඩො. පෙරේරා (ප්‍රාථමික සත්කාර)' },
        date: '2024-03-22 14:30',
        status: { en: 'Pending', si: 'අපේක්ෂිත' }
      }
    ],
    prescriptions: [
      {
        medication: { en: 'Metformin 500mg', si: 'මෙට්ෆෝමින් 500mg' },
        instructions: { en: 'Twice daily with meals', si: 'දිනපතා දෙවරක් ආහාර සමග' },
        prescribedBy: { en: 'Dr. Silva', si: 'ඩො. සිල්වා' },
        date: '2024-02-15'
      }
    ]
  });

  const t = (key) => translations[key]?.[isSinhala ? 'si' : 'en'] || key;

  const menuItems = [
    { key: 'Dashboard', icon: faHome },
    { key: 'MyProfile', icon: faUser },
    { key: 'Appointments', icon: faCalendarCheck },
    { key: 'MedicalRecords', icon: faNotesMedical },
    { key: 'Prescriptions', icon: faPills },
    { key: 'FindSpecialists', icon: faUserMd },
    { key: 'NurseServices', icon: faUserNurse },
    { key: 'AccountSettings', icon: faLock },
    { key: 'Logout', icon: faSignOutAlt }
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
                <FontAwesomeIcon icon={faUserCircle} size="3x" className="text-white" />
              </div>
              <div className="mt-3 fw-bold">
                {patientData.personalDetails.fullName[isSinhala ? 'si' : 'en']}
              </div>
              <div className="small text-light">
                {t('NIC')}: {patientData.personalDetails.nic}
              </div>
            </div>

            <nav className="py-2">
              {menuItems.map((item, index) => (
                <div key={index} 
                     className={`d-flex align-items-center p-3 ${activeMenu === item.key ? 'bg-primary' : ''}`}
                     style={{ cursor: 'pointer' }}
                     onClick={() => setActiveMenu(item.key)}>
                  <FontAwesomeIcon icon={item.icon} className="me-3" />
                  <span>{t(item.key)}</span>
                </div>
              ))}
            </nav>

            <div className="p-3 border-top border-secondary mt-auto">
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faPhoneAlt} className="me-3" />
                <div className="small">
                  <div>{t('Emergency')}:</div>
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
            <h4 className="m-0">
              {isSinhala ? 'ශ්රී ලංකා රෝගී ප්රවේශ පුවරුව' : 'Sri Lanka Patient Portal'}
            </h4>
            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-outline-primary" onClick={() => setIsSinhala(!isSinhala)}>
                <FontAwesomeIcon icon={faLanguage} className="me-2" />
                {isSinhala ? 'English' : 'සිංහල'}
              </button>
              <div className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faUserCircle} size="lg" />
                <span>{patientData.personalDetails.fullName[isSinhala ? 'si' : 'en']}</span>
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
                    <div className="small">
                    <Link to='/appointment'>{t('Appointments')}</Link>
                    </div>
                      <div className="fs-4">{patientData.appointments.length}</div>
                    </div>
                    <FontAwesomeIcon icon={faCalendarAlt} size="2x" />
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <div className="card bg-success text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">{t('Prescriptions')}</div>
                      <div className="fs-4">{patientData.prescriptions.length}</div>
                    </div>
                    <FontAwesomeIcon icon={faPills} size="2x" />
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card bg-info text-white">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">{t('BloodGroup')}</div>
                      <div className="fs-4">{patientData.medicalDetails.bloodGroup}</div>
                    </div>
                    <FontAwesomeIcon icon={faTint} size="2x" />
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card bg-warning text-dark">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="small">{t('Allergies')}</div>
                      <div className="fs-4">{patientData.medicalDetails.allergies.length}</div>
                    </div>
                    <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Information Row */}
            <div className="row mb-4">
              {/* Personal Details Card */}
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 className="m-0">
                      <FontAwesomeIcon icon={faIdCard} className="text-primary me-2" />
                      {t('PersonalInformation')}
                    </h5>
                    <button className="btn btn-sm btn-outline-primary">
                      <FontAwesomeIcon icon={faEdit} className="me-2" />
                      {t('Edit')}
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="small text-muted">{t('NIC')}</div>
                        <div>{patientData.personalDetails.nic}</div>
                      </div>
                      <div className="col-md-6">
                        <div className="small text-muted">{t('Gender')}</div>
                        <div>{patientData.personalDetails.gender[isSinhala ? 'si' : 'en']}</div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="small text-muted">{t('DOB')}</div>
                        <div>{new Date(patientData.personalDetails.dateOfBirth).toLocaleDateString()}</div>
                      </div>
                      <div className="col-md-6">
                        <div className="small text-muted">{t('Email')}</div>
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon icon={faEnvelope} className="text-muted me-2" />
                          {patientData.personalDetails.email}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="small text-muted">{t('PhoneNumber')}</div>
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon icon={faPhoneAlt} className="text-muted me-2" />
                          {patientData.personalDetails.phoneNumber}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="small text-muted">{t('Address')}</div>
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-muted me-2" />
                          {patientData.personalDetails.homeAddress[isSinhala ? 'si' : 'en']}
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
                      {t('MedicalInformation')}
                    </h5>
                    <button className="btn btn-sm btn-outline-primary">
                      <FontAwesomeIcon icon={faEdit} className="me-2" />
                      {t('Edit')}
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="small text-muted">{t('BloodGroup')}</div>
                        <div>{patientData.medicalDetails.bloodGroup}</div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="small text-muted">{t('Allergies')}</div>
                      <div>
                        {patientData.medicalDetails.allergies.map((allergy, index) => (
                          <span key={index} className="badge bg-danger me-2 mb-1">
                            {allergy[isSinhala ? 'si' : 'en']}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="small text-muted">{t('MedicalConditions')}</div>
                      <div>
                        {patientData.medicalDetails.conditions.map((condition, index) => (
                          <span key={index} className="badge bg-warning text-dark me-2 mb-1">
                            {condition[isSinhala ? 'si' : 'en']}
                          </span>
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
                      {t('EmergencyContact')}
                    </h5>
                    <button className="btn btn-sm btn-outline-primary">
                      <FontAwesomeIcon icon={faEdit} className="me-2" />
                      {t('Edit')}
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <div className="small text-muted">{t('EmergencyContact')}</div>
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon icon={faUserFriends} className="text-muted me-2" />
                          {patientData.emergencyContact.name[isSinhala ? 'si' : 'en']}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="small text-muted">{t('Relationship')}</div>
                        <div>{patientData.emergencyContact.relationship[isSinhala ? 'si' : 'en']}</div>
                      </div>
                      <div className="col-md-6">
                        <div className="small text-muted">{t('ContactNumber')}</div>
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon icon={faPhoneAlt} className="text-muted me-2" />
                          {patientData.emergencyContact.phone}
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
                      {t('AccountInfo')}
                    </h5>
                    <button className="btn btn-sm btn-outline-primary">
                      <FontAwesomeIcon icon={faEdit} className="me-2" />
                      {t('Edit')}
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="small text-muted">{t('Username')}</div>
                        <div>{patientData.personalDetails.username}</div>
                      </div>
                      <div className="col-md-6">
                        <div className="small text-muted">{t('Password')}</div>
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
                          {t('SecurityWarning')}
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
                  {t('VitalStats')}
                </h5>
                <button className="btn btn-sm btn-outline-primary">
                  <FontAwesomeIcon icon={faEdit} className="me-2" />
                  {t('Update')}
                </button>
              </div>
              <div className="card-body">
                <div className="row">
                  {Object.entries(patientData.vitalStats).map(([key, value], index) => (
                    <div key={index} className="col-md-3 mb-3">
                      <div className="card h-100">
                        <div className="card-body p-3">
                          <div className="small text-muted">
                            {t(key.charAt(0).toUpperCase() + key.slice(1))}
                          </div>
                          <div className="fw-bold">{value[isSinhala ? 'si' : 'en']}</div>
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
                  {t('UpcomingAppointments')}
                </h5>
                <button className="btn btn-sm btn-primary">
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  {t('NewAppointment')}
                </button>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>{t('Doctor')}</th>
                        <th>{t('DateAndTime')}</th>
                        <th>{t('Status')}</th>
                        <th>{t('Actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patientData.appointments.map((appointment, index) => (
                        <tr key={index}>
                          <td>{appointment.doctor[isSinhala ? 'si' : 'en']}</td>
                          <td>{new Date(appointment.date).toLocaleString()}</td>
                          <td>
                            <span className={`badge ${appointment.status.en === 'Confirmed' ? 
                              'bg-success' : 'bg-warning text-dark'}`}>
                              {appointment.status[isSinhala ? 'si' : 'en']}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-secondary me-2">
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Prescriptions Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="m-0">
                  <FontAwesomeIcon icon={faPills} className="text-primary me-2" />
                  {t('Prescriptions')}
                </h5>
                <button className="btn btn-sm btn-outline-primary">
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  {t('ViewAll')}
                </button>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>{t('Medication')}</th>
                        <th>{t('Instructions')}</th>
                        <th>{t('PrescribedBy')}</th>
                        <th>{t('Date')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patientData.prescriptions.map((prescription, index) => (
                        <tr key={index}>
                          <td>{prescription.medication[isSinhala ? 'si' : 'en']}</td>
                          <td>{prescription.instructions[isSinhala ? 'si' : 'en']}</td>
                          <td>{prescription.prescribedBy[isSinhala ? 'si' : 'en']}</td>
                          <td>{new Date(prescription.date).toLocaleDateString()}</td>
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