'use client';

import React, { useState, useEffect } from 'react';

// Cookieユーティリティ関数
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(';').shift() || '');
  }
};

interface CookieInputProps {
  cookieName: string;
  label: string;
}

const CookieInput: React.FC<CookieInputProps> = ({ cookieName, label }) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    // コンポーネントマウント時にCookieから値を読み込む
    const savedValue = getCookie(cookieName);
    if (savedValue) {
      setInputValue(savedValue);
    }
  }, [cookieName]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setCookie(cookieName, newValue);
  };

  return (
    <div>
      <label htmlFor={cookieName}>{label}: </label>
      <input
        type="text"
        id={cookieName}
        value={inputValue}
        onChange={handleInputChange}
      />
      <p>現在の値: {inputValue}</p>
    </div>
  );
};

export default CookieInput;