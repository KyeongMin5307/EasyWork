"use client";
import React, { useContext, useState } from "react";
import styles from "./ResultResume.module.css";
import { ResultContext } from "@/context/ResultContext";
import makePdf from "@/utils/makePdf";
import Webcam from "react-webcam";
import { imageUpload } from "@/cloudinary/imageUpload";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function ResultResume() {
  const [imageUrl, setImageUrl] = useState(null);
  const {
    state: { result },
    dispatch,
  } = useContext(ResultContext);
  const [isWebcam, setIsWebcam] = useState(false);
  const pdf = makePdf(styles.pdf);
  const handlePdf = async () => {
    await pdf.viewWithPdf();
  };
  const webcamRef = React.useRef<Webcam | null>(null);
  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    const file = new File([imageSrc as string], "cam_picture.jpeg", { type: "image/jpeg" });
    console.log(file);
    const url = await imageUpload(file);
    setImageUrl(url);
    console.log(url);
    setImageUrl(url);
  }, [webcamRef]);
  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const url = await imageUpload(e.target.files[0]);
      console.log(url);
      setImageUrl(url);
    }
    // const url = await imageUpload(e.target.files);
    // console.log(url);
  };
  return (
    <section className={styles.section}>
      <div className={styles.pdf}>
        <div className={styles.top_container}>
          <div className={styles.top_content}>
            <h2 className={styles.name}>홍길동</h2>
          </div>
          {imageUrl ? (
            <img src={imageUrl} height={360} width={360} />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="360"
              height="394"
              viewBox="0 0 360 394"
            >
              <g id="그룹_422" data-name="그룹 422" transform="translate(-1422.044 -112.09)">
                <image
                  id="_3106921"
                  data-name="3106921"
                  width="360"
                  height="360"
                  transform="translate(1422.044 146.09)"
                  opacity="0.09"
                  xlinkHref="data:image/png;base64,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"
                />
                <g
                  id="사각형_176"
                  data-name="사각형 176"
                  transform="translate(1449.044 112.09)"
                  fill="none"
                  stroke="#1e1e1e"
                  stroke-width="2"
                >
                  <rect width="304" height="367" stroke="none" />
                  <rect x="1" y="1" width="302" height="365" fill="none" />
                </g>
              </g>
            </svg>
          )}
        </div>
      </div>
      {isWebcam && (
        <Webcam
          audio={false}
          height={720}
          screenshotFormat="image/jpeg"
          width={1280}
          ref={webcamRef}
          videoConstraints={videoConstraints}
        />
      )}
      <button onClick={capture}>Capture photo</button>
      <button onClick={handlePdf}>pdf 만들기</button>
      <input type="file" onChange={addImage} />
    </section>
  );
}