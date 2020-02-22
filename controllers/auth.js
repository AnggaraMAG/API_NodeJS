const jwt = require('jsonwebtoken');
const models = require('../models')
const User = models.user
const Pet = models.pet;
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } })
        if (user) {
            const result = await bcrypt.compare(password, user.password);
            if (result) {
                const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY);
                res.send({ email, token });

            } else {
                res.status(401).send({ status: false, message: "password wrong" });
            }
        } else {
            res.status(401).send({ status: false, message: "email not available" });
        }
    } catch (error) {
        console.log(error)
    }
}
//register api
exports.register = async (req, res) => {
    try {
        const { name, email, password, phone, address, pet } = req.body;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        const check = await User.findOne({ where: { email } });
        if (check) {
            res
                .status(401)
                .send({ status: false, message: "email sudah terpakai" });
        } else {
            const userRes = await User.create({
                name,
                role: "user",
                email,
                password: hash,
                phone,
                address
            });
            const user_id = userRes.dataValues.id;
            const petRes = await Pet.create({
                name: pet.name,
                gender: pet.gender,
                user_id,
                species_id: pet.species.id,
                age_id: pet.age.id
            });
            const token = jwt.sign({ user_id: user_id.id }, process.env.SECRET_KEY);
            res.send(({ email, token }))
        }
    } catch (error) {
        console.log(error)
    }
}