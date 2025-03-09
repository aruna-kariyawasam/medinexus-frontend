import React, { useState, useEffect } from "react";
import { Table, Container, Alert } from "react-bootstrap";

const DoctorAppointmentPage = () => {
  // State to manage appointments
  const [appointments, setAppointments] = useState([]);

  // Simulate fetching appointments from an API
  useEffect(() => {
    // Replace this with an actual API call to fetch appointments
    const fetchAppointments = async () => {
      // Example data
      const data = [
        {
          id: 1,
          patientName: "Avinoah Kr",
          phoneNumber: "123-456-7890",
          email: "avinoah@example.com",
          date: "2024-10-05",
          time: "12:00 PM",
        },
        {
          id: 2,
          patientName: "GreatStock",
          phoneNumber: "987-654-3210",
          email: "greatstock@example.com",
          date: "2024-09-26",
          time: "11:00 AM",
        },
        // Add more appointments as needed
      ];

      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Upcoming Appointments</h2>

      {appointments.length === 0 ? (
        <Alert variant="info" className="text-center">
          There are no upcoming appointments.
        </Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Patient Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment.id}>
                <td>{index + 1}</td>
                <td>{appointment.patientName}</td>
                <td>{appointment.phoneNumber}</td>
                <td>{appointment.email}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default DoctorAppointmentPage;