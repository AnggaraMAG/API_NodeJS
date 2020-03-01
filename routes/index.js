const express = require("express");
const router = express.Router()
const { auth } = require("../middleware/authh");
// const TodoController = require("../controllers/todos")
const { login, register } = require("../controllers/auth");
const { index, add } = require("../controllers/species");
const { Getpet, Postpet, Putpet, Deletepet, Petfind } = require("../controllers/pet");
const { Userdetail, Userupdate, Userdelete } = require("../controllers/user");
const { GetM, CreateM, UpdateM } = require('../controllers/match');
const { Upay, Uupdate } = require('../controllers/payment');
const { getPet } = require("../controllers/ages");

// router.get("/", (req, res) => {
//     res.send("<strong>Hello DumbWays Rumah Tengah</strong>");
// });


router.post('/login', login);
router.post('/register', register);

//species

router.get('/species', index);
router.post('/species', add);

//PET
router.get('/pets', Getpet);
router.get('/pet/:id', auth, Petfind);
router.post('/pet', auth, Postpet);
router.put('/pet/:id', auth, Putpet);
//detail PET
router.delete('/pet/:id', auth, Deletepet);

//Users API Detail
router.get('/user', auth, Userdetail);
router.put('/user/:id', auth, Userupdate);
router.delete('/user/:id', auth, Userdelete);

//Payment
router.post("/payment", auth, Upay);
router.put("/payment/:id", auth, Uupdate);

//ages
router.get("/ages", getPet);

//Match
router.get('/match', GetM);
router.post('/match', CreateM);
router.put('/match/:id', UpdateM);



module.exports = router;