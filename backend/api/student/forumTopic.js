const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        try {
            existsOrError(req.params.id, 'forumTopic does not exist!')
    
            const getIdForumTopic = await knex('forumTopic')
                .where({ subject_id: req.params.id }).first()
            existsOrError(getIdForumTopic, 'forumTopic not found')

            res.json(getIdForumTopic)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'forumTopic does not exist!')

            const removeForumTopic = await app.db('forumTopic').del()
                .where({ forumTopic_id: req.params.id })
            existsOrError(removeForumTopic, 'forumTopic not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const forumTopic = req.body;
        try {
            const newForumTopic = await knex("forumTopic").insert(forumTopic)
            res.json(newForumTopic);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const forumTopic = req.body;
        const forumTopic_id = req.params.id;
        try{
            existsOrError(forumTopic_id, 'forumTopic does not exist!')
            
            const attForumTopic = await knex("forumTopic")
                .update(forumTopic)
                .where({ forumTopic_id: forumTopic_id })
            existsOrError(attForumTopic, 'forumTopic not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }
    

    return { get, post, put, remove }
}