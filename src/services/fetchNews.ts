import { NewsType } from './../types/news';
import api from './api';

export const getAllNews = async (): Promise<NewsType[]> => {
  const response = await api.get<NewsType[]>('/news');
  return response.data;
};
