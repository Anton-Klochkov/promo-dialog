import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './app.module.scss';

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

interface AppPromo {
  bgColor?: RGB | RGBA | HEX;
  delay?: number;
  promoCode?: string;
  linkPartner?: string;
  linkBanner?: string;
  titleLink?: string;
}

const FormPromoModal: FC<AppPromo> = ({
  bgColor = '#ffffff',
  promoCode = 'promoCode',
  delay = 2000,
  linkPartner = 'https://www.youtube.com/',
  linkBanner = 'https://helppk.at.ua/New/l_5637.jpg',
  titleLink = 'ссылка на партнера',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  const copyPromoCode = () => {
    navigator.clipboard.writeText(promoCode);
  };

  return (
    isVisible && (
      <>
        {createPortal(
          <div
            style={{ backgroundColor: bgColor }}
            className={styles.portalContainer}
          >
            <img
              className={styles.imgBanner}
              src={linkBanner}
              alt="Partner Image"
            />
            <div>
              <input type="text" value={promoCode} readOnly />
              <button onClick={copyPromoCode}>Копировать</button>
            </div>
            <a href={linkPartner} rel="noopener noreferrer">
              {titleLink}
            </a>
          </div>,
          document.getElementById('root') as Element,
        )}
      </>
    )
  );
};

export default FormPromoModal;
