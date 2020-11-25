const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        try {
            existsOrError(req.params.id, 'subject does not exist!')
    
            const getIdSubject = await knex('subject')
                .where({ teacher_id: req.params.id }).first()
            existsOrError(getIdSubject, 'subject not found')

            res.json(getIdSubject)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }    

    return { get }
}