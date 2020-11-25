const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        try {
            existsOrError(req.params.id, 'question does not exist!')
    
            const getIdQuestion = await knex('question')
                .where({ subject_id: req.params.id }).first()
            existsOrError(getIdQuestion, 'question not found')

            res.json(getIdQuestion)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'question does not exist!')

            const rowsDeleted = await app.db('question').del()
                .where({ question_id: req.params.id })
            existsOrError(rowsDeleted, 'question not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const question = req.body;
        try {
            const newQuestion = await knex("question").insert(question)
            res.json(newQuestion);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const question = req.body;
        const question_id = req.params.id;
        try{
            existsOrError(question_id, 'question does not exist!')
            
            const attQuestion = await knex("question")
                .update(question)
                .where({ question_id: question_id })
            existsOrError(attQuestion, 'question not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }

    return { get, post, put, remove }
}