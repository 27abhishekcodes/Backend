const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {

    const auth = req.headers['authorization'];

    console.log("Authorization:", auth);

    if (!auth) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token is required' });
    }

    try {

        const token = auth.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;
        console.log("Logged user:", req.user);

        next();

    } catch (err) {

        return res.status(403)
            .json({ 
                message: 'Unauthorized, JWT token wrong or expired',
                error: err.message
            });

    }
}

module.exports = ensureAuthenticated;