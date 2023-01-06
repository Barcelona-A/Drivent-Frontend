import api from './api';

export async function signInGitHub(body) {
  const response = await api.post('/auth/sign-in-github', body);
  return response.data;
};
