import React from 'react';
import Image from 'next/image';
import Layout from "../layouts/Main";
import Footer from "../components/footer";
import styles from '../assets/css/Stores.module.css';

const StoresPage: React.FC = () => {
  // Dynamic import of logos
  const logoFiles = [
    '/logos/logo2.jpeg',
    '/logos/logo3.jpeg',
    '/logos/logo4.jpeg',
    '/logos/logo5.jpeg',
    '/logos/logo6.jpeg',
    '/logos/logo7.jpeg',
    '/logos/logo8.jpeg',
    '/logos/logo9.jpeg',
    '/logos/logo10.jpeg',
    '/logos/logo12.jpeg',
    '/logos/logo13.jpeg',
    '/logos/logo14.jpeg',
    '/logos/logo15.jpeg',
    '/logos/logo16.jpeg',
  ];

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <header className="section__intro">
            <h4>Our Partners</h4>
          </header>
          
          <div className={styles.logoGrid}>
            {logoFiles.map((logoPath, index) => (
              <div 
                key={index} 
                className={styles.logoContainer}
              >
                <Image 
                  src={logoPath} 
                  alt={`Partner logo ${index + 1}`} 
                  width={150} 
                  height={100} 
                  objectFit="contain"
                  className={styles.logoImage}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default StoresPage;