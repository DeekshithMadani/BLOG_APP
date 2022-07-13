const express = require('express');
const DashboardRoutes = express.Router();
const DashboardController = require('../controllers/DashboardController');


DashboardRoutes.get('/', DashboardController.blogsDataFetch);
DashboardRoutes.post('/create', DashboardController.insertBlog);
DashboardRoutes.delete('/deleteblog', DashboardController.deleteBlog);
DashboardRoutes.put('/updatestarredblog', DashboardController.updatestarredblog);
DashboardRoutes.put('/recoverBlog', DashboardController.recoverBlog);


module.exports = DashboardRoutes;