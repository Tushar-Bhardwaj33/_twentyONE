from fastapi import FastAPI
from paddleocr import PaddleOCR
import os
import subprocess

app = FastAPI()

@app.get("/")
async def extract_slide_text():
    video_path = "Backend/media/Video_Sample.mp4"
    frames_dir = "frames"
    os.makedirs(frames_dir, exist_ok=True)

    # Clear old frames
    for f in os.listdir(frames_dir):
        os.remove(os.path.join(frames_dir, f))

    # --- STEP 1: Extract keyframes using FFmpeg ---
    ffmpeg_cmd = [
        "ffmpeg",
        "-hide_banner", "-loglevel", "error",
        "-skip_frame", "nokey",
        "-i", video_path,
        "-vsync", "0",
        "-frame_pts", "true",
        f"{frames_dir}/frame_%04d.jpg"
    ]
    subprocess.run(ffmpeg_cmd, check=True)

    # --- STEP 2: Initialize PaddleOCR ---
    ocr = PaddleOCR(use_angle_cls=True, lang='en')  # English OCR

    # --- STEP 3: OCR each frame and collect text ---
    results = {}
    for file_name in sorted(os.listdir(frames_dir)):
        if not file_name.endswith(".jpg"):
            continue
        image_path = os.path.join(frames_dir, file_name)
        ocr_result = ocr.ocr(image_path, cls=True)

        text_list = [line[1][0] for line in ocr_result[0]]
        results[file_name] = text_list

    return results