
const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
	const bearerHeader = req.headers["authorization"]

	if (typeof bearerHeader !== "undefined") {
		const bearerToken = bearerHeader.split(" ")[1]
			jwt.verify( 
				bearerToken,
				process.env.SECRET,
				async (error, payload) => {
					if (error) {
						res.status(403).json({ message: "Bad token" })
					} else {
						req.role = payload.user.role
						req.id = payload.user.id
						next()
					}
				}
				
		)
		
	} else {
		res.status(403).json({ message: "Bad token" })
	}
}

module.exports = { verifyToken }
