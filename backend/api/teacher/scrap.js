const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        try {
            existsOrError(req.params.id, 'scraps does not exist!')
    
            const getIdScraps = await knex('scraps')
                .where({ subject_id: req.params.id }).first()
            existsOrError(getIdScraps, 'scraps not found')

            res.json(getIdScraps)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'scraps does not exist!')

            const rowsDeleted = await knex('scraps').del()
                .where({ scraps_id: req.params.id })
            existsOrError(rowsDeleted, 'scraps not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const scraps = req.body;
        try {
            const newscraps = await knex("scraps").insert(scraps)
            res.json(newscraps);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const scraps = req.body;
        const scraps_id = req.params.id;
        try{
            existsOrError(scraps_id, 'scraps does not exist!')
            
            const attScraps = await knex("scraps")
                .update(scraps)
                .where({ scraps_id: scraps_id })
            existsOrError(attScraps, 'scraps not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }

    return { get, post, put, remove }
}