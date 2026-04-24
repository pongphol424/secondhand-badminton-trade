import Image from '#models/image'
import Post from '#models/post'
import PostPolicy from '#policies/post_policy'
import type { HttpContext } from '@adonisjs/core/http'
import fs from 'fs/promises'

export default class SellersController {

    async index({ auth, view }: HttpContext) {
        const user = auth.getUserOrFail()
        const posts = await Post.query().where('user_id', user.id).preload('images')
        if(posts.length != 0){
            return view.render('seller_posts', { posts: posts})
        }
        else{
            return view.render('seller_posts')
        }

    }

    async edit({ bouncer, response, view, params }: HttpContext) {
        const postId = params.id
        const post = await Post.query().where('id', postId).first()
        const images = await Image.query().where('postId', post!.id)
        if (await bouncer.with(PostPolicy).denies('edit', post!)) {
            return response.forbidden('Cannot edit the post')
        }
        return view.render('edit', { post: post, images: images })
    }

    async update({ response, request, params }: HttpContext) {
        if (request.input('imageDelete')) {
            const images = request.input('imageDelete')
            const postId = params.id
            const post = await Post.query().where('id', postId).first()
            for (let index in images) {
                let filePath = images[index]
                // console.log(filePath)
                let image = await Image.query().where('file_path', filePath).first()
                await fs.unlink(filePath)
                await image!.delete()
            }
            post!.title = request.input('title')
            post!.body = request.input('body')
            post!.price = request.input('price')
            post!.brand = request.input('brand')
            post!.model = request.input('model')
            post!.weight = request.input('weight')
            post!.balance = request.input('balance')
            post!.flex = request.input('flex')
            post!.grip = request.input('grip')
            const newpost =await post!.save()
            for (let index = 0; index < 5; index++) {
                if (request.files('fileInput[' + index + ']')[0] === undefined || request.files('fileInput[' + index + ']')[0] === null) {
                    break;
                }
                const imgFile = request.files('fileInput[' + index + ']')[0];
                const fileName = `${new Date().getTime()}-${index}.${imgFile.extname}`
                const filePath = 'public/uploadimage'
                await imgFile.move(filePath, {
                    name: fileName,
                    overwrite: true
                })
                let image = new Image
                image.postId = newpost.id
                image.filePath = `${filePath}/${fileName}`
                await image.save()
            }
            return response.redirect().toRoute('seller.posts')
        } else {
            const postId = params.id
            const post = await Post.query().where('id', postId).first()
            post!.title = request.input('title')
            post!.body = request.input('body')
            post!.price = request.input('price')
            post!.brand = request.input('brand')
            post!.model = request.input('model')
            post!.weight = request.input('weight')
            post!.balance = request.input('balance')
            post!.flex = request.input('flex')
            post!.grip = request.input('grip')
            const newpost = await post!.save()
            for (let index = 0; index < 5; index++) {
                if (request.files('fileInput[' + index + ']')[0] === undefined || request.files('fileInput[' + index + ']')[0] === null) {
                    break;
                }
                const imgFile = request.files('fileInput[' + index + ']')[0];
                const fileName = `${new Date().getTime()}-${index}.${imgFile.extname}`
                const filePath = 'public/uploadimage'
                await imgFile.move(filePath, {
                    name: fileName,
                    overwrite: true
                })
                let image = new Image
                image.postId = newpost.id
                image.filePath = `${filePath}/${fileName}`
                await image.save()
            }
            return response.redirect().toRoute('seller.posts')
        }
    }

    async delete({ bouncer, response, params }: HttpContext) {
        const postId = params.id
        const post = await Post.query().where('id', postId).first()
        const images = await Image.query().where('postId', post!.id)
        if (await bouncer.with(PostPolicy).denies('delete', post!)) {
            return response.forbidden('Cannot edit the post')
        }
        for (let image in images) {
            let filePath = images[image].filePath
            await fs.unlink(filePath)
        }
        await post?.delete()
        return response.redirect().toRoute('seller.posts')
    }
    // async update({bouncer,auth,params,request,response}:HttpContext){
    //     const user = auth.getUserOrFail()
    //     const post = await Post.query().where('user_id',user.id).where('id',params.id).first()
    //     const images = await Image.query().where('post_id',post!.id)
    //     if (await bouncer.with(PostPolicy).denies('update',post!)){
    //         post?.title = request.title
    //         post?.body = request.body
    //         post?.brand = request.brand
    //         post?.model
    //         post?.weight
    //         post?.balance
    //         post?.flex
    //         for(let image in images){

    //         }
    //         return response.redirect().toRoute('seller.posts')
    //     }
    // }
    async create({ view }: HttpContext) {
        return view.render('create')
    }

    async store({ auth, request, response }: HttpContext) {
        // console.log("store")
        const user = auth.getUserOrFail()
        const userId = user.id
        let post = new Post
        post.userId = userId!
        post.title = request.input('title')
        post.body = request.input('body')
        post.price = request.input('price')
        post.brand = request.input('brand')
        post.model = request.input('model')
        post.weight = request.input('weight')
        post.balance = request.input('balance')
        post.flex = request.input('flex')
        post.grip = request.input('grip')
        const newpost = await post.save()
        for (let index = 0; index < 5; index++) {
            if (request.files('fileInput[' + index + ']')[0] === undefined || request.files('fileInput[' + index + ']')[0] === null) {
                break;
            }
            const imgFile = request.files('fileInput[' + index + ']')[0];
            const fileName = `${new Date().getTime()}-${index}.${imgFile.extname}`
            const filePath = 'public/uploadimage'
            // console.log(imgFile)
            await imgFile.move(filePath, {
                name: fileName,
                overwrite: true
            })
            let image = new Image
            image.postId = newpost.id
            image.filePath = `${filePath}/${fileName}`
            await image.save()
        }
        return response.redirect().toRoute('seller.posts')
    }
}