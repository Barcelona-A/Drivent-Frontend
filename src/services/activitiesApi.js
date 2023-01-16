import api from './api';

export async function getActivitiesList(token, date = null) {
  const apiUrl = date ? `/activities?activityDate=${date}` : '/activities';
  
  return (await api.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })).data;
};

export async function postActivitesBooking(body, token) {
  const response = await api.post('/activities', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

