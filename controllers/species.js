const models = require('../models')
const Species = models.species

exports.index = async (req, res) => {
    try {
        const species = await Species.findAll();
        res.send({data:species})
    } catch (error) {
        console.log(error)
    }

}

exports.add = async (req, res) => {
    const { name } = req.body;
    const check = await Species.findOne({
        where: { name }
    })
    if (check) {
        res.status(401).send({
            status: false,
            message: "nama species sudah ada"
        })
    } else {
        const species = await Species.create(req.body);
        res.status(201).send({
            status: true,
            message: "succes menambahkan hewan ", data: species
        });
    }
    try {
    } catch (error) {
        console.log(error)
    }
}