const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const teacher = await knex("teacher").select("*");
        return res.json(teacher)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'teacher does not exist!')
    
            const getIdTeacher = await knex('teacher')
                .where({ teacher_id: req.params.id }).first()
            existsOrError(getIdTeacher, 'teacher not found')

            res.json(getIdTeacher)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'teacher does not exist!')

            const removeTeacher = await app.db('teacher').del()
                .where({ teacher_id: req.params.id })
            existsOrError(removeTeacher, 'teacher not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const teacher = req.body;
        try {
            const newTeacher = await knex("teacher").insert(teacher)
            res.json(newTeacher);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const teacher = req.body;
        const teacher_id = req.params.id;
        try{
            existsOrError(teacher_id, 'teacher does not exist!')
            
            const attTeacher = await knex("teacher")
                .update(teacher)
                .where({ teacher_id: teacher_id })
            existsOrError(attTeacher, 'teacher not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }
    

    return { get, getById, post, put, remove }
}