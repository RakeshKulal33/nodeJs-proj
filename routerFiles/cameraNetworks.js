let router = require('express').Router()
let cameraModel = require('../modelFiles/cameraField')
let cameraNetworkModel = require('../modelFiles/cameraNetwork')

router.post('/addCameraNetworks', async (req, res) => {

    let cameraDetails = []

    for (const details of req.body.details) {
        cameraDetails.push(details)
    }

    let foundCamNet = await cameraNetworkModel.findOne({ name: req.body.name })
    if (foundCamNet) {
        res.status(200).json({
            status: 200,
            msg: "camera networks with same name already exists",
            data: foundCamNet
        })
    }
    else {
        await cameraNetworkModel.create({
            name: req.body.name,
            description: req.body.desc,
            cameras: cameraDetails
        }).then((result) => {
            res.status(200).json({
                status: 200,
                msg: "camera network added successfully"
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


router.post('/readCameraNetwork/:id?', async (req, res) => {

    let id = req.params.id ? req.params.id : null

    try {
        if (id) {
            let foundCam = await cameraNetworkModel.findOne({ id: id })
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
            let camDetails = await cameraNetworkModel.find({})
            if (camDetails.length) {
                res.status(200).json({
                    status: 200,
                    msg: "Here is all camera details",
                    data: camDetails
                })
            } else {
                res.status(404).json({
                    status: 200,
                    msg: "No data found"
                })
            }
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/updateCameraNetwork/:id?', async (req, res) => {

    let id = req.params.id ? req.params.id : null

    let updateCam = []

    for (const camera of req.body.details) {
        updateCam.push({
            name: camera.name,
            desc: camera.desc,
            url: camera.url,
            price: camera.price
        })
    }

    if (id) {
        let foundCam = await cameraNetworkModel.findOne({ id: id })
        if (foundCam) {
            await cameraNetworkModel.updateOne({ id: id }, {
                name: req.body.name,
                description: req.body.desc,
                cameras: updateCam
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

router.post('/deleteCameraNetwork/:id?', async (req, res) => {

    let id = req.params.id ? req.params.id : null

    if (id) {
        let foundCam = await cameraNetworkModel.findOne({ id: id })
        if (foundCam) {
            await cameraNetworkModel.deleteOne({ id: id }).then(result => {
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