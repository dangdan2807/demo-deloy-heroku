const postModel = require('../models/post.model');
const selectPosterField = ['firstName', 'lastName', 'typeName'];

const MAX_LIMIT = 16;
const MIN_LIMIT = 1;

class PostService {
    getPosts = async () => {
        const posts = await postModel
            .find({ deleted: false })
            // .populate('author', selectPosterField)
            .populate('poster', selectPosterField)
            .limit(MAX_LIMIT);
        return posts;
    };

    getBooksByUserId = async (posterId) => {
        const posts = await postModel
            .find({ poster: posterId, deleted: false })
            .populate('poster', selectPosterField)
            .limit(MAX_LIMIT);
        return posts;
    };

    getPostBySlug = async (slug) => {
        const post = await postModel
            .findOne({ slug, deleted: false })
            .populate('poster', selectPosterField)
        return post;
    };

    createNewPost = async (post) => {
        return await post.save();
    };

    updatePost = async (postId, post) => {
        const postUpdateCondition = { _id: postId, author: post.author };
        const updateBook = await postModel.findOneAndUpdate(postUpdateCondition, post, {
            new: true,
        });
        return updateBook;
    };

    sortDeletePost = async (postId, userId) => {
        const postSortDeleteCondition = { _id: postId, author: userId };
        const deletePost = await postModel.findOneAndUpdate(
            postSortDeleteCondition,
            { deleted: true },
            { new: true },
        );
        return deletePost;
    };

    hardDeletePost = async (postId, userId) => {
        const postHardDeleteCondition = { _id: postId, author: userId };
        const deletePost = await postModel.findOneAndDelete(postHardDeleteCondition);
        return deletePost;
    };
}

module.exports = new PostService();
