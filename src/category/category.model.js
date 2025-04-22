import { Schema, model } from 'mongoose'

const categorySchema = Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            maxLength: [50, 'No puede exceder los 50 caracteres']
        },
        descripcion: {
            type: String,
            maxLength: [200, 'No puede exceder los 200 caracteres']
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Categoria', categorySchema)
