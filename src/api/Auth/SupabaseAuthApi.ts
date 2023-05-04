import {apiClient} from '..';

type SignUpParams = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

interface Session {
  provider_token?: string | null;
  access_token: string;
  /**
   * The number of seconds until the token expires (since it was issued). Returned when a login is confirmed.
   */
  expires_in?: number;
  /**
   * A timestamp of when the token will expire. Returned when a login is confirmed.
   */
  expires_at?: number;
  refresh_token?: string;
  token_type: string;
  user: User | null;
}

interface UserIdentity {
  id: string;
  user_id: string;
  identity_data: {
    [key: string]: any;
  };
  provider: string;
  created_at: string;
  last_sign_in_at: string;
  updated_at?: string;
}

interface User {
  id: string;
  app_metadata: {
    provider?: string;
    [key: string]: any;
  };
  user_metadata: {
    [key: string]: any;
  };
  aud: string;
  confirmation_sent_at?: string;
  recovery_sent_at?: string;
  email_change_sent_at?: string;
  new_email?: string;
  invited_at?: string;
  action_link?: string;
  email?: string;
  phone?: string;
  created_at: string;
  confirmed_at?: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
  last_sign_in_at?: string;
  role?: string;
  updated_at?: string;
  identities?: UserIdentity[];
}

class SupabaseAuthApi {
  // ...
  async login(
    email: string,
    password: string,
  ): Promise<Session | undefined | null> {
    const res = await apiClient.post('/login', {
      email,
      password,
    });
    return res.data;
  }

  async signup(params: SignUpParams): Promise<Session | undefined | null> {
    const res = await apiClient.post('/signup', params);
    return res.data;
  }
}

export default new SupabaseAuthApi();
