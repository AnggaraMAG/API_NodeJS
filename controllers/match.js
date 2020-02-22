const models = require("../models");
const { checkMatch, checkAlreadyLiked } = require("../middleware/match");

// const Pet = models.pet;
// const User = models.user;
// const Species = models.species;
// const Age = models.age;
const Match = models.match;

exports.GetM = async (req, res) => {
    try {
        const { pet_id, pet_id_liked } = req.query;
        const isMatch = await checkMatch(pet_id, pet_id_liked);
        if (isMatch.length > 0) {
            const data = await Match.findOne({
                where: { pet_id: isMatch[0], pet_id_liked: isMatch[1] }
            });
            res.status(200).send(data);
        } else {
            res.send("tidak match");
        }
    } catch (err) { }
};

exports.CreateM = async (req, res) => {
    try {
        const { pet_id, pet_id_liked } = req.body;
        const isMatch = await checkMatch(pet_id, pet_id_liked);
        if (isMatch.length > 0) {
            res.send("emang udah match");
        } else {
            const isAlreadyLiked = await checkAlreadyLiked(pet_id, pet_id_liked);
            if (isAlreadyLiked) {
                console.log("update");
                const pet = await Match.update(
                    {
                        status: "true",
                        updatedAt: new Date()
                    },
                    {
                        where: { pet_id: pet_id_liked, pet_id_liked: pet_id }
                    }
                );
                const data = await Match.findOne({
                    where: { pet_id: pet_id_liked, pet_id_liked: pet_id }
                });
                res.status(200).send(data);
            } else {
                const check = await Match.findOne({
                    where: {
                        pet_id,
                        pet_id_liked
                    }
                });
                if (!check) {
                    const match = await Match.create({
                        pet_id,
                        pet_id_liked,
                        status: "false",
                        createdAt: new Date(),
                        updatedAt: new Date()
                    });
                    const data = await Match.findOne({
                        where: { pet_id, pet_id_liked }
                    });
                    res.status(200).send(data);
                }
                res.send("");
            }
        }
    } catch (err) {
        console.log(err);
    }
};

exports.UpdateM = async (req, res) => {
    try {
        const { pet_id, pet_id_liked, status } = req.body;
        const { id } = req.params;
        const match = await Match.update(
            {
                pet_id,
                pet_id_liked,
                status,
                updatedAt: new Date()
            },
            {
                where: { id }
            }
        );
        const data = await Match.findOne({
            where: { id }
        });
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
    }
};