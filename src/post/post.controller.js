import Post from './post.model.js'

export const addPost = async (req, res)=>{
    const data = req.body
    if(!data.title || !data.description){
        return res.status(400).send(
            {
                success: false,
                message: 'Title and description are required'
            }
        )
    }

    try{
        const newPost = new Post(data)
        await newPost.save()

        return res.send(
            {
                success: true,
                message: 'Post created successfully'
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error creating post',
                err
            }
        )
    }
}

export const getAllPosts = async (req, res)=>{
    try{
        const posts = await Post.find({ status: true })
        return res.send(
            {
                success: true,
                posts
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error retrieving posts',
                err
            }
        )
    }
}

export const getPostById = async (req, res)=>{
    const { id } = req.params

    try{
        const post = await Post.findById(id)
        if(!post || post.status === false){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Post not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                post
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error retrieving post',
                err
            }
        )
    }
}

export const updatePost = async (req, res)=>{
    const { id } = req.params
    const data = req.body

    try{
        const post = await Post.findById(id)
        if(!post || post.status === false){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Post has been disabled'
                }
            )
        }
        const updated = await Post.findByIdAndUpdate(id, data, { new: true })
        return res.send(
            {
                success: true,
                message: 'Post updated successfully',
                updated
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error updating post',
                err
            }
        )
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params

    try {
        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).send({
                success: false,
                message: 'Post not found'
            })
        }

        await Post.findByIdAndDelete(id)

        return res.send({
            success: true,
            message: 'Post deleted successfully'
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'Error deleting post',
            err
        })
    }
}
