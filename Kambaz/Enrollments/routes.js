import Database from "../Database/index.js";

export default function EnrollmentRoutes(app) {

    app.post('/api/courses/:cid/enroll', (req, res) => {
        // console.log('Current user session:', req.session['currentUser']);
        // const currentUser = req.session['currentUser'];
        // if (!currentUser) {
        //     res.status(401).json({ message: 'Not logged in' });
        //     return;
        // }

        const enrollment = {
            _id: new Date().getTime().toString(),
            ...req.body,
        };
        Database.enrollments.push(enrollment);
        res.json(enrollment);
    });

    app.delete('/api/courses/:cid/enroll', (req, res) => {
        // const currentUser = req.session["currentUser"];
        // if (!currentUser) {
        //     res.status(401).json({ message: "Not logged in" });
        //     return;
        // }
        const { cid } = req.params;
        const userid = req.body.userid;
        Database.enrollments = Database.enrollments.filter(
            (e) => !(e.user === userid && e.course === cid)
        );
        res.json({ message: 'Successfully unenrolled' });
    });

    app.get("/api/users/:uid/enrollments", (req, res) => {
        const { uid } = req.params;
        const enrollments = Database.enrollments.filter(
            enrollment => enrollment.user === uid
        );
        res.json(enrollments);
    });
}