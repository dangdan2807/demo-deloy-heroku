const postModel = require('../models/post.model');
const postService = require('../services/post.service');

class PostController {
    // [GET] /posts/
    getPosts = async (req, res) => {
        try {
            const posts = await postService.getPosts();
            res.status(200).json({
                success: true,
                message: 'Lấy danh sách bài viết thành công',
                posts,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi kết nối đến server',
            });
        }
    };

    // [GET] /posts/user/:id
    getPostsByUserId = async (req, res) => {
        try {
            const posts = await postService.getBooksByUserId(req.params.id);
            res.status(200).json({
                success: true,
                message: 'Lấy bài viết thành công',
                posts,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi kết nối đến server',
            });
        }
    };

    // [GET] /posts/:slug
    getPostBySlug = async (req, res) => {
        try {
            const slug = req.params.slug;
            if (!slug) {
                return res.status(404).json({
                    success: false,
                    message: 'Đường đẫn không hợp lệ',
                    post: {}
                });
            }
            let statusCode = 400;
            let success = false;
            let message = 'Không tìm thấy bài đăng'
            let post = {};
            const result = await postService.getPostBySlug(slug);
            if (result) {
                statusCode = 200;
                message = 'Lấy bài đăng thành công';
                success = true;
                post = result;
            }
            res.status(statusCode).json({
                success,
                message,
                post,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi kết nối đến server',
            });
        }
    };

    // [POST] posts/
    createNewPost = async (req, res, next) => {
        const { title, description, price, quantity, images } = req.body;
        if (!title || !description) {
            res.status(400).json({
                success: false,
                message: 'Dữ liệu không hợp lệ',
            });
        }
        try {
            const book = await new postModel({
                title,
                description,
                price,
                quantity,
                images,
                poster: req.userId,
            });
            const newBook = await postService.createNewPost(book);
            res.status(200).json({
                success: true,
                message: 'Thêm bài viết mới thành công',
                book: newBook,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi kết nối đến server',
            });
        }
    };

    // [PUT] posts/:id
    updatePost = async (req, res, next) => {
        const bookId = req.params.id;
        const { title, content, image, likeCount, deleted } = req.body;
        if (!title || !content || !image) {
            return res.status(400).json({
                success: false,
                message: 'Dữ liệu rỗng',
            });
        }
        try {
            let book = {
                title,
                content,
                author: req.userId,
                image,
                likeCount: likeCount < 0 ? 0 : likeCount,
                deleted,
            };
            const updateBook = await postService.updatePost(bookId, book);

            // Người dùng không có quyền để cập nhật bài viết hoặc không tìm thấy bài viết
            if (!updateBook) {
                return res.status(401).json({
                    success: false,
                    message: 'Không tìm thấy bài viết hoặc người dùng không đủ quyền',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Cập nhật bài viết mới thành công',
                book: updateBook,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi kết nối đến server',
            });
        }
    };

    // [DELETE] posts/:id
    sortDeletePost = async (req, res, next) => {
        try {
            const deletedBook = await postService.sortDeletePost(req.params.id, req.userId);
            // Người dùng không có quyền để cập nhật bài viết hoặc không tìm thấy bài viết
            if (!deletedBook) {
                return res.status(401).json({
                    success: false,
                    message: 'Không tìm thấy bài viết hoặc người dùng không đủ quyền',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Xoá bài viết thành công',
                book: deletedBook,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi kết nối đến server',
            });
        }
    };

    // [DELETE] posts/:id/hardDelete
    hardDeletePost = async (req, res, next) => {
        try {
            const deletedBook = await postService.hardDeletePost(req.params.id, req.userId);
            // Người dùng không có quyền để cập nhật bài viết hoặc không tìm thấy bài viết
            if (!deletedBook) {
                return res.status(401).json({
                    success: false,
                    message: 'Không tìm thấy bài viết hoặc người dùng không đủ quyền',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Cập nhật bài viết mới thành công',
                book: deletedBook,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi kết nối đến server',
            });
        }
    };
}

module.exports = new PostController();
