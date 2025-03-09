import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome, faUser, faUsers, 
    faSignOutAlt, faClipboardList, 
    faCog, faUserShield, faPhoneAlt,
    faUserCircle, faCheck, faTimes,
    faPlus, faTrash, faUserPlus,
    faCamera, faSave, faEdit
} from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  
  const [adminData] = useState({
    adminInfo: {
      name: 'Ranjan Perera',
      id: 'SLA-2023-123',
      department: 'Administration',
      position: 'Senior Hospital Administrator',
      hospital: 'National Hospital of Sri Lanka',
      address: '123 Hospital Road, Colombo 10',
      phone: '077-1234567',
      email: 'admin@nationalhospital.lk'
    },
    staffStats: {
      doctors: 124,
      nurses: 248,
      admins: 18,
      technicians: 36,
      vacantPositions: 15
    },
    recentStaffAdded: [
      { 
        id: 'SLD-2023-789', 
        name: 'Dr. Amali Fonseka', 
        role: 'Cardiologist',
        department: 'Cardiology',
        joinDate: '05/02/2025', 
        status: 'Active' 
      },
      { 
        id: 'SLN-2023-567', 
        name: 'Kumari Bandara', 
        role: 'Head Nurse',
        department: 'Pediatrics',
        joinDate: '12/01/2025', 
        status: 'Active' 
      },
      { 
        id: 'SLT-2023-345', 
        name: 'Dinesh Pathirana', 
        role: 'Lab Technician',
        department: 'Pathology',
        joinDate: '20/01/2025', 
        status: 'Pending' 
      }
    ],
    pendingApprovals: [
      { 
        id: 1, 
        type: 'Leave Request', 
        requestedBy: 'Dr. Mohan Jayasinghe',
        department: 'Surgery',
        details: 'Annual leave request for 15-22 March 2025', 
        priority: 'Medium', 
        submitted: '01/03/2025' 
      },
      { 
        id: 2, 
        type: 'Equipment Purchase', 
        requestedBy: 'Dr. Samanthi Perera',
        department: 'Cardiology',
        details: 'New ECG machine request for cardiology ward', 
        priority: 'High', 
        submitted: '28/02/2025' 
      }
    ],
    systemAlerts: [
      { 
        id: 1, 
        description: 'System maintenance scheduled for Sunday, 9th March 2025, 2AM-5AM', 
        priority: 'High', 
        acknowledged: false 
      },
      { 
        id: 2, 
        description: 'Staff annual review submissions due by 15th March 2025', 
        priority: 'Medium', 
        acknowledged: false 
      }
    ]
  });

  // State for editable admin details
  const [adminDetails, setAdminDetails] = useState({
    name: adminData.adminInfo.name,
    address: adminData.adminInfo.address,
    phone: adminData.adminInfo.phone,
    email: adminData.adminInfo.email
  });

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleAlertAcknowledgment = (alertId) => {
    const updatedAlerts = adminData.systemAlerts.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: !alert.acknowledged } : alert
    );
  };

  const handleApprovalStatus = (index, status) => {
    alert(`Request ${adminData.pendingApprovals[index].type} has been ${status}`);
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real application, you would save this data to the server here
  };

  const menuItems = [
    { name: 'Dashboard', icon: faHome },
    { name: 'My Profile', icon: faUser },
    { name: 'Staff Management', icon: faUsers },
    { name: 'Logout', icon: faSignOutAlt }
  ];

  const renderDashboardContent = () => {
    return (
      <>
        <div className="row mb-4 g-3">
          <div className="col-md-3">
            <div className="card bg-primary text-white">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <div className="small">Total Staff</div>
                  <div className="fs-4">{adminData.staffStats.doctors + adminData.staffStats.nurses + adminData.staffStats.admins + adminData.staffStats.technicians}</div>
                </div>
                <FontAwesomeIcon icon={faUsers} size="2x" />
              </div>
            </div>
          </div>
          
          <div className="col-md-3">
            <div className="card bg-success text-white">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <div className="small">Doctors</div>
                  <div className="fs-4">{adminData.staffStats.doctors}</div>
                </div>
                <FontAwesomeIcon icon={faUser} size="2x" />
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-info text-white">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <div className="small">Nurses</div>
                  <div className="fs-4">{adminData.staffStats.nurses}</div>
                </div>
                <FontAwesomeIcon icon={faUser} size="2x" />
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-warning text-dark">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <div className="small">Vacant Positions</div>
                  <div className="fs-4">{adminData.staffStats.vacantPositions}</div>
                </div>
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-7 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="m-0">
                  <FontAwesomeIcon icon={faClipboardList} className="text-primary me-2" />
                  Pending Approvals
                </h5>
                <button className="btn btn-sm btn-outline-primary">
                  View All
                </button>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Type</th>
                        <th>Requested By</th>
                        <th>Department</th>
                        <th>Date</th>
                        <th>Priority</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminData.pendingApprovals.map((approval, index) => (
                        <tr key={index}>
                          <td>{approval.type}</td>
                          <td>{approval.requestedBy}</td>
                          <td>{approval.department}</td>
                          <td>{approval.submitted}</td>
                          <td>
                            <span className={`badge ${
                              approval.priority === 'High' ? 'bg-danger' : 
                              approval.priority === 'Medium' ? 'bg-warning' : 
                              'bg-info'
                            }`}>
                              {approval.priority}
                            </span>
                          </td>
                          <td>
                            <div className="btn-group">
                              <button 
                                className="btn btn-sm btn-success" 
                                onClick={() => handleApprovalStatus(index, 'approved')}
                              >
                                <FontAwesomeIcon icon={faCheck} />
                              </button>
                              <button 
                                className="btn btn-sm btn-danger" 
                                onClick={() => handleApprovalStatus(index, 'rejected')}
                              >
                                <FontAwesomeIcon icon={faTimes} />
                              </button>
                            </div>
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
                  <FontAwesomeIcon icon={faCog} className="text-primary me-2" />
                  System Alerts
                </h5>
                <button className="btn btn-sm btn-outline-primary">
                  Add Alert
                </button>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  {adminData.systemAlerts.map((alert) => (
                    <li key={alert.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          checked={alert.acknowledged}
                          onChange={() => handleAlertAcknowledgment(alert.id)}
                        />
                        <label className={`form-check-label ${alert.acknowledged ? 'text-decoration-line-through text-muted' : ''}`}>
                          {alert.description}
                        </label>
                      </div>
                      <span className={`badge ${
                        alert.priority === 'High' ? 'bg-danger' : 
                        alert.priority === 'Medium' ? 'bg-warning' : 
                        'bg-info'
                      }`}>
                        {alert.priority}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <h5 className="m-0">
              <FontAwesomeIcon icon={faUserPlus} className="text-primary me-2" />
              Recently Added Staff
            </h5>
            <button className="btn btn-sm btn-outline-primary">
              Add New Staff
            </button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Join Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminData.recentStaffAdded.map((staff, index) => (
                    <tr key={index}>
                      <td>{staff.id}</td>
                      <td>{staff.name}</td>
                      <td>{staff.role}</td>
                      <td>{staff.department}</td>
                      <td>{staff.joinDate}</td>
                      <td>
                        <span className={`badge ${
                          staff.status === 'Active' ? 'bg-success' : 
                          'bg-warning'
                        }`}>
                          {staff.status}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group">
                          <button className="btn btn-sm btn-outline-primary">
                            <FontAwesomeIcon icon={faUser} />
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderProfileContent = () => {
    return (
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Profile Settings</h4>
        </div>
        
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <img
                src={profileImage || "https://via.placeholder.com/200"}
                className="rounded-circle mb-3"
                alt="Profile"
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
              <button
                className="btn btn-primary"
                onClick={() => fileInputRef.current.click()}
              >
                <FontAwesomeIcon icon={faCamera} className="me-2" />
                Upload Photo
              </button>
            </div>

            <div className="col-md-8">
              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={adminDetails.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={adminDetails.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={adminDetails.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    value={adminDetails.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows="3"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Department</label>
                  <input
                    type="text"
                    className="form-control"
                    value={adminData.adminInfo.department}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Position</label>
                  <input
                    type="text"
                    className="form-control"
                    value={adminData.adminInfo.position}
                    disabled
                  />
                </div>

                <div className="d-flex justify-content-end gap-2">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setIsEditing(false)}
                      >
                        <FontAwesomeIcon icon={faTimes} className="me-2" />
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSave}
                      >
                        <FontAwesomeIcon icon={faSave} className="me-2" />
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}
                    >
                      <FontAwesomeIcon icon={faEdit} className="me-2" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderActiveTabContent = () => {
    switch(activeMenu) {
      case 'Dashboard':
        return renderDashboardContent();
      case 'My Profile':
        return renderProfileContent();
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
              <div className="position-relative mx-auto" style={{ width: '80px', height: '80px' }}>
                {profileImage ? (
                  <img
                    src={profileImage}
                    className="rounded-circle w-100 h-100"
                    alt="Profile"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="rounded-circle bg-primary w-100 h-100 d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon icon={faUserShield} size="2x" className="text-white" />
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="d-none"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="mt-3 fw-bold">{adminDetails.name}</div>
              <div className="small text-light">ID: {adminData.adminInfo.id}</div>
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
                  <div>IT Support:</div>
                  <div className="fw-bold">0112-789123</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-10 bg-light">
          <div className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
            <h4 className="m-0">
              {activeMenu === 'Dashboard' ? 'Administration Dashboard' : activeMenu}
            </h4>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="rounded-circle" 
                    style={{ width: '32px', height: '32px', objectFit: 'cover' }} 
                  />
                ) : (
                  <FontAwesomeIcon icon={faUserCircle} size="lg" />
                  
                )}
                <span>{adminDetails.name}</span>
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

export default AdminDashboard;