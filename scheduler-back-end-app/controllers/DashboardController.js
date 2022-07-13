const express = require('express');
const blog = require('../models/mongo_blogs_model');
const Auth = require('../models/mongo_auth_model');

const blogsDataFetch = async (req, res) => {
    try {
        uname = req.headers['uname'];
        const data = await blog.find({ uname: uname }).sort({ uploadTime: -1 });
        res.json({ status: 'ok', data });
    }
    catch (err) {
        res.json({ status: 'error' });
    }
};

const insertBlog = async (req, res) => {
    try {
        const fetch_name = await Auth.find({ uname: req.body.uname }, { firstName: 1, lastName: 1, _id: 0 });
        console.log(fetch_name);
        const data = await blog.create({ uname: req.body.uname, authorName: fetch_name[0].firstName + " " + fetch_name[0].lastName, uploadTime: req.body.uploadTime, preface: req.body.preface, content: req.body.content, starred: false, trash: false });
        res.json({ status: 'ok' });
    }
    catch (err) {
        res.json({ status: 'error' });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const Trash = await blog.find({ _id: req.body.id }, { trash: 1, _id: 0 });
        if (Trash[0].trash) {
            const data = await blog.remove({ _id: req.body.id });
        }
        else {
            const data = await blog.updateOne({ _id: req.body.id }, { $set: { trash: true, starred: false } });
        }
        const data = await blog.find({ uname: uname }).sort({ uploadTime: -1 });
        res.json({ status: 'ok', data });
    }
    catch (err) {
        res.json({ status: 'error' });
    }
}

const updatestarredblog = async (req, res) => {
    try {
        const updres = await blog.updateOne({ _id: req.body.id }, { $set: { starred: req.body.blogstarredflag } });
        const data = await blog.find({ uname: uname }).sort({ uploadTime: -1 });
        res.json({ status: 'ok', data });
    }
    catch (err) {
        res.json({ status: 'error' });
    }
}

const recoverBlog = async (req, res) => {
    try {
        const updres = await blog.updateOne({ _id: req.body.id }, { $set: { trash: false } });
        const data = await blog.find({ uname: uname }).sort({ uploadTime: -1 });
        res.json({ status: 'ok', data });
    }
    catch (err) {
        res.json({ status: 'error' });
    }
}

module.exports = { blogsDataFetch, insertBlog, deleteBlog, updatestarredblog, recoverBlog }