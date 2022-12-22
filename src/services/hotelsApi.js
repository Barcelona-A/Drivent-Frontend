import api from './api';

export async function getHotelsList(token) {
  const response = await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
        
  return response.data;
};

export async function getHotelsRoomsList(token) {
  const response = await api.get('/hotels/rooms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
