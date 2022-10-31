const PORT = process.env.PORT || 8000;
const SECRET_KEY = 'AadksSpo12qWqSwepoqw';
const API_DELAY = 0;
const JWT_SECRET = {
    ACCESS: process.env.JWT_ACCESS_SECRET || 'secretaccess',
    REFRESH: process.env.JWT_REFRESH_TOKEN || 'secretrefresh',
};

export { PORT, SECRET_KEY, API_DELAY, JWT_SECRET };
