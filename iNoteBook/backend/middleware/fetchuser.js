var jwt = require('jsonwebtoken');
const jwt_screat = "SurajisABadBoy";

const fetchuser = (req, res, next) => {
    //get user fro the jwt token and add id to req obj
    const token = req.header('auth-token');
    if (!token) { return res.status(401).send({ msg: "No valid Token Provided" }); }
    try {
        const data = jwt.verify(token, jwt_screat);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ msg: "No Token Provided" });
    }

}
module.exports = fetchuser;