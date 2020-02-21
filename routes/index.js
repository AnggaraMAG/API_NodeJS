const express = require("express");
const router = express.Router()
// const TodoController = require("../controllers/todos")
const { login, register } = require("../controllers/auth");

router.get("/", (req, res) => {
    res.send("<strong>Hello DumbWays Rumah Tengah</strong>");
});


router.post('/login', login);
router.post('/register', register);


module.exports = router;