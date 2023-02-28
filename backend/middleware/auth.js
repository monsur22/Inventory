import jwt from 'jsonwebtoken';

const tokenBlacklist = [];
/*
---------------------------------------------
| protect function check Authentication user
---------------------------------------------
*/
const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: "Authentication token is missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid authentication token" });
    }
};
/*
-------------------------------------------------------------------------------------
| protectedRoute function check authorization and also check token in tokenBlacklist.
| If token in tokenBlacklist access denined.
-------------------------------------------------------------------------------------
*/
const protectedRoute = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized access." });
    }
    console.log('authHeader:',authHeader);
    const token = authHeader.split(" ")[1];
    console.log('authHeader token:',token);
    if (tokenBlacklist.includes(token)) {
        return res.status(401).json({ message: "Token is blacklisted." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token." });
    }
};


export {
    protect,
    protectedRoute,
    tokenBlacklist
}