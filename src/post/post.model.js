import { Schema, model } from 'mongoose'

const postSchema = Schema(
    {
        titulo: {
            type: String,
            required: [true, 'El título es obligatorio'],
            maxLength: [100, 'No puede exceder los 100 caracteres']
        },
        descripcion: {
            type: String,
            required: false,
            maxLength: [200, `can't exceed 200 characters`]
        },
        curso: {
            type: Schema.Types.ObjectId,
            ref: 'Curso',
            required: [true, 'El curso asociado es obligatorio']
        },
        fecha: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Publicacion', postSchema)
