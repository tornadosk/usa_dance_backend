// services/ymService.ts
import axios from 'axios';

const YM_API_BASE_URL = 'https://ws.yourmembership.com';

interface YMAuthResponse {
  success: boolean;
  token: string;
  userId: string;
  UserID: string;
  SessionID: string;
  // other YM response data...
}

export async function authenticateYM(username: string, password: string): Promise<YMAuthResponse | null> {
  try {
    const response = await axios.post(`${YM_API_BASE_URL}/auth`, {
      username,
      password,
    });

    if (response.data && response.data.success) {
      return response.data as YMAuthResponse;
    }
    return null;
  } catch (error) {
    console.error('YM API error:', error);
    return null;
  }
}

export async function fetchUserInfo(token: string) {
  try {
    const response = await axios.get(`${YM_API_BASE_URL}/userinfo`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw new Error('Unable to fetch user info.');
  }
}
