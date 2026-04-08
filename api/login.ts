import type { VercelRequest, VercelResponse } from '@vercel/node';

type LoginBody = {
  username?: string;
  password?: string;
};

type SuccessResponse = {
  success: true;
  token: string;
};

type ErrorResponse = {
  success: false;
  error: string;
};

export default function handler(
  req: VercelRequest,
  res: VercelResponse<SuccessResponse | ErrorResponse>
): void {
  // Dozvoljavamo samo POST
  if (req.method !== 'POST') {
    res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
    return;
  }

  const { username, password } = (req.body || {}) as LoginBody;

  // Fake kredencijali (za test)
  const VALID_USER = 'admin';
  const VALID_PASS = 'admin123';

  // Edge case: prazni inputi
  if (!username || !password) {
    res.status(400).json({
      success: false,
      error: 'Username and password are required',
    });
    return;
  }

  // Valid login
  if (username === VALID_USER && password === VALID_PASS) {
    res.status(200).json({
      success: true,
      token: 'fake-jwt-token-123',
    });
    return;
  }

  // Invalid login
  res.status(401).json({
    success: false,
    error: 'Invalid credentials',
  });
}