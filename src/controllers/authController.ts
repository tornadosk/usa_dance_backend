import { Request, Response } from 'express';
import { authenticateYM } from '../services/ymService';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Username and password required.' });
    return;
  }

  const ymAuth = await authenticateYM(username, password);

  if (!ymAuth) {
    res.status(401).json({ message: 'Invalid username or password.' });
    return;
  }

  const tokenPayload = {
    userId: ymAuth.UserID,
    sessionId: ymAuth.SessionID,
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, {
    expiresIn: '2h',
  });

  res.json({ token });
};
