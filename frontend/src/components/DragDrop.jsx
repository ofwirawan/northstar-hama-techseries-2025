import React, { useRef, useState } from "react";
import styles from "./DragDrop.module.css";
import { ArrowUpFromLine, ChevronRight, Laptop } from "lucide-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {translations} from "../assets/Translations.jsx"

const ACCEPTED_TYPES = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
const ACCEPTED_EXTENSIONS = [".pdf", ".png", ".jpg", ".jpeg"];
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

const DragDrop = ({isProcessingFile, setIsProcessingFile, handleFileParsed, currentLanguage}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [processedText, setProcessedText] = useState("");
  const [originalFileUrl, setOriginalFileUrl] = useState("");

  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) return translations[currentLanguage].mimeReject;
    if (file.size > MAX_FILE_SIZE) return translations[currentLanguage].sizeReject;
    return null;
  };

  const handleFile = (file) => {
    const msg = validateFile(file);
    if (msg) {
      setError(msg);
      setSelectedFile(null);
      return;
    }
    setError("");
    setSelectedFile(file);
    // Clear previous results
    setProcessedText("");
    setOriginalFileUrl("");
  };
  

  const onInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    if (!isDragActive) setIsDragActive(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    // Only deactivate if truly leaving
    if (!dropZoneRef.current?.contains(e.relatedTarget)) setIsDragActive(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const openPicker = () => fileInputRef.current?.click();

  const removeFile = () => {
    setSelectedFile(null);
    setError("");
    setProcessedText("");
    setOriginalFileUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  function limitConsecutiveNewlines(str) {
    const normalized = str.replace(/\r\n?/g, "\n");
    return normalized.replace(/(\n[ \t]*){3,}/g, "\n\n");
  }

  const upload = async () => {
    if (!selectedFile) return;

    setIsProcessingFile(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("http://127.0.0.1:8000/upload_files/", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();

      setProcessedText(result.text);
      const objectUrl = URL.createObjectURL(selectedFile);
      setOriginalFileUrl(objectUrl);

      const payload = {
        text: limitConsecutiveNewlines(result.text), //max 2 consecutive /n to remove excessive spacing
        file: selectedFile,
        objectUrl: objectUrl,
        originalFileName: selectedFile.name,
        mimeType: selectedFile.type,
        size: selectedFile.size,
      };

      handleFileParsed?.(payload);
    } catch (error) {
      console.error("Upload error:", error);
      setError(`Upload failed: ${error.message}. Please try again.`);
    } finally {
      setIsProcessingFile(false);
    }
  };

  const fmtSize = (bytes) => {
    if (!bytes) return "0 B";
    const k = 1024, units = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${units[i]}`;
  };

  return (
      <div className={styles.center}>
        <div className={styles.card}>
          {!isProcessingFile ? (
            <React.Fragment>
            <h1 className={styles.title}>Translate Document</h1>
            <div
              ref={dropZoneRef}
              className={`${styles.dropZone} ${isDragActive ? styles.dropZoneActive : ""}`}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={openPicker}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openPicker()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_EXTENSIONS.join(",")}
                onChange={onInputChange}
                className={styles.hiddenInput}
              />
              <span className={styles.dzIcon}>
                <Laptop />
              </span>
              <span className={styles.dzText}>{translations[currentLanguage].uploadFromComputer}</span>
              <span className={styles.dzArrow}><ChevronRight/></span>
            </div>

            {/* Error */}
            <div className={`${styles.error} ${error ? " " + styles.show : ""}`}>
              {error}
            </div>

            {/* Selected file */}
            <div className={`${styles.fileCard} ${selectedFile ? " " + styles.show : ""}`}>
              <div>
                <div className={styles.fileName}>{selectedFile?.name}</div>
                <div className={styles.fileMeta}>
                  {selectedFile ? `${fmtSize(selectedFile.size)} • ${selectedFile.type}` : ""}
                </div>
              </div>
              <button className={styles.removeBtn} onClick={removeFile} aria-label="Remove file">
                ✕
              </button>
            </div>

            {/* Upload button */}
            <button
              className={styles.uploadBtn}
              onClick={upload}
              disabled={!selectedFile || isProcessingFile}
            >
              <div className={styles.uploadIcon}>
                <ArrowUpFromLine /> 
              </div>
              Upload
            </button>

            {/* Results section - only show if we have processed text */}
            {processedText && (
              <div className={styles.resultsSection}>
                <h2 className={styles.resultsTitle}>{translations[currentLanguage].fileProcessing}</h2>
                
                <div className={styles.resultsContainer}>
                  <div className={styles.originalFile}>
                    <h3>Original File</h3>
                    {selectedFile?.type.startsWith("image/") ? (
                      <img 
                        src={originalFileUrl} 
                        alt="Original file" 
                        className={styles.previewImage}
                      />
                    ) : selectedFile?.type === "application/pdf" ? (
                      <embed 
                        src={originalFileUrl} 
                        type="application/pdf" 
                        className={styles.previewPdf}
                      />
                    ) : null}
                  </div>
                  
                  <div className={styles.extractedText}>
                    <h3>Extracted Text</h3>
                    <div className={styles.textContent}>
                      {processedText}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </React.Fragment>
        ) : (
          <div className={styles.loadingContainer}>
            <DotLottieReact
              src="https://lottie.host/f4e5c5f1-c1df-4eb6-b69f-2fbf7052af0f/YRWqBj0cSd.json"
              loop
              autoplay
            />
            <p className={styles.loadingText}>{translations[currentLanguage].fileProcessing}</p>
          </div>
        )}
        </div>
      </div>
  );
};

export default DragDrop;