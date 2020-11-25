const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        try {
            existsOrError(req.params.id, 'multimedia does not exist!')
    
            const getIdMultimedia = await knex('multimedia')
                .where({ subject_id: req.params.id }).first()
            existsOrError(getIdMultimedia, 'multimedia not found')

            res.json(getIdMultimedia)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    return { get }
}