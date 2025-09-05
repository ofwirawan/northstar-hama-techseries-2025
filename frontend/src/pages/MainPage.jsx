import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css';
import { FeatureShapeOne, FeatureShapeTwo } from '../assets/Icons';
import { Globe } from 'lucide-react';
import DragDrop from '../components/DragDrop';

const MainPage = () => {
  const navigate = useNavigate();

  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isFileMode, setIsFileMode] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);

  const handleFileParsed = (parsed) => {
    localStorage.setItem('parsedDoc', JSON.stringify(parsed));
    navigate('/conversation', { state: { parsed }, replace: true });
    setIsUploadingFile(false);
  };

  return (
    <>
      {isUploadingFile && <div className={styles.blurOverlay} />}

      <div className={styles.container}>
        <main className={styles.mainContent}>
          <h1 className={styles.mainTitle}>NorthStar</h1>
          <p className={styles.subtitle}>Light the way to fair work</p>

          <button type="button" className={styles.languageButton} aria-label="Change Language">
            <div className={`${styles.featureIcon} ${styles.languageIcon}`}>
              <Globe />
            </div>
            Change language
          </button>

          <section className={styles.featuresContainer}>
            <article
              className={styles.featureCard}
              data-testid="upload-card"
              onClick={() => setIsUploadingFile(true)}
            >
              <div className={styles.featureIcon}>
                <FeatureShapeOne />
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>
                  Upload your document to translate and get key points.
                </h3>
                <p className={styles.featureDescription}>
                  This includes job contracts and other relevant job documents
                </p>
              </div>
            </article>

            <article className={styles.featureCard} data-testid="chat-card">
              <div className={styles.featureIcon}>
                <FeatureShapeTwo />
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>
                  Only got a verbal job offer, or unsure about your job documents?
                </h3>
                <p className={styles.featureDescription}>Ask the chatbot for help</p>
              </div>
            </article>
          </section>
        </main>
      </div>

      {isUploadingFile && (
        <div
          className={styles.dragWrapper}
          onClick={() => {
            if (!isProcessingFile) setIsUploadingFile(false);
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <DragDrop
              isProcessingFile={isProcessingFile}
              setIsProcessingFile={setIsProcessingFile}
              handleFileParsed={handleFileParsed}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
