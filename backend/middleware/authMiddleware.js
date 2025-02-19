const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).json({ error: "Access Denied. No Token Provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || "secret_tk");
        req.user = verified.user;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid Token" });
    }
};

module.exports = authenticate;
