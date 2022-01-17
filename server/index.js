const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const pdfToImage = require("./controllers/pdf_to_image");
const pdfToWord = require("./controllers/pdf_to_word");
const cropPdf = require("./controllers/crop_pdf");

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/images", express.static("./images"));

app.post("/api/v1/pdf-to-image", pdfToImage);
app.post("/api/v1/pdf-to-word", pdfToWord);
app.post("/api/v1/crop-pdf", cropPdf);

const port = process.env.PORT || 80;

app.listen(port, () => console.log(`App is listening on port ${port}.`));
