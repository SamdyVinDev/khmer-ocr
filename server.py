from typing import List
from detect import run as detectImage
from fastapi import FastAPI, File, UploadFile
import shutil
from datetime import datetime
import os
from time import sleep

app = FastAPI()


@app.get("/")
async def index():
    return "Server is running"


@app.post("/crop-pdf")
async def crop_pdf(files: List[UploadFile] = File(...)):
    res = {"feature": "Crop PDF", "filenames": [file.filename for file in files]}
    return res


@app.post("/pdf-to-image")
def pdf_to_image(files: List[UploadFile] = File(...)):

    uploaded_files = []
    converted_files = []
    cop_urls = []
    folder_name = datetime.now().strftime("%d-%m-%Y_%H:%M:%S")
    dir = f"uploads/{folder_name}"

    os.mkdir(dir)

    for file in files:
        with open(f"{dir}/{file.filename}", "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            uploaded_files.append(f"{dir}/{file.filename}")

    sleep(2)

    for url in uploaded_files:
        print(f"Detecting url:{url}")

        detectImage(
            weights="runs/train/yolov5s_results/weights/best.pt",
            imgsz=(512, 512),
            conf_thres=0.4,
            save_crop=True,
            source=url,
        )
        sleep(2)

    # os.system(
    #     f"python detect.py --weights runs/train/yolov5s_results/weights/best.pt --img 512 --conf 0.4 --source '{url}' --save-crop"
    # )

    res = {
        "feature": "PDF to Image",
        "uploaded_files": uploaded_files,
        "converted_files": converted_files,
        "total": len(files),
    }
    return res


@app.post("/pdf-to-word")
async def pdf_to_word(files: List[UploadFile] = File(...)):
    res = {"feature": "PDF to Word", "filenames": [file.filename for file in files]}
    return res
