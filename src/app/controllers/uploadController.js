class uploadController {
    saveImage(req, res) {
        console.log(req);
        if (!req.files) {
            return res.status(400).json({
                code : 0,
                message : "No file were Uploaded"
            });
        }

        // Trả về đường dẫn của ảnh đã lưu
        let images = [];
        req.files.forEach((file) => {
            images.push(
                `${process.env.APP_HOST_DEVELOPMENT}/images/${file.filename}`
            );
        });
        res.status(200).json({
            code : 200,
            images 
        })
    }
}

module.exports = new uploadController();
