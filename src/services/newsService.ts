import axios from 'axios';
import { Article, NewsResponse, NewsFilter } from '../types/news';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = process.env.REACT_APP_NEWS_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Api-Key': API_KEY,
  },
});

export const getTopHeadlines = async (filters: NewsFilter): Promise<Article[]> => {
  try {
    // Prepare params, excluding empty sources
    const params = {
      ...filters,
      country: filters.sources?.length ? undefined : 'us', // If no sources selected, use US news
      sources: filters.sources?.length ? filters.sources.join(',') : undefined,
    };

    const response = await api.get<NewsResponse>('/top-headlines', { params });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
};

export const getEverything = async (filters: NewsFilter): Promise<Article[]> => {
  try {
    // Prepare params, excluding empty sources
    const params = {
      ...filters,
      sources: filters.sources?.length ? filters.sources.join(',') : undefined,
      language: 'en', // Default to English news
    };

    const response = await api.get<NewsResponse>('/everything', { params });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const getSources = async () => {
  try {
    const response = await api.get('/sources');
    return response.data.sources;
  } catch (error) {
    console.error('Error fetching sources:', error);
    throw error;
  }
};
