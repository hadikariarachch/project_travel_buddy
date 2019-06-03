const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Diary = require('../models/travelDiary');

router.get('/', (req, res, next) => {
    Diary.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const diary = new Diary({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        notes: req.body.notes
    });
    diary.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Handling POST requests to /diary",
            createdDiary: diary
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });    
});

router.get('/:diaryId', (req, res, next) => {
    const id = req.params.diaryId;
    Diary.findById(id)
    .exec()
    .then(doc => {
        console.log("From Database", doc);
        if (doc) {
            res.status(200).json(doc); 
        }else{
            res.status(404).json({
                message: "No valid entry found for the ID!"
            });
        }             
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.patch('/:diaryId', (req, res, next) => {
    const id = req.params.diaryId;
    const updateOperations = {};
    for(const ops of req.body) {
        updateOperations[ops.propName] = ops.value;
    }
    Diary.update({ _id: id }, { $set: updateOperations })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:diaryId', (req, res, next) => {
    const id = req.params.diaryId;
    Product.remove({
        _id: id
    })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;