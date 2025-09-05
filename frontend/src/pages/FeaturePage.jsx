import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './FeaturePage.module.css'

const FeaturePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [filename, setFilename] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [isOriginalText, setIsOriginalText] = useState(false);

  const parsed = useMemo(() => {
    if (state?.parsed) return state.parsed;
    const saved = localStorage.getItem('parsedDoc');
    return saved ? JSON.parse(saved) : null;
  }, [state]);

  useEffect(() => {
    if (!parsed) {
      navigate('/', { replace: true });
    } else {
      // Set file information when parsed data is available
      if (parsed.file || parsed.originalFileName) {
        setFilename(parsed.originalFileName || parsed.file?.name || '');
        setFileType(parsed.mimeType || parsed.file?.type || '');
        if (parsed.objectUrl) {
          setFileUrl(parsed.objectUrl);
        } else if (parsed.file) {
          // Create object URL if not already created
          const url = URL.createObjectURL(parsed.file);
          setFileUrl(url);
          
          // Cleanup function to revoke URL when component unmounts
          return () => URL.revokeObjectURL(url);
        }
      }
    }
  }, [parsed, navigate]);

  const toggleOriginalText = () => {
    setIsOriginalText(!isOriginalText);
  };

  const renderFileContent = () => {
    if (!fileUrl || !fileType) return <p>No file available</p>;

    if (fileType.startsWith('image/')) {
      return (
        <img 
          src={fileUrl} 
          alt={filename}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      );
    } else if (fileType === 'application/pdf') {
      return (
        <embed 
          src={fileUrl} 
          type="application/pdf"
          style={{ width: '100%', height: '500px' }}
        />
      );
    } else {
      return <p>File type not supported for preview</p>;
    }
  };

  if (!parsed) return null;

  const parsedText = typeof parsed === 'string' ? parsed : parsed?.text ?? '';

  return (
    <div className={styles.page}>
      <h4 className={styles.brand}>NorthStar</h4>

      <div className={styles.heading}>
        <button 
          type="button" 
          className={styles.iconButton} 
          aria-label="Back"
          onClick={() => navigate('/')}
        >
          <img
            src={"src/assets/left.svg"} // or leftIcon
            alt=""
            className={styles.icon}
          />
        </button>
        <h1 className={styles.title}>AI Document Translation &amp; Analyzer Tool</h1>
      </div>

      <div className={styles.boxes}>
        {/* Translated Text */}
        <section className={styles.textbox}>
          <header className={styles.boxHeader}>
            <h1 className={styles.boxTitle}>
              {isOriginalText ? 'Original File' : 'Translated Text'}
            </h1>
            <button 
              type="button" 
              className={styles.ctaButton}
              onClick={toggleOriginalText}
            >
              <img
                src={"src/assets/expand.svg"} // or expandIcon
                alt=""
                className={styles.icon}
              />
              <b className={styles.ctaLabel}>
                {isOriginalText ? 'See translated text' : 'See original file'}
              </b>
            </button>
          </header>

          <div className={styles.textContent}>
            {isOriginalText ? (
              <div>
                {filename && <p><strong>File:</strong> {filename}</p>}
                {renderFileContent()}
              </div>
            ) : (
              <div>
                <p className={styles.paragraph}>{parsedText}</p>
                {/* Remove this debug info in production */}
                {/* <pre className={styles.pre}>{JSON.stringify(parsed, null, 2)}</pre> */}
              </div>
            )}
          </div>
        </section>

        {/* Summary + Chat */}
        <div className={styles.greaterSummary}>
          <section className={`${styles.textbox} ${styles.summaryBox}`}>
            <header className={styles.boxHeader}>
              <h1 className={styles.boxTitle}>Summary</h1>
            </header>

            <div className={styles.chatAi}>
              <p><strong>Salary</strong></p>
              <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>

              <p><strong>Working hours</strong></p>
              <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>

              <p><strong>Weekend policy</strong></p>
              <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            </div>

            <div className={styles.chatUser}>
              I want to ask something.
            </div>
          </section>

          <div className={styles.chatbox}>
            <img
              src={"src/assets/search.svg"} // or searchIcon
              alt=""
              className={styles.searchIcon}
            />
            <span>Lorem ipsum dolor sit amet.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturePage;