import axios from 'axios';

// This service handles doctor document uploads
export const uploadDoctorFiles = async (doctorId, files) => {
  const formData = new FormData();
  
  // Add files to the form data
  if (files.certification) {
    formData.append('certification', files.certification);
  }
  
  if (files.profilePicture) {
    formData.append('profilePicture', files.profilePicture);
  }
  
  if (files.otherDocuments) {
    formData.append('otherDocuments', files.otherDocuments);
  }
  
  try {
    const response = await axios.post(`/api/doctors/${doctorId}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};