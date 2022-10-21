const { Router } = require('express');
const { body, validationResult, param } = require('express-validator');
const { STATUS } = require('../core/constants');
const { getUniqueID } = require('../core/utils');

const router = Router();
const { readFile } = require('../core/fs');

const getCities = async () => {
    const data = await readFile('cities.json');
    return data;
};
/*
    LOGIN
*/
router.get('/', async (req, res) => {
    try {
        const name = req.query.name;
        const data = await getCities();
        let s = [];

        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const element = data[key];
                s.push(element);
            }
        }

        const flatted = s.flat();
        const resls = flatted.filter((el) => el.toLowerCase().startsWith(name.toLowerCase()));

        setTimeout(() => {
            // const result = data.filter((el) => console.log(el));
            res.json(resls);
        }, 500);
    } catch (e) {
        res.status(STATUS.CLIENT_ERROR).json({ message: 'Something went wrong. Try again.' });
    }
});

module.exports = router;
