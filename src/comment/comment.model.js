import { Schema, model } from 'mongoose'

const commentSchema = Schema(
    {
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: [true, 'Post is required']
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            maxLength: [50, 'Username cannot exceed 50 characters']
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
            maxLength: [300, 'Content cannot exceed 300 characters']
        },
        commentDate: {
            type: Date,
            default: Date.now
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

export default model('Comment', commentSchema)
