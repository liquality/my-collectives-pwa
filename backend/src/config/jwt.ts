const config: { [key: string]: any } = { 
    development: {
        secret: 'my-secret',
        expiresIn: '1h'
    },
    production: {
        secret: process.env.PROD_JWT_SECRET,
        expiresIn: '1h'
    }
};
export default config;