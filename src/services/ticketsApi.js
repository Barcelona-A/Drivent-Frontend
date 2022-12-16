import api from './api';

export async function sendTicket(ticketData, token) {
  const response = await api.post('/tickets', ticketData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
        
  return response.data;
}
