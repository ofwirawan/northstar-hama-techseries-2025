import { CircleCheckBig } from 'lucide-react';
import styles from './FilePreview.module.css'
import React, { useState } from "react";
import { translations } from '../assets/Translations';

export const FilePreview = ({ showOriginal, setShowOriginal, renderFileContent, filename, fileType, fileUrl }) => {
  const [error, setError] = useState(null);

  return (
    <div className={styles.center}>
      <div className={styles.card}>
        <h1 className={styles.title}>{showOriginal ? f`${translations[currentLanguage].oriFile}` : "Preview"}</h1>
        {(filename || fileUrl) && (
        <section className={styles.filePreview}>
            <div className={styles.previewHeader}>
            <strong>File preview</strong>
            <span className={styles.fileInfo}>
                {filename}
            </span>
            </div>
            <div className={styles.previewBody}>
            {renderFileContent(fileUrl, fileType, filename)}
            </div>
            <button className={styles.doneButton} onClick={()=> {setShowOriginal(false)}}>
                <CircleCheckBig />{translations[currentLanguage].doneButton}
            </button>
        </section>
        )}
        <div className={`${styles.error} ${error ? styles.show : ""}`}>{error}</div>

      </div>
    </div>
  );
};
