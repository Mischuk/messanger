const { Router } = require('express');
const { STATUS } = require('../core/constants');

const router = Router();
const { readFile } = require('../core/fs');

const getMessagesData = async () => {
    const data = await readFile('messages.json');
    return data;
};

router.get('/', async (req, res) => {
    try {
        const msgs = await getMessagesData();
        setTimeout(() => {
            res.status(STATUS.SUCCESSFUL).send(msgs);
        }, 2000);
    } catch (error) {
        res.status(STATUS.CLIENT_ERROR).send({ message: error.message || 'Something went wrong. Try again.' });
    }
});

module.exports = router;
