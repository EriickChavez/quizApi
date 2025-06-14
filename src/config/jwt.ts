export default {
    secret: process.env.JWT_SECRET || 'secret_key',
    expiresIn: '1d'
};
