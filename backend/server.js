import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// 2. Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  try {
    // Query the user and join with their role
    const queryText = `
      SELECT u.id, u.email, u.password, u.is_active, r.name as role_name 
      FROM rh_core.users u
      LEFT JOIN rh_core.roles r ON u.role_id = r.id
      WHERE u.email = $1
    `;
    const result = await pool.query(queryText, [email.toLowerCase().trim()]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    // Check if user is active
    if (!user.is_active) {
      return res.status(403).json({ error: 'Your account is currently deactivated' });
    }

    // Verify password using bcryptjs
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role_name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return success response
    return res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role_name
      }
    });

  } catch (error) {
    console.error('Error during login query:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// 3. Auth verification endpoint (Get current user)
app.get('/api/auth/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Get fresh user details from DB
    const queryText = `
      SELECT u.id, u.email, u.is_active, r.name as role_name 
      FROM rh_core.users u
      LEFT JOIN rh_core.roles r ON u.role_id = r.id
      WHERE u.id = $1
    `;
    const result = await pool.query(queryText, [decoded.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    if (!user.is_active) {
      return res.status(403).json({ error: 'User is inactive' });
    }

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role_name
      }
    });

  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
