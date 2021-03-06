var secret = require('../config/config').secret
const model = require('../models/datasource')


exports.auth = async (req, resp, next) => {

    // For quick testing
    // const user = await model.user.select('id', 4);
    // req.session.user = user.rows[0]

    if (req.session.user) {
        console.log('[user data]', req.session.user);
        next();
    } else {
        if (req.headers['Content-Type'] === 'application/json') {
            resp.status(401).send({
                success: false, 
                message: 'Unauthorized'
            });
        } else {
            resp.redirect('/login')
        }
    }
}

exports.activated = (req, resp, next) => {
    const user = req.session.user;

    if (user.email_verified !== null && user.email_verified !== false) {
        next();
    } else {
        resp.redirect('/activate')
    }
}

exports.isAdmin = (req, resp, next) => {
    if (req.session.user.role === 'admin') {
        next()
    } else {
        resp.redirect('/')
    }
}

exports.isCompany = (req, resp, next) => {
    if (req.session.user.role === 'owner') {
        next()
    } else {
        resp.redirect('/admin')
    }
}