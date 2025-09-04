import React, { useEffect, useState } from 'react';
import styles from './MainPage.module.css'
import { FeatureShapeOne, FeatureShapeTwo } from '../assets/Icons';
import { Globe } from 'lucide-react';
import DragDrop from '../components/DragDrop';

const OpenPage = () => {

  const [isUploadingFile, setIsUploadingFile] = useState(false)
    
  class NorthStarInterface {
  constructor() {
      this.initializeEventListeners();
      this.initializeAnimations();
  }


  handleUploadFeature() {
      // Document upload functionality
      console.log('Upload feature clicked');
      this.addClickFeedback('uploadCard');
      
      // Simulate file upload dialog
      setTimeout(() => {
          alert('File upload dialog would open here');
      }, 200);
  }

  handleChatFeature() {
      // Chat feature functionality
      console.log('Chat feature clicked');
      this.addClickFeedback('chatCard');
      
      // Simulate chat interface opening
      setTimeout(() => {
          alert('Chat interface would open here');
      }, 200);
  }

  addClickFeedback(cardId) {
      const card = document.getElementById(cardId);
      if (card) {
          card.style.transform = 'scale(0.98) translateY(-5px)';
          
          setTimeout(() => {
              card.style.transform = '';
          }, 200);
      }
  }
}

document.addEventListener('DOMContentLoaded', () => {
    new NorthStarInterface();
});

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 16);
    };
}

useEffect(() => {
  console.log("KONTOL", isUploadingFile)  
}, [isUploadingFile])

return (
<React.Fragment>
{isUploadingFile && (
    <div 
      className={styles.blurOverlay}
      onClick={() => {
        setIsUploadingFile(false);
      }}
    />
)
}

<div className={styles.container}>
  <main className={styles.mainContent}>
    <h1 className={styles.mainTitle}>NorthStar</h1>
    <p className={styles.subtitle}>Light the way to fair work</p>

    <button
      type="button"
      className={styles.languageButton}
      aria-label="Change Language"
    >
      <div className={`${styles.featureIcon} ${styles.languageIcon}`}>
        <Globe />
      </div>
      
      Change language
    </button>

    <section className={styles.featuresContainer}>
      <article className={styles.featureCard} data-testid="upload-card" onClick={() => setIsUploadingFile(true)}>
        <div className={styles.featureIcon}>
            <FeatureShapeOne/>
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
            <FeatureShapeTwo/>
        </div>
        <div className={styles.featureContent}>
          <h3 className={styles.featureTitle}>
            Only got a verbal job offer, or unsure about your job documents?
          </h3>
          <p className={styles.featureDescription}>
            Ask the chatbot for help
          </p>
        </div>
      </article>
    </section>
  </main>
</div>
{isUploadingFile && (
  <>
    <div className={styles.dragWrapper} onClick={()=>{setIsUploadingFile(false)}}>
      <div onClick={(e) => e.stopPropagation()}>
        <DragDrop/>
      </div>
    </div>
  </>
)}
</React.Fragment>
)
}

export default OpenPage