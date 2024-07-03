import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import config from '../../cognitoConfig';

const client = jwksClient({
    jwksUri: `https://cognito-idp.${config.region}.amazonaws.com/${config.userPoolId}/.well-known/jwks.json`
});

const getKey = (header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) => {
    client.getSigningKey(header.kid, (err, key) => {
        if (err) {
            return callback(err, undefined); // Pass undefined instead of null
        }
        const signingKey = key?.getPublicKey();
        if (!signingKey) {
            return callback(new Error('Signing key not found'), undefined);
        }
        callback(null, signingKey);
    });
};

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, getKey, {
        audience: config.clientId,
        issuer: `https://cognito-idp.${config.region}.amazonaws.com/${config.userPoolId}`
    }, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        req.user = decoded as JwtPayload;
        next();
    });
};

export default authMiddleware;