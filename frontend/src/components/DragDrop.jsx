import React, { useRef, useState } from "react";
import styles from "./DragDrop.module.css";
import { ArrowUpFromLine, ChevronRight, Laptop } from "lucide-react";

const ACCEPTED_TYPES = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
const ACCEPTED_EXTENSIONS = [".pdf", ".png", ".jpg", ".jpeg"];
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

const DragDrop = () => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) return "Please select a PDF, PNG, or JPG file";
    if (file.size > MAX_FILE_SIZE) return "File size must be less than 15MB";
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
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const upload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    try {
      // mock upload
      await new Promise((r) => setTimeout(r, 1200));
      alert("File uploaded successfully!");
      removeFile();
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
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
          <h1 className={styles.title}>Translate Document</h1>

          {/* Drop zone */}
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
            <span className={styles.dzText}>Upload from My Computer</span>
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
            disabled={!selectedFile || isUploading}
          >
            <div className={styles.uploadIcon}>
              <ArrowUpFromLine /> 
            </div>
            Upload
          </button>
        </div>
      </div>
  );
};

export default DragDrop;
