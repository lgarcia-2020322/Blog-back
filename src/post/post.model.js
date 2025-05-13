import { Schema, model } from 'mongoose'

const postSchema = Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            maxLength: [100, 'Title cannot exceed 100 characters']
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        date: {
            type: Date,
            default: Date.now
        },
        course: {
            type: String,
            requiered: [true, 'Course is required'],
            maxLength: [50, 'Title cannot exceed 100 characters']
        },
        // ProjectLinks O images DUDA
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Post', postSchema)
