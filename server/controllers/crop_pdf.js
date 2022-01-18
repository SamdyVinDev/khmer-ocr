const uuid = require("uuid");
const _ = require("lodash");
const fs = require("fs");
const { apiUrl, os } = require("../utils");

const cropPdf = async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let data = [];

      if (_.isArray(req.files.files)) {
        _.forEach(_.keysIn(req.files.files), (key) => {
          let file = req.files.files[key];
          const fileType = file.mimetype.replace("image/", ".");

          const rename = uuid.v4() + fileType;

          file.mv("./uploads/" + rename);

          data.push({
            id: uuid.v4(),
            name: rename,
            type: fileType,
            path: `uploads/${rename}`,
          });
        });
      } else {
        let file = req.files.files;
        const fileType = file.mimetype.replace("image/", ".");

        const rename = uuid.v4() + fileType;

        file.mv("./uploads/" + rename);

        data.push({
          id: uuid.v4(),
          name: rename,
          type: fileType,
          path: `uploads/${rename}`,
        });
      }

      let finishedDetectFile = 0;

      data.forEach(async (file) => {
        os.execCommand(
          `python3 machine_learning/detect.py --weights machine_learning/runs/train/yolov5s_results/weights/best.pt --img 512 --conf 0.4 --source './${file.path}' --save-crop --project 'images' --name '${file.id}'`
        )
          .then((result) => {
            finishedDetectFile += 1;
            data[
              data.indexOf(file)
            ].detected_image = `${apiUrl}/images/${file.id}/${file.name}`;

            let length = 0;

            if (fs.existsSync(`images/${file.id}/crops/line`)) {
              length = fs.readdirSync(`images/${file.id}/crops/line`).length;
            }

            data[data.indexOf(file)].detected_cropped_images = [];

            Array.from(Array(length)).forEach((_, i) => {
              const key = i + 1 > 1 ? i + 1 : "";
              data[data.indexOf(file)].detected_cropped_images.push(
                `${apiUrl}/images/${file.id}/crops/line/${file.name.replace(
                  file.type,
                  key
                )}.jpg`
              );
            });

            if (finishedDetectFile === data.length) {
              res.send({
                status: true,
                message: "Files are uploaded",
                data: data,
              });
            }
          })
          .catch((error) =>
            res.send(
              res.send({
                status: false,
                message: error.message,
                error: error,
              })
            )
          );
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = cropPdf;
