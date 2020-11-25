const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const getExercise = async (req, res) => {
        try {
            existsOrError(req.params.id, 'exercise does not exist!')
    
            const getIdExercise = await knex('exercise')
                .where({ subject_id: req.params.id }).first()
            existsOrError(getIdExercise, 'exercise not found')

            res.json(getIdExercise)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }  

    const getQuestion = async (req, res) => {
        try {
            existsOrError(req.params.id, 'exercise does not exist!')
    
            const getIdExercise = await knex('exercise')
                .where({ exercise_id: req.params.id }).first()
            existsOrError(getIdExercise, 'exercise not found')

            res.json(getIdExercise)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    return { getExercise, getQuestion }
}