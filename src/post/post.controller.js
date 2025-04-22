import Publicacion from './post.model.js'
import Curso from '../cursos/course.model.js'

export const crearPublicacion = async (req, res)=>{
    const data = req.body

    if(!data.titulo || !data.descripcion || !data.curso){
        return res.status(400).send({ success: false, message: 'Faltan datos obligatorios' })
    }

    try{
        const cursoExiste = await Curso.findById(data.curso)
        if(!cursoExiste){
            return res.status(404).send({ success: false, message: 'El curso no existe' })
        }

        const nuevaPublicacion = new Publicacion(data)
        await nuevaPublicacion.save()

        return res.send({ success: true, message: 'Publicación creada con éxito' })
    }catch(err){
        console.error(err)
        return res.status(500).send({ success: false, message: 'Error al crear publicación', err })
    }
}

export const obtenerPublicaciones = async (req, res)=>{
    try{
        const publicaciones = await Publicacion.find().populate('curso', 'nombre descripcion')
        return res.send({ success: true, publicaciones })
    }catch(err){
        console.error(err)
        return res.status(500).send({ success: false, message: 'Error al obtener publicaciones', err })
    }
}

export const obtenerPublicacion = async (req, res)=>{
    const { id } = req.params

    try{
        const publicacion = await Publicacion.findById(id).populate('curso', 'nombre descripcion')
        if(!publicacion){
            return res.status(404).send({ success: false, message: 'Publicación no encontrada' })
        }
        return res.send({ success: true, publicacion })
    }catch(err){
        console.error(err)
        return res.status(500).send({ success: false, message: 'Error al obtener la publicación', err })
    }
}

export const actualizarPublicacion = async (req, res)=>{
    const { id } = req.params
    const data = req.body

    try{
        const actualizada = await Publicacion.findByIdAndUpdate(id, data, { new: true })
        if(!actualizada){
            return res.status(404).send({ success: false, message: 'Publicación no encontrada' })
        }
        return res.send({ success: true, message: 'Publicación actualizada', actualizada })
    }catch(err){
        console.error(err)
        return res.status(500).send({ success: false, message: 'Error al actualizar publicación', err })
    }
}
