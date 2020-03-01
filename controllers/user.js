const jwt = require("jsonwebtoken");
const models = require('../models')

const User = models.user;

exports.Userdetail = async (req, res) => {
    const  id  = req.user
    console.log(req.user)
    try {
        const user = await User.findOne({
            where: { id },
            attributes: { exclude: ["id","password"] }
        });
        res.send({data:user});
    } catch (error) {
        console.log(error)
    }
}

exports.Userupdate = async (req, res) => {
    const { name, address, phone } = req.body;
    const  id  = req.user;
    const token = req.header("Authorization").replace("Bearer ", "");
    const user = jwt.verify(token, process.env.SECRET_KEY);
    try {
        if (user.user_id != id) {
            res.send({ message: "You Can't Update an Account that not your own" });
        } else {
            await User.update(
                { name, address, phone },
                {
                    where: { id }
                }
            );
            const data = await User.findOne({
                where: { id },
                attributes: { exclude: ["id", "password", "email"] }
            });
            res.send(data)
        }
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