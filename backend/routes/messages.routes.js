const { Router } = require('express');
const { readFile } = require('../core/fs');
const { STATUS, API_DELAY } = require('../core/constants');
const verify = require('../authVerify');

const router = Router();

const getMessagesData = async () => {
    const data = await readFile('messages.json');
    return data;
};

router.get('/', verify, async (req, res) => {
    try {
        const msgs = await getMessagesData();
        setTimeout(() => {
            res.status(STATUS.SUCCESSFUL).send(msgs);
        }, API_DELAY);
    } catch (error) {
        res.status(STATUS.CLIENT_ERROR).send({
            message: error.message || 'Something went wrong. Try again.',
        });
    }
});

module.exports = router;
