const models = require('../models');
const jwt = require('jsonwebtoken');

const Payment = models.payment;
const User = models.user;

exports.Upay = async (req, res) => {
    const { no_rek, proof_of_transfer, status } = req.body;

    const token = req.header("Authorization").replace("Bearer ", "");
    const user = jwt.verify(token, process.env.SECRET_KEY);
    try {
        const payment = await Payment.create({
            no_rek,
            proof_of_transfer,
            user_id: user.user_id,
            status
        });
        res.status(200).send({
            status: true,
            message: "Success to created payment",
            data: payment
        });

    } catch (error) {
        console.log(error)
    }
}

exports.Uupdate = async (req, res) => {
    const id = req.params.id;
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const role = req.role;
        // console.log(`aaaaaaaaaaaaaaaaaaaaaaaaaaaaa ${role}`)
        if (role == "admin") {
            const payment = await Payment.update(req.body, { where: { id } });
            const payment_detail = await Payment.findOne({
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: [
                            "id",
                            "name",
                            "address",
                            "phone",
                        ]
                    }
                ],
                attributes: { exclude: ["user"] },
                where: { id }
            });
            res.status(200).send({
                status: true,
                message: "succes to update payment",
                data: payment_detail
            });
        } else {
            res.status(200).send({
                status: false,
                message: "Only admin to update payment cuks"
            });
        }
    } catch (error) {
        console.log(error)
    }
}