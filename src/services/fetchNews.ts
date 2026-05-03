import { newsType } from './../types/news';
import api from './api';

export const getAllNews = async (): Promise<newsType[]> => {
  const response = await api.get<newsType[]>('/news');
  return response.data;
};
