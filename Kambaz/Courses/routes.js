import * as enrollmentsDao from '../Enrollments/dao.js';
import * as modulesDao from '../Modules/dao.js';
import * as dao from './dao.js';
export default function CourseRoutes(app) {
    app.get('/api/courses', async (req, res) => {
        const courses = await dao.findAllCourses();
        res.send(courses);
    });

    app.delete('/api/courses/:courseId', async (req, res) => {
        const { courseId } = req.params;
        const status = await dao.deleteCourse(courseId);
        res.send(status);
    });

    app.get('/api/courses/:courseId/modules', async (req, res) => {
        const { courseId } = req.params;
        const modules = await modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });

    app.post('/api/courses', async (req, res) => {
        const course = await dao.createCourse(req.body);
        const currentUser = req.session['currentUser'];
        if (currentUser) {
            await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
        }
        res.json(course);
    });

    app.get('/api/courses/:cid/users', async (req, res) => {
        const { cid } = req.params;
        const users = await enrollmentsDao.findUsersForCourse(cid);
        res.json(users);
    });

    // Retrieving modules
    app.get('/api/courses/:courseId/modules', (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });

    // Creating modules
    app.post('/api/courses/:courseId/modules', (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = modulesDao.createModule(module);
        res.send(newModule);
    });
}
