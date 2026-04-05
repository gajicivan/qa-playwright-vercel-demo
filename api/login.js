export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body || {};

  // Fake user (za demo)
  const VALID_USER = 'admin';
  const VALID_PASS = 'admin123';

  if (username === VALID_USER && password === VALID_PASS) {
    return res.status(200).json({
      success: true,
      token: 'fake-jwt-token-123'
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Invalid credentials'
  });
}