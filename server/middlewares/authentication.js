const jose = require('node-jose');
const dotenv = require('dotenv');
dotenv.config()

async function VerifyToken(req, res, next) {
    try {
        const tokenString = req.cookies['next-auth.session-token'];
        if (!tokenString) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const nextAuthSecret = process.env.NEXTAUTH_SECRET;
        const key = await jose.JWK.asKey(nextAuthSecret, 'base64');

        const decryptedToken = await jose.JWE.createDecrypt(key).decrypt(tokenString);
        const payloadString = decryptedToken.payload.toString('utf-8');

        console.log(payloadString);

        next();
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden', details: error.message });
    }
}

module.exports = VerifyToken;
