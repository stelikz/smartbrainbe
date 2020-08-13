const handleSignIn = (db, bcrypt) => (req, resp) => {
    const { email, password } = req.body
    if (!email || !password) {
        return resp.status(400).json("incorrect form submission")
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
        console.log(isValid)
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => {
                resp.json(user[0])
            })
            .catch(err => resp.status(400).json('unable to get user'))
        } else {
            resp.status(400).json("wrong credentials")
        }
    })
    .catch(err => resp.status(400).json('Wrong credentials'))
}

module.exports = {
    handleSignIn
}