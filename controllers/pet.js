const models = require("../models");
const Pet = models.pet
const User = models.user
const Species = models.species
const Age = models.age;

exports.Getpet = async (req, res) => {
    try {
        const pet = await Pet.findAll({
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "name", "address", "phone"]
                }, {
                    model: Species,
                    as: "species",
                    attributes: ["id", "name"]
                }],
            // attributes: { exclude: ["user_id", "species_id"] }

        });
        res.send({ pet })
        console.log(pet)
    } catch (error) {
        console.log(error)
    }
}

exports.Postpet = async (req, res) => {
    const { name, gender, age, about_pet, photo } = req.body;
    const species_id = req.body.species.id;
    const user_id = req.body.user.id;
    const ages = await Age.findOne({ where: { age: age } });
    const ageid = ages.id;
    try {
        const pet = await Pet.create({
            name,
            gender,
            species_id,
            age_id: ageid,
            user_id,
            about_pet,
            photo
        });
        const id = pet.id
        const data = await Pet.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "name", "phone"]
                },
                {
                    model: Species,
                    as: "species",
                    attributes: ["id", "name"]
                },
                {
                    model: Age,
                    as: "ages",
                    attributes: ["id", "age"]
                }
            ],
            attributes: { exclude: ["user_id", "species_id"] }
        });
        res.status(200).send({
            status: true,
            message: "succes add new pet",
            data: data
        })
    } catch (error) {
        console.log(error)
    }
}

exports.Putpet = async (req, res) => {
    const id = req.params.id;
    const { name, gender, age, about_pet, photo } = req.body;
    const species = req.body.species.id;
    const user_id = req.body.user.id;
    const ages = await Age.findOne({ where: { age: age } });
    const ageid = ages.id;
    try {
        const pet = await Pet.update({
            name,
            gender,
            species,
            user_id,
            age_id: ageid,
            about_pet,
            photo
        },
            { where: { id } }
        );
        const data = await Pet.findOne({
            where: { id },
            include: [{
                model: User,
                as: "user",
                attributes: ["id", "name", "address", "phone"]
            },
            {
                model: Species,
                as: "species",
                attributes: ["id", "name"]
            }
            ],
            attributes: { exclude: ["user_id", "species_id"] }
        });
        res.status(200).send({
            status: true,
            message: "success update a pet",
            data: data
        })
    } catch (error) {
        console.log(error)
    }
}

exports.Deletepet = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await Pet.destroy({
            where: { id }
        });
        res.status(200).send({
            message: "success deleted a pet",
            id: { id }
        })
    } catch (error) {
        console.log(error)
    }
}

exports.Petfind = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const pet = await Pet.findOne(
            {
                where: { id },
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["id", "name", "address", "phone"]
                    },
                    {
                        model: Species,
                        as: "species",
                        attributes: ["id", "name"]
                    }
                ],
                attributes: { exclude: ["user_id", "species_id", "createdAt", "updatedAt"] }
            });
        res.send(pet)
    } catch (error) {
        console.log(error)
    }
}

