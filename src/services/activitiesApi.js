import api from './api';

export async function getActivitiesList(token) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};
