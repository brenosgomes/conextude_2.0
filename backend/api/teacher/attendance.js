const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        try {
            existsOrError(req.params.id, 'attendance does not exist!')
    
            const getIdAttendance = await knex('attendance')
                .where({ subject_id: req.params.id }).first()
            existsOrError(getIdAttendance, 'attendance not found')

            res.json(getIdAttendance)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'attendance does not exist!')

            const removeAttendance = await knex('attendance').del()
                .where({ attendance_id: req.params.id })
            existsOrError(removeAttendance, 'attendance not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const attendance = req.body;
        try {
            const newAttendance = await knex("attendance").insert(attendance)
            res.json(newAttendance);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const attendance = req.body;
        const attendance_id = req.params.id;
        try{
            existsOrError(attendance_id, 'attendance does not exist!')
            
            const attAttendance = await knex("attendance")
                .update(attendance)
                .where({ attendance_id: attendance_id })
            existsOrError(attAttendance, 'attendance not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }
    

    return { get, post, put, remove }
}