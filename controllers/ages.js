const models = require('../models')
const Age = models.age

exports.getPet = async (req, res) => {
    try {
        const age = await Age.findAll();
        res.send({ data: age })
    } catch (error) {
        console.log(error)
    }
}