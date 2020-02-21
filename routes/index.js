const express = require("express");
const router = express.Router()
// const TodoController = require("../controllers/todos")
const { login, register } = require("../controllers/auth");
const { index, add } = require("../controllers/species");
const { Getpet, Postpet, Putpet, Deletepet, Petfind } = require("../controllers/pet");

router.get("/", (req, res) => {
    res.send("<strong>Hello DumbWays Rumah Tengah</strong>");
});


router.post('/login', login);
router.post('/register', register);

//species

router.get('/species', index);
router.post('/species', add);

//PET
router.get('/pets', Getpet);
router.get('/pet/:id', Petfind);
router.post('/pet', Postpet);
router.put('/pet/:id', Putpet);
router.delete('/pet/:id', Deletepet);


module.exports = router;