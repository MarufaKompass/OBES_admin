import axiosInstance from '@/axiosInstance/axios.config';
import axios from 'axios';

//Login 
export const loginUser = async (userData) => {
  const response = await axios.post('https://api.obesitybes.com/public/api/login', userData);
  return response;
};

//category 


export const CategoryView = async () => {
  const response = await axiosInstance.get('/public/api/qcatview');
  return response?.data?.data;
};


export const addCategory = async (addCatData) => {
  const response = await axiosInstance.post('/public/api/qcatstore', addCatData);
  return response;
};


//category 

export const FaqView = async () => {
  const response = await axiosInstance.get('/public/api/faqview');
  return response?.data?.data;
};


export const addFaq = async (addFaqData) => {
  const response = await axiosInstance.post('/public/api/faqstore', addFaqData);
  return response;
};


//user



export const userProfile = async () => {
  const response = await axiosInstance.get('/public/api/adminprofile');
  return response.data?.data;
};




export const allUserView = async () => {
  const response = await axiosInstance.get('/public/api/userx');
  return response.data?.data;
};

//question
export const allQuestionView = async () => {
  const response = await axiosInstance.get('/public/api/quesview');
  return response.data?.data;
};

export const addQuestion = async (addCatData) => {
  const response = await axiosInstance.post('/public/api/ques', addCatData);
  return response;
};
