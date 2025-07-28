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


export const addVideo = async ({addVideoData,role}) => {
  const response = await axiosInstance.post(`/public/api/${role}/youtubelinkstore`, addVideoData);
  return response;
};


export const editVideo = async ({editVideoData,role,id}) => {
  const response = await axiosInstance.put(`/public/api/${role}/youtubelinkupdate/${id}`,editVideoData);
  return response;
};
