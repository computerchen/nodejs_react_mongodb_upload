const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')
const uuidv4 = require('uuid/v4')
const router = express.Router()

const DIR = './public/'
const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,DIR)
    },
    filename:(req,file,cb)=>{
        const fileName = file.originalname.toLowerCase().split(' ').join('-')
        cb(null,uuidv4()+'-'+fileName)
    }
})

var upload = multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype=='image/png'||file.mimetype=='image/jpg'||file.mimetype=='image/jpeg') {
            cb(null,true)
        }
        else {
            cb(null,false)
            return cb(new Error('Only .png .jpg .jpeg allowed!'))
        }
    }
})

let User = require('../models/User')
router.post('/user-profile',upload.single('profileImg'),(req,res,next)=>{
    const url = req.protocol + '://' + req.get('host')
    const user = new User({
        name:req.body.name,
        profileImg:url+'/public/'+req.file.filename
    })

    user.save().then(result=>{
        res.status(201).json({
            message:'User registered success',
            userCreated: {
                _id:result._id,
                profileImg:result.profileImg
            }
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            message:err
        })
    })
})

router.get('/',(req,res,next)=>{
    User.find().then(data=>{
        res.status(200).json({
            message:'User list success',
            user:data
        })
    })
    .catch((err)=>{
        res.status(404).json({
            message:'Nobody found!'
        })
    })
})

module.exports = router