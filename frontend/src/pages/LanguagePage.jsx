// LanguagePage.jsx
// page is designed for 1440x1080; handle layout in CSS.
import React from "react";
import styles from "./LanguagePage.module.css";
import leftIcon from "../assets/change-language-translation-assets/left.svg";
import { useNavigate } from "react-router-dom";
import { useCurrentLanguage } from "../hooks/useCurrentLanguage"; // adjust path
import { useEffect, useState } from "react";
import { translations } from "../assets/Translations";

export function useCurrentLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState(
    () => localStorage.getItem("currentLanguage") || "en"
  );
  useEffect(() => {
    localStorage.setItem("currentLanguage", currentLanguage);
  }, [currentLanguage]);
  return [currentLanguage, setCurrentLanguage];
}

const flagMap = {
  en: "🌐",
  id: "🇮🇩",
  tl: "🇵🇭",
  my: "🇲🇾",
  hi: "🇮🇳",
  bn: "🇧🇩",
};

const LanguageButton = ({ language, langId, current, onSelect }) => {
  const isActive = current === langId;
  const flag = flagMap[langId] || "";

  return (
    <button
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      aria-pressed={isActive}
      onClick={() => !isActive && onSelect(langId)}
    >
      <p>
        {flag} {language}
      </p>
    </button>
  );
};

const LanguagePage = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useCurrentLanguage(); // ["en","id","tl","my","hi","bn"]

  return (
    <div className={styles.page}>
      <h4 id="NorthStar"><i>NorthStar</i></h4>

      <div className={styles.heading}>
        <button
          type="button"
          className={styles.buttons}
          onClick={() => navigate(-1)}
          aria-label="Back"
          title="Back"
        >
          <img src={leftIcon} alt="" />
        </button>
        <h1>{translations[currentLanguage].changeLanguageHeading}</h1>
      </div>

      <div className={styles.languages}>
        <LanguageButton language="English" langId="en" current={currentLanguage} onSelect={setCurrentLanguage} />
        <LanguageButton language="Bahasa Indonesia" langId="id" current={currentLanguage} onSelect={setCurrentLanguage} />
        <LanguageButton language="Tagalog" langId="tl" current={currentLanguage} onSelect={setCurrentLanguage} />
        <LanguageButton language="Melayu" langId="my" current={currentLanguage} onSelect={setCurrentLanguage} />
        <LanguageButton language="Hindi" langId="hi" current={currentLanguage} onSelect={setCurrentLanguage} />
        <LanguageButton language="Bangla" langId="bn" current={currentLanguage} onSelect={setCurrentLanguage} />
      </div>
    </div>
  );
};

export default LanguagePage;
