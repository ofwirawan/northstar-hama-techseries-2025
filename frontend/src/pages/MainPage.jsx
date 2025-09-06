import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css';
import { FeatureShapeOne, FeatureShapeTwo } from '../assets/Icons';
import { Globe } from 'lucide-react';
import DragDrop from '../components/DragDrop';
import {translations} from "../assets/Translations.jsx"

export function useCurrentLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem("currentLanguage") || "en";
  });

  useEffect(() => {
    localStorage.setItem("currentLanguage", currentLanguage);
  }, [currentLanguage]);


  return [currentLanguage, setCurrentLanguage];
}

export const MainPage = () => {
  const navigate = useNavigate();

  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isFileMode, setIsFileMode] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useCurrentLanguage();

  const handleFileParsed = (parsed) => {
    localStorage.setItem('parsedDoc', JSON.stringify(parsed));
    // Navigate to feature page instead of conversation
    navigate('/conversation', { state: { parsed }, replace: true });
    setIsUploadingFile(false);
  };
  
  return (
    <>
      {isUploadingFile && <div className={styles.blurOverlay} />}

      <div className={styles.container}>
        <main className={styles.mainContent}>
          <h1 className={styles.mainTitle}>NorthStar</h1>
          <p className={styles.subtitle}>{translations[currentLanguage]}</p>

          <button type="button" className={styles.languageButton} aria-label="Change Language">
            <div className={`${styles.featureIcon} ${styles.languageIcon}`}>
              <Globe />
            </div>
            {translations[currentLanguage].changeLanguage}
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
                  {translations[currentLanguage].optionOneHeading}
                </h3>
                <p className={styles.featureDescription}>
                  {translations[currentLanguage].optionOneDesc}
                </p>
              </div>
            </article>

            <article className={styles.featureCard} data-testid="chat-card">
              <div className={styles.featureIcon}>
                <FeatureShapeTwo />
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>
                  {translations[currentLanguage].optionTwoHeading}
                </h3>
                <p className={styles.featureDescription}>{translations[currentLanguage].optionTwoDesc}</p>
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
              currentLanguage={currentLanguage}
            />
          </div>
        </div>
      )}
    </>
  );
};
