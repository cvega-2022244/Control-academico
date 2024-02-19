'use strict';

import User from '../user/user.model.js'
import Course from './courses.model.js'

export const saveCourse = async (req, res) => {
    try {
        let data = req.body
        let profesor = await User.findOne({ _id: data.profesor });
        if (!profesor) return res.status(404).send({ message: 'Profesor not found' })
        let course = new Course(data)
        await course.save()

        // Responder si todo sale bien
        return res.send({ message: 'Course saved successfully' })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error saving course' })
    }
};

export const getCourses = async (req, res) => {
    try {
        let courses = await Course.find().populate('estudiantes', ['name', 'phone']).populate('profesor', ['name', 'phone'])
        return res.send({ courses })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting courses' })
    }
}

export const updateCourse = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.params
        let updatedCourse = await Course.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        ).populate('estudiantes', ['name', 'phone']).populate('profesor', ['name', 'phone'])
        // Validar la actualización
        if (!updatedCourse) return res.status(404).send({ message: 'Course not found and not updated' })

        // Responder si todo sale bien
        return res.send({ message: 'Course updated successfully', updatedCourse })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating course' })
    }
};

export const deleteCourse = async (req, res) => {
    try {
        let { id } = req.params
        let deletedCourse = await Course.deleteOne({ _id: id })
        if (deletedCourse.deletedCount === 0) return res.status(404).send({ message: 'Course not found and not deleted' })
        return res.send({ message: 'Deleted course successfully' })
    } catch (err) {
        console.error(err)
        return res.status(404).send({ message: 'Error deleting course' })
    }
}

export const searchCourses = async (req, res) => {
    try {
        let { search } = req.body
        let courses = await Course.find(
            { nombre: search }
        ).populate('estudiantes', ['name', 'phone']).populate('profesor', ['name', 'phone'])
        if (!courses) return res.status(404).send({ message: 'Courses not found' })
        return res.send({ message: 'Courses found', courses })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error searching courses' })
    }
};
