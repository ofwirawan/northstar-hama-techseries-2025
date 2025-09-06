import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './FeaturePage.module.css';
import { FilePreview } from '../components/FilePreview';

// Local assets (adjust paths if yours differ)
import leftIcon from '../assets/change-language-translation-assets/left.svg';
import expandIcon from '../assets/change-language-translation-assets/expand.svg';
import searchIcon from '../assets/change-language-translation-assets/search.svg';
import { useCurrentLanguage } from './MainPage';
const FeaturePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // --- UI state ---
  const [filename, setFilename] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileType, setFileType] = useState('');
  const [showOriginal, setShowOriginal] = useState(false);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Text from backend (demo endpoint)
  const [translated, setTranslated] = useState('');
  const [currentLanguage, setCurrentLanguage] = useCurrentLanguage();


  // Prefer router state, fall back to localStorage
  const parsed = useMemo(() => {
    if (state?.parsed) return state.parsed;
    const saved = localStorage.getItem('parsedDoc');
    return saved ? JSON.parse(saved) : null;
  }, [state]);

  // Redirect if no parsed payload
  useEffect(() => {
    if (!parsed) {
      navigate('/', { replace: true });
    }
  }, [parsed, navigate]);

  // Extract file preview info if available
  useEffect(() => {
    if (!parsed) return;

    const name = parsed.originalFileName || parsed.file?.name || '';
    const type = parsed.mimeType || parsed.file?.type || '';
    setFilename(name);
    setFileType(type);

    let createdUrl = '';
    if (parsed.objectUrl) {
      setFileUrl(parsed.objectUrl);
    } else if (parsed.file instanceof File) {
      createdUrl = URL.createObjectURL(parsed.file);
      setFileUrl(createdUrl);
    }

    return () => {
      if (createdUrl) URL.revokeObjectURL(createdUrl);
    };
  }, [parsed]);

  // Demo translate fetch
  const handleTranslate = async () => {
    try {
      const res = await fetch('http://localhost:8000/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      setTranslated(data.message ?? '');
    } catch (err) {
      console.error('Error fetching:', err);
      setTranslated('Error loading message');
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((m) => [...m, input.trim()]);
    setInput('');
  };

  const renderFileContent = (fileUrl, fileType, filename) => {
    if (!fileUrl || !fileType) return <p className={styles.muted}>No file available</p>;
    if (fileType.startsWith('image/')) {
      return <img src={fileUrl} alt={filename || 'Uploaded image'} className={styles.previewImage} />;
    }
    if (fileType === 'application/pdf') {
      return <embed src={fileUrl} type="application/pdf" className={styles.pdfEmbed} />;
    }
    return <p className={styles.muted}>{translations[currentLanguage].viewReject}</p>;
  };

  if (!parsed) return null; // will navigate away

  // Prefer explicit fields; fall back gracefully
  const parsedText =
    typeof parsed === 'string'
      ? parsed
      : parsed?.text ?? '';

  const originalText =
    typeof parsed?.originalText === 'string'
      ? parsed.originalText
      : parsed?.raw ?? '';

  const summaryText =
    parsed?.summary
      ? parsed.summary
      : translated || 'No summary yet. Click "Translate" to fetch a demo response.';

  return (
    <React.Fragment>
    {showOriginal && (
      <React.Fragment>
        <div
          className={styles.dragWrapper}
        >
          <FilePreview 
            renderFileContent={renderFileContent} 
            filename={filename} 
            fileUrl={fileUrl} 
            fileType={fileType} 
            setShowOriginal={setShowOriginal}
            showOriginal={showOriginal}
            currentLanguage={currentLanguage}
          />
        </div>
        <div className={styles.blurOverlay} />
      </React.Fragment>
    )}
    
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate("/")}
            aria-label="Go back"
          >
            <img src={leftIcon} alt="" />
          </button>
          <div className={styles.brandSection}>
            <h4 className={styles.brand}>NorthStar</h4>
            <h1 className={styles.title}>{translations[currentLanguage].featurePageHeading}</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Left Panel - Text */}
        <section className={styles.textPanel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>
              {translations[currentLanguage].translatedHeading}
            </h2>
            <div className={styles.panelActions}>
              <button
                type="button"
                className={styles.actionButton}
                onClick={() => setShowOriginal((s) => !s)}
                title={showOriginal ? f`${translations[currentLanguage].translatedHeading}` : f`${translations[currentLanguage].originalText}`}
              >
                <img src={expandIcon} alt="" />
                <span>{translations[currentLanguage].originalText}</span>
              </button>
            </div>
          </div>

          <div className={styles.textContent}>
            <p className={styles.textBody}>
              {(translated || parsedText || '(no translated text yet)')}
            </p>
          </div>
        </section>

        {/* Right Panel - Summary & Chat */}
        <aside className={styles.rightPanel}>
          {/* Summary Section */}
          <section className={styles.summaryPanel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>{translations[currentLanguage].summaryHeading}</h2>
            </div>

            <div className={styles.summaryContent}>
              {/* AI Summary */}
              <div className={styles.aiMessage}>
                {summaryText}
              </div>

              {/* User Messages */}
              {messages.map((msg, idx) => (
                <div key={idx} className={styles.userMessage}>
                  {msg}
                </div>
              ))}
            </div>
          </section>

          {/* Chat Input */}
          <form className={styles.chatForm} onSubmit={handleSend}>
            <div className={styles.chatInputContainer}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={translations[currentLanguage].chatPlaceholder}
                className={styles.chatInput}
                rows="1"
              />
              <button type="submit" className={styles.sendButton} title="Send">
                <img src={searchIcon} alt="Send" />
              </button>
            </div>
          </form>

        </aside>
      </main>
    </div>
    </React.Fragment>
  );
};

export default FeaturePage;