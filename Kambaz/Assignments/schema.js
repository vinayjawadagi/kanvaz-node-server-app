import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        description: String,
        points: Number,
        assignmentGroup: String,
        gradeDisplay: String,
        submissionType: String,
        dueDate: Date,
        availableFrom: Date,
        until: Date,
        course: { type: String, ref: 'CourseModel' },
    },
    { collection: 'assignments' }
);

export default schema;
