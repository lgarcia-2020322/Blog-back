import Comment from './comment.model.js'
import Post from '../post/post.model.js'

export const addComment = async (req, res)=>{
    const data = req.body
    if(!data.post || !data.username || !data.content){
        return res.status(400).send(
            {
                success: false,
                message: 'Post, username and content are required'
            }
        )
    }

    try{
        const postExists = await Post.findById(data.post)
        if(!postExists || postExists.status === false){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Associated post not found'
                }
            )
        }

        const newComment = new Comment(data)
        await newComment.save()

        return res.send(
            {
                success: true,
                message: 'Comment added successfully'
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error adding comment',
                err
            }
        )
    }
}

export const getCommentsByPost = async (req, res)=>{
    const { postId } = req.params

    try{
        const comments = await Comment.find({ post: postId, status: true }).sort({ commentDate: -1 })

        return res.send(
            {
                success: true,
                comments
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error retrieving comments',
                err
            }
        )
    }
}

export const disableComment = async (req, res)=>{
    const { id } = req.params

    try{
        const comment = await Comment.findById(id)
        if(!comment){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Comment not found'
                }
            )
        }

        if(comment.status === false){
            return res.status(400).send(
                {
                    success: false,
                    message: 'Comment is already disabled'
                }
            )
        }

        comment.status = false
        await comment.save()

        return res.send(
            {
                success: true,
                message: 'Comment disabled successfully'
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error disabling comment',
                err
            }
        )
    }
}
