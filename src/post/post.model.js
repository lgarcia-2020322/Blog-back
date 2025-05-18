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
            required: [true, 'Course is required'],
            maxLength: [50, 'Course cannot exceed 50 characters']
        },
        link: {
            type: String,
            required: false,
            maxLength: [300, 'Link cannot exceed 300 characters']
        },
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
