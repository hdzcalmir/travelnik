const dotenv = require('dotenv');

const { decode } = require('next-auth/jwt');

dotenv.config()

async function VerifyToken(req, res, next) {
    try {
        const tokenString = req.cookies['next-auth.session-token'];
        if (!tokenString) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        console.log(tokenString);

        const nextAuthSecret = process.env.NEXTAUTH_SECRET;

        const payload = await decode(tokenString, nextAuthSecret)

        console.log(payload);

        next();
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden', details: error.message });
    }
}

module.exports = VerifyToken;
