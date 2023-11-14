const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

function generateAccessToken(data) {
    return jwt.sign({ data }, process.env.NEXTAUTH_SECRET, { expiresIn: "3600s", });
}

async function VerifyToken(req, res, next) {
    try {
        const tokenString = req.cookies['jwt-token'];

        if (!tokenString) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        jwt.verify(tokenString, process.env.NEXTAUTH_SECRET, (err, decoded) => {
            if (err) return res.status(401).send("Unauthorized");
            req.tokenData = decoded;
            next();
        });
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden', details: error.message });
    }
}


module.exports = { VerifyToken, generateAccessToken };
