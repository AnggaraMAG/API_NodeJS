const express = require("express");
const router = express.Router()
// const TodoController = require("../controllers/todos")
const { login, register } = require("../controllers/auth");
const { index, add } = require("../controllers/species");

router.get("/", (req, res) => {
    res.send("<strong>Hello DumbWays Rumah Tengah</strong>");
});


router.post('/login', login);
router.post('/register', register);

//species

router.get('/species', index);
router.post('/species', add);


module.exports = router;