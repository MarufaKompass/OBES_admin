import axiosInstance from '@/axiosInstance/axios.config';
import axios from 'axios';

//Login 
export const loginUser = async (userData) => {
  const response = await axios.post('https://api.obesitybes.com/public/api/login', userData);
  return response;
};

export const adminProfile = async () => {
  const response = await axiosInstance.get('/public/api/admin/profile');
  return response.data?.data;
};


//category 


export const CategoryView = async (role) => {
  const response = await axiosInstance.get(`/public/api/${role}/qcatview`);
  return response?.data?.data;
};


export const addCategory = async ({addCatData,role}) => {
  const response = await axiosInstance.post(`/public/api/${role}/qcatstore`, addCatData);
  return response;
};


//faq 

export const FaqView = async (role) => {
  const response = await axiosInstance.get(`/public/api/${role}/faqview`);
  return response?.data?.data;
};


export const addFaq = async ({addFaqData,role}) => {
  const response = await axiosInstance.post(`/public/api/${role}/faqstore`, addFaqData);
  return response;
};

//user

export const allUserView = async (role) => {
  const response = await axiosInstance.get(`/public/api/${role}/users`);
  return response.data?.data;
};

export const allUserAnsList = async (role) => {
  const response = await axiosInstance.get(`/public/api/${role}/anslistuser`);
  return response.data?.data;
};

//question

export const allQuestionView = async (role) => {
  const response = await axiosInstance.get(`/public/api/${role}/quesview`);
  return response.data?.data;
};

export const addQuestion = async ({addQuesData,role}) => {
  const response = await axiosInstance.post(`/public/api/${role}/ques`, addQuesData);
  return response;
};

export const editQuestion = async ({editQuesData,role,qid}) => {
  const response = await axiosInstance.put(`/public/api/${role}/ques/${qid}`, editQuesData);
  return response;
};

export const deleteQuestion = async ({role,qid}) => { 
  const response = await axiosInstance.delete(`/public/api/${role}/ques/${qid}`);
  return response;
};
export const editCategory = async ({editCategoryData,role,catid}) => {
  const response = await axiosInstance.put(`/public/api/${role}/qcat/${catid}`, editCategoryData);
  return response;
};

export const deleteCategory = async ({role,catid}) => {
  const response = await axiosInstance.delete(`/public/api/${role}/qcat/${catid}`);
  return response;
};

// Video
export const videoList = async (role) => {
  const response = await axiosInstance.get(`/public/api/${role}/youtubelinkview`);
  return response?.data?.data;
}
export const videoDoctorList = async (role) => {
  const response = await axiosInstance.get(`/public/api/${role}/youtubedoctorview`);
  return response?.data?.data;
}

export const addVideo = async ({addVideoData,role}) => {
  const response = await axiosInstance.post(`/public/api/${role}/youtubelinkstore`, addVideoData);
  return response;
};
export const addDoctorVideo = async ({addDoctorVideoData,role}) => {
  const response = await axiosInstance.post(`/public/api/${role}/youtubedoctorstore`, addDoctorVideoData);
  return response;
};

export const editVideo = async ({editVideoData,role,id}) => {
  const response = await axiosInstance.put(`/public/api/${role}/youtubelinkupdate/${id}`,editVideoData);
  return response;
};
export const editDoctorVideo = async ({editVideoDoctorData,role,id}) => {
  const response = await axiosInstance.put(`/public/api/${role}/youtubedoctorupdate/${id}`,editVideoDoctorData);
  return response;
};

export const deletedVideo = async ({role,id}) => { 
  const response = await axiosInstance.delete(`/public/api/${role}/youtubelinkdelete/${id}`);
  return response;
};
export const deletedDoctorVideo = async ({role,id}) => { 
  const response = await axiosInstance.delete(`/public/api/${role}/youtubedoctordelete/${id}`);
  return response;
};

// stepsList

export const stepsList = async (role) => {
  const response = await axiosInstance.get(`/public/api/${role}/my7stepview`);
  return response?.data?.data;
}

// newsletter
export const addNewsletter = async ({addNewsletterData,role}) => {
  const response = await axiosInstance.post(`/public/api/${role}/newsletter`, addNewsletterData);
  return response;
};

export const newsletterList = async (role) => {
  const response = await axiosInstance.get(`/public/api/${role}/newsletterview`);
  return response?.data?.data;
}

export const deleteNewsletter = async ({role,id}) => {
  const response = await axiosInstance.delete(`/public/api/${role}/newsletter/${id}`);
  return response;
};

export const updateNewsletter = async ({updateNewsletterData,role,id}) => {
  const response = await axiosInstance.put(`/public/api/${role}/newsletter/${id}`, updateNewsletterData);
  return response;
};

// Diet Charts

export const dietChartsList = async (role) => {
  const response = await axiosInstance.get(`/public/api/${role}/dietchartview`);
  return response?.data?.data;
}


export const addDietCharts = async ({addDietChartData,role}) => {
  const response = await axiosInstance.post(`/public/api/${role}/dietchartstore`, addDietChartData);
  return response;
};


export const deleteDietChart = async ({role,id}) => {
  const response = await axiosInstance.delete(`/public/api/${role}/dietchart/${id}`);
  return response;
};

export const editDietChart = async ({editDietData,role,id}) => {
  const response = await axiosInstance.put(`/public/api/${role}/dietchartup/${id}`, editDietData);
  return response;
};



//Expert

export const expertsList = async (role) => {
  const response = await axiosInstance.get(`/public/api/${role}/expertlist`);
  return response?.data?.data;
}


export const addExpertsList = async ({addExpertsData,role}) => {
  const response = await axiosInstance.post(`/public/api/${role}/expert`, addExpertsData);
  return response;
};

export const editExpert = async ({editExpertData,role,id}) => {
  const response = await axiosInstance.put(`/public/api/${role}/expert/${id}`, editExpertData);
  return response;
};


export const deleteExpert = async ({role,id}) => {
  const response = await axiosInstance.delete(`/public/api/${role}/expert/${id}`);
  return response;
};

//csv


export const csvExport = async (role) => {
  const response = await axiosInstance.get(`/public/api/${role}/qansjson/export/csv`);
  return response;
};

//Education

export const educationList = async (role) => {
  const response = await axiosInstance.get(`/public/api/${role}/obeseduv`);
  return response?.data?.data;
}


export const addEducation = async ({addEducationData,role}) => {
  const response = await axiosInstance.post(`/public/api/${role}/obesedustore`, addEducationData);
  return response;
};


export const editEducation = async ({editEducationData,role,id}) => {
  const response = await axiosInstance.put(`/public/api/${role}/obeseduupdate/${id}`, editEducationData);
  return response;
};


export const deleteEducation = async ({role,id}) => {
  const response = await axiosInstance.delete(`/public/api/${role}/obesedudelete/${id}`);
  return response;
};


