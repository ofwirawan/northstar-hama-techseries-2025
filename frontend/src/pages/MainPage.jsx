import React, { useState } from 'react';
import styles from './MainPage.module.css'
import { FeatureShapeOne } from '../assets/Icons';

const OpenPage = () => {
        class NorthStarInterface {
        constructor() {
            this.initializeEventListeners();
            this.initializeAnimations();
        }

        initializeEventListeners() {
            const languageBtn = document.getElementById('languageBtn');
            if (languageBtn) {
                languageBtn.addEventListener('click', this.handleLanguageChange.bind(this));
            }

            const uploadCard = document.getElementById('uploadCard');
            const chatCard = document.getElementById('chatCard');

            if (uploadCard) {
                uploadCard.addEventListener('click', this.handleUploadFeature.bind(this));
                uploadCard.style.cursor = 'pointer';
            }

            if (chatCard) {
                chatCard.addEventListener('click', this.handleChatFeature.bind(this));
                chatCard.style.cursor = 'pointer';
            }
        }

        initializeAnimations() {
            // Add intersection observer for scroll-triggered animations
            if ('IntersectionObserver' in window) {
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.animationPlayState = 'running';
                        }
                    });
                }, observerOptions);

                // Observe feature cards for scroll animations
                const featureCards = document.querySelectorAll('.featureCard');
                featureCards.forEach(card => observer.observe(card));
            }
        }

        handleLanguageChange() {
            // Language change functionality
            console.log('Language change requested');
            
            // Add visual feedback
            const button = document.getElementById('languageBtn');
            button.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                button.style.transform = 'scale(1)';
                // Here you would typically show a language selection modal
                this.showLanguageOptions();
            }, 150);
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

        showLanguageOptions() {
            const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];
            const selection = prompt(`Select a language:\n${languages.map((lang, i) => `${i + 1}. ${lang}`).join('\n')}`);
            
            if (selection) {
                console.log(`Language changed to: ${languages[parseInt(selection) - 1] || 'English'}`);
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
    return (
    <div className={styles.container}>
      <header className={styles.headerGreeting}>
        Hi, {name}
      </header>

      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>NorthStar</h1>
        <p className={styles.subtitle}>Light the way to fair work</p>

        <button
          type="button"
          className={styles.languageButton}
          aria-label="Change language"
        >
          Change language
        </button>

        <section className={styles.featuresContainer}>
          <article className={styles.featureCard} data-testid="upload-card">
            <div className={styles.featureIcon}>
                <FeatureShapeOne>
                <span className={styles.documentIcon} />
                </FeatureShapeOne>
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
            <div className={styles.featureIcon} aria-hidden="true">
              <span className={styles.chatIcon} />
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
    )
}

export default OpenPage