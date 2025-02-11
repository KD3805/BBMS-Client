// File: ThalassemiaDetection.js
import React, { useState } from "react";

function ThalassemiaDetection() {
  const [file, setFile] = useState(null);
  const [extractedParams, setExtractedParams] = useState(null);
  const [formParams, setFormParams] = useState({});
  const [predictionResult, setPredictionResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    // Reset state if a new file is chosen.
    setExtractedParams(null);
    setFormParams({});
    setPredictionResult(null);
  };

  // Step 1: Upload file and retrieve extracted parameters.
  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("http://localhost:8000/upload-report/", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setExtractedParams(data.extracted_parameters);
      setFormParams(data.extracted_parameters); // Pre-populate the form.
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Step 2: Allow the user to modify/review the extracted parameters.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Step 3: Submit the reviewed parameters for prediction.
  const handlePredict = async () => {
    try {
      const res = await fetch("http://localhost:8000/predict-report/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formParams),
      });
      const data = await res.json();
      setPredictionResult(data);
    } catch (error) {
      console.error("Error predicting report:", error);
    }
  };

  return (
    <div>
      <h2>Upload Blood Report</h2>
      <input type="file" accept=".pdf,image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Extract Parameters</button>

      {extractedParams && (
        <div>
          <h3>Review and Modify Extracted Parameters</h3>
          <form>
            <div>
              <label>Sex: </label>
              <input
                type="text"
                name="sex"
                value={formParams.sex || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Hemoglobin (hb): </label>
              <input
                type="number"
                step="0.1"
                name="hb"
                value={formParams.hb || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>PCV: </label>
              <input
                type="number"
                step="0.1"
                name="pcv"
                value={formParams.pcv || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>RBC: </label>
              <input
                type="number"
                step="0.1"
                name="rbc"
                value={formParams.rbc || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>MCV: </label>
              <input
                type="number"
                step="0.1"
                name="mcv"
                value={formParams.mcv || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>MCH: </label>
              <input
                type="number"
                step="0.1"
                name="mch"
                value={formParams.mch || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>MCHC: </label>
              <input
                type="number"
                step="0.1"
                name="mchc"
                value={formParams.mchc || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>RDW: </label>
              <input
                type="number"
                step="0.1"
                name="rdw"
                value={formParams.rdw || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>WBC: </label>
              <input
                type="number"
                step="0.1"
                name="wbc"
                value={formParams.wbc || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Neutrophils (neut): </label>
              <input
                type="number"
                step="0.1"
                name="neut"
                value={formParams.neut || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Lymphocytes (lymph): </label>
              <input
                type="number"
                step="0.1"
                name="lymph"
                value={formParams.lymph || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Platelets (plt): </label>
              <input
                type="number"
                step="0.1"
                name="plt"
                value={formParams.plt || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>HbA: </label>
              <input
                type="number"
                step="0.1"
                name="hba"
                value={formParams.hba || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>HbA2: </label>
              <input
                type="number"
                step="0.1"
                name="hba2"
                value={formParams.hba2 || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>HbF: </label>
              <input
                type="number"
                step="0.1"
                name="hbf"
                value={formParams.hbf || ""}
                onChange={handleChange}
              />
            </div>
          </form>
          <button onClick={handlePredict}>Confirm and Predict</button>
        </div>
      )}

      {predictionResult && (
        <div>
          <h3>Prediction Results</h3>
          <p>
            <strong>Prediction:</strong> {predictionResult.prediction}
          </p>
          <p>
            <strong>Report ID:</strong> {predictionResult.report_id}
          </p>
          <pre>{JSON.stringify(predictionResult.parameters, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ThalassemiaDetection;
