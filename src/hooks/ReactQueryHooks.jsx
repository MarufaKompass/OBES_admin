import axiosInstance from '@/axiosInstance/axios.config';
import axios from 'axios';

//Login 
export const loginUser = async (userData) => {
  const response = await axios.post('https://api.obesitybes.com/public/api/login', userData);
  return response;
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

export const userProfile = async () => {
  const response = await axiosInstance.get('/public/api/admin/adminprofile');
  return response.data?.data;
};


export const allUserView = async () => {
  const response = await axiosInstance.get('/public/api/userx');
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
