import React, { useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './FeaturePage.module.css'

const FeaturePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [filename, setFilename] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");

  const parsed = useMemo(() => {
    if (state?.parsed) return state.parsed;
    const saved = localStorage.getItem('parsedDoc');
    return saved ? JSON.parse(saved) : null;
  }, [state]);

  useEffect(() => {
    if (!parsed) {
      navigate('/', { replace: true });
    }
  }, [parsed, navigate]);

  if (!parsed) return null;

  const parsedText =
  typeof parsed === 'string' ? parsed : parsed?.text ?? '';

  return (
    <div className={styles.page}>
      <h4 className={styles.brand}>NorthStar</h4>

      <div className={styles.heading}>
        <button type="button" className={styles.iconButton} aria-label="Back">
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
            <h1 className={styles.boxTitle}>Translated Text</h1>
            <button type="button" className={styles.ctaButton}>
              <img
                src={"src/assets/expand.svg"} // or expandIcon
                alt=""
                className={styles.icon}
              />
              <b className={styles.ctaLabel}>See original text</b>
            </button>
          </header>

          <div className={styles.textContent}>
            <p className={styles.paragraph}>{parsedText}</p>
            <pre className={styles.pre}>{JSON.stringify(parsed, null, 2)}</pre>
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