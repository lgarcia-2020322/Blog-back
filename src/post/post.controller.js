import Comentario from './comment.model.js'
import Publicacion from '../posts/post.model.js'

export const agregarComentario = async (req, res)=>{
    const data = req.body

    if(!data.postId || !data.nombreUsuario || !data.contenido){
        return res.status(400).send({ success: false, message: 'Faltan campos obligatorios' })
    }

    try{
        const postExiste = await Publicacion.findById(data.postId)
        if(!postExiste){
            return res.status(404).send({ success: false, message: 'La publicación no existe' })
        }

        const nuevoComentario = new Comentario(data)
        await nuevoComentario.save()

        return res.send({ success: true, message: 'Comentario agregado correctamente' })
    }catch(err){
        console.error(err)
        return res.status(500).send({ success: false, message: 'Error al agregar comentario', err })
    }
}

export const obtenerComentariosPorPost = async (req, res)=>{
    const { postId } = req.params

    try{
        const comentarios = await Comentario.find({ postId }).sort({ fechaComentario: -1 })
        return res.send({ success: true, comentarios })
    }catch(err){
        console.error(err)
        return res.status(500).send({ success: false, message: 'Error al obtener comentarios', err })
    }
}
