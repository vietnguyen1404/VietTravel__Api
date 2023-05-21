const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;
const user = require('../app/models/User')
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

exports.generateToken = async (payload, secretSignature, tokenLife) => {
    try {
        return await sign(
            {
                payload,
            },
            secretSignature,
            {
                algorithm: "HS256",
                expiresIn: tokenLife,
            }
        );
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
};

exports.updateRefreshToken = async (username, refreshToken) => {
    try {
        await user
            .find({ username: username })
            .assign({ refreshToken: refreshToken })
            .write();
        return true;
    } catch {
        return false;
    }
};

exports.decodeToken = async (token, secretKey) => {
	try {
		return await verify(token, secretKey, {
			ignoreExpiration: true,
		});
	} catch (error) {
		console.log(`Error in decode access token: ${error}`);
		return null;
	}
};