let router = require('express').Router()
const { isObjectIdOrHexString } = require('mongoose')
let cameraModel = require('../modelFiles/cameraField')
let cameraNetworkModel = require('../modelFiles/cameraNetwork')

router.post('/addCamera', async (req, res) => {

    let camItems = {}

    let foundCam = await cameraModel.findOne({ cameraname: req.body.name })
    if (foundCam) {
        res.status(200).json({
            status: 200,
            msg: "camera with same name already exists with below details",
            data: foundCam
        })
    }
    else {
        await cameraModel.create({
            cameraname: req.body.name,
            description: req.body.desc,
            url: req.body.url,
            price: req.body.price
        }).then(async (result) => {

            camItems.name = result.cameraname
            camItems.description = result.description
            camItems.url = result.url
            camItems.price = result.price

            await cameraNetworkModel.create({
                name: null,
                description: null,
                cameraid: result.id,
                cameras: camItems
            })

            res.status(200).json({
                status: 200,
                msg: "camera added successfully"
            })
        }).catch(err => {
            console.log(err)
            res.status(200).json({
                status: 500,
                msg: "Internal server or db error"
            })
        })
    }
})


router.post('/readCamera/:id?', async (req, res) => {

    let id = req.params.id ? req.params.id : null
    let foundNetCam = await cameraNetworkModel.find({})
    console.log(foundNetCam)
    try {
        if (id) {
            let foundCam = await cameraModel.findOne({ id: id })
            if (foundCam) {
                res.status(200).json({
                    status: 200,
                    msg: "Here is details",
                    data: foundCam
                })
            } else {
                res.status(404).json({
                    status: 404,
                    msg: "Not found"
                })
            }
        }
        else {
            let camDetails = await cameraModel.find()
            res.status(200).json({
                status: 200,
                msg: "Here is all camera details",
                data: camDetails
            })
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/updateCamera/:id?', async (req, res) => {

    let id = req.params.id ? req.params.id : null

    if (id) {
        let foundCam = await cameraModel.findOne({ id: id })
        if (foundCam) {
            await cameraModel.updateOne({ id: id }, {
                cameraname: req.body.name,
                description: req.body.desc,
                url: req.body.url,
                price: req.body.price
            }).then(result => {
                res.status(200).json({
                    status: 200,
                    msg: "Details updated successfully"
                })
            }).catch(err => {
                if (err) {
                    res.status(500).json({
                        status: 500,
                        msg: "Found internal error"
                    })
                }
            })
        }
        else {
            res.status(404).json({
                status: 404,
                msg: "Id not found"
            })
        }
    } else {
        res.status(404).json({
            status: 404,
            msg: "Please send the request with id"
        })
    }
})

router.post('/deleteCamera/:id?', async (req, res) => {

    let id = req.params.id ? req.params.id : null

    if (id) {
        let foundCam = await cameraModel.findOne({ id: id })
        if (foundCam) {
            await cameraModel.deleteOne({ id: id }).then(async (result) => {

                await cameraNetworkModel.deleteOne({ cameraid: id })
                res.status(200).json({
                    status: 200,
                    msg: "Details deleted successfully"
                })
            }).catch(err => {
                if (err) {
                    res.status(500).json({
                        status: 500,
                        msg: "Found internal error"
                    })
                }
            })
        }
        else {
            res.status(404).json({
                status: 404,
                msg: "Id not found to delete"
            })
        }
    } else {
        res.status(404).json({
            status: 404,
            msg: "Please send the request with id"
        })
    }
})


module.exports = router