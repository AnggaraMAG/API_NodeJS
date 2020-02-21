const jwt = require("jsonwebtoken");
const models = require('../models')

const User = models.user;

exports.Userdetail = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findOne({
            where: { id },
            attributes: { exclude: ["id", "password", "email"] }
        });
        res.send(user);
    } catch (error) {
        console.log(error)
    }
}

exports.Userupdate = async (req, res) => {
    try {
        const { name, address, phone } = req.body;
        const { id } = req.params;
        const user = await User.update(
            { name, address, phone },
            {
                where: { id }
            }
        );
        const myuser = await User.findOne({
            where: { id },
            attributes: { exclude: ["id", "password", "email"] }
        });
        res.send(myuser)
    } catch (error) {
        console.log(error)
    }
}

exports.Userdelete = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.destroy({ where: { id } });
        res.status(200).send({ message: "Success delete a user", id: { id } })
    } catch (error) {
        console.log(error)
    }
}