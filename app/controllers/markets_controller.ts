import Image from '#models/image'
import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class MarketsController {

    async index({ view }: HttpContext) {
        const posts = await Post.query().preload('images').preload('user')
        return view.render('market', { posts: posts })
    }

    async show({ view, params }: HttpContext) {
        const id = params.id
        const post = await Post.query().where('id', id).first()
        const images = await Image.query().where('postId', id)
        return view.render('show', { post: post, images: images })
    }

    async filter({ request, view }: HttpContext) {
        const searchModel = request.input('searchModel')
        const brand = request.input('brand')
        const weight = request.input('weight')
        const flex = request.input('flex')
        const grip = request.input('grip')
        const balance = request.input('balance')
        const minPrice = request.input('minPrice')
        const maxPrice = request.input('maxPrice')
        const priceHiLow = request.input('priceHiLow')
        const dateNewOld = request.input('dateNewOld')
        const query = Post.query()
        // searchModel != null ? query.whereLike('model',`%${searchModel}%`):''
        // brand != 'null' ? query.where('brand',brand):''
        // weight != 'null' ? query.where('weight',weight):''
        // flex != 'null' ? query.where('flex',flex):''
        // grip != 'null' ? query.where('grip',grip):''
        // balance != 'null' ? query.where('balance',balance):''
        // minPrice != null && maxPrice != null ? query.where('price','>=',minPrice).andWhere('price','<=',maxPrice)
        // : minPrice != null ? query.where('price','>=',minPrice) : query.where('price','<=',maxPrice)
        if (searchModel != null) {
            query.where('model','LIKE',`%${searchModel}%`)
        }
        if (brand !== 'null') {
            query.where('brand', brand)
        }
        if (weight !== 'null') {
            query.where('weight', weight)
        }
        if (flex !== 'null') {
            query.where('flex', flex)
        }
        if (grip !== 'null') {
            query.where('grip', grip)
        }
        if (balance !== 'null') {
            query.where('balance', balance)
        }
        if (minPrice != null && maxPrice != null) {
            query.where('price', '>=', minPrice).andWhere('price', '<=', maxPrice)
        } else if (minPrice != null) {
            query.where('price', '>=', minPrice)
        } else if (maxPrice != null) {
            query.where('price', '<=', maxPrice)
        }
        if (priceHiLow === 'low'){
            query.orderBy('price','asc')
        }else if(priceHiLow === 'high'){
            query.orderBy('price','desc')
        }
        if (dateNewOld === 'new'){
            query.orderBy('createdAt','desc')
        }
        if (dateNewOld === 'old'){
            query.orderBy('createdAt','asc')
        }
        query.preload('images').preload('user')
        const posts = await query
        return view.render('market', { posts: posts })
    }

}