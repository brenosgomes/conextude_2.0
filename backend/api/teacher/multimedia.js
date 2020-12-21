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

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'multimedia does not exist!')

            const rowsDeleted = await knex('multimedia').del()
                .where({ multimedia_id: req.params.id })
            existsOrError(rowsDeleted, 'multimedia not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const multimedia = req.body;
        try {
            const newMultimedia = await knex("multimedia").insert(multimedia)
            res.json(newMultimedia);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const multimedia = req.body;
        const multimedia_id = req.params.id;
        try{
            existsOrError(multimedia_id, 'multimedia does not exist!')
            
            const attMultimedia = await knex("multimedia")
                .update(multimedia)
                .where({ multimedia_id: multimedia_id })
            existsOrError(attMultimedia, 'multimedia not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }

    return { get, post, put, remove }
}