import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    console.log("Generated Token:", token);


  
  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded; 
    next();
  });
};