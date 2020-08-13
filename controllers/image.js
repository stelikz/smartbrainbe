const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: CLARIFAI_API
   });

const handleImageUrl = (req, resp) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            resp.json(data)
        })
        .catch(err => resp.status(400).json(err))
}

const handleImage = (db) => (req, resp) => {
    const { id } = req.body
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        resp.json(entries[0])
    })
    .catch(err => resp.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleImageUrl
}