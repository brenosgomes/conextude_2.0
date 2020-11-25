const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        try {
            existsOrError(req.params.id, 'exerciseQuestion does not exist!')
    
            const getIdExerciseQuestion = await knex('exerciseQuestion')
                .where({ exercise_id: req.params.id }).first()
            existsOrError(getIdExerciseQuestion, 'exerciseQuestion not found')

            res.json(getIdExerciseQuestion)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'exerciseQuestion does not exist!')

            const removeExerciseQuestion = await app.db('exerciseQuestion').del()
                .where({ exerciseQuestion_id: req.params.id })
            existsOrError(removeExerciseQuestion, 'exerciseQuestion not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const exerciseQuestion = req.body;
        try {
            const newExerciseQuestion = await knex("exerciseQuestion").insert(exerciseQuestion)
            res.json(newExerciseQuestion);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const exerciseQuestion = req.body;
        const exerciseQuestion_id = req.params.id;
        try{
            existsOrError(exerciseQuestion_id, 'exerciseQuestion does not exist!')
            
            const attExerciseQuestion = await knex("exerciseQuestion")
                .update(exerciseQuestion)
                .where({ exerciseQuestion_id: exerciseQuestion_id })
            existsOrError(attExerciseQuestion, 'exerciseQuestion not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }
    

    return { get, post, put, remove }
}