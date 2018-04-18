import path from 'path'
import dotenv from 'dotenv-safe'

const requireProcessEnv = (name) => {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable')
    }
    return process.env[name];
};

// if (process.env.NODE_ENV !== 'production') {
dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
});
// }


const config = {
    all: {
        env: process.env.NODE_ENV || 'development',
        root: path.join(__dirname, '..'),
        port: process.env.PORT || 9000,
        ip: process.env.IP || '0.0.0.0',
        apiRoot: process.env.API_ROOT || '/api',
        jwtSecret: requireProcessEnv('JWT_SECRET'),
        mongo: {
            options: {
                db: {
                    safe: true
                }
            }
        }
    },
    test: {
        mongo: {
            uri: 'mongodb://localhost/my-database-test',
            options: {
                debug: false
            }
        }
    },
    development: {
        mongo: {
            uri: 'mongodb://localhost/my-database-dev',
            options: {
                debug: true
            }
        }
    },
    production: {
        mongo: {
            uri: 'mongodb://localhost/my-database-prod',
            options: {
                debug: false
            }
        }
    }
};

module.exports = Object.assign(config.all, config[config.all.env]);
export default module.exports;