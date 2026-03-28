import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    return (
        <>
            <Head>
                {/* Tailwind via CDN */}
                <script src="https://cdn.tailwindcss.com"></script>

                {/* פונטים של משרדי יוקרה: Cinzel לכותרות, Assistant לטקסט רץ */}
                <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Assistant:wght@200;300;400;600;700&display=swap" rel="stylesheet" />

                {/* ספריות רקע ואנימציה */}
                <script src="https://cdn.jsdelivr.net/npm/tsparticles@3.3.0/tsparticles.bundle.min.js"></script>

                <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --law-black: #05070a;
            --law-blue-dark: #0a192f;
            --law-gold: #c5a059;
            --law-gold-light: #e2c992;
          }
          
          body {
            font-family: 'Assistant', sans-serif !important;
            background-color: var(--law-black);
            color: #e2e8f0;
            overflow-x: hidden;
            direction: rtl;
            margin: 0;
          }
          
          /* פונט לוגו וכותרות עוצמתיות */
          .font-luxury { font-family: 'Cinzel', serif !important; }
          
          #tsparticles {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -1;
            opacity: 0.25;
          }

          /* אפקט גרדיאנט מוזהב יוקרתי */
          .gold-text {
            background: linear-gradient(to bottom, var(--law-gold-light) 0%, var(--law-gold) 50%, var(--law-gold-light) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 700;
          }

          /* כפתור בסגנון "משרד גדול" */
          .btn-luxury {
            border: 1px solid var(--law-gold);
            color: var(--law-gold);
            background: transparent;
            padding: 0.75rem 2.5rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            transition: all 0.4s ease;
          }
          
          .btn-luxury:hover {
            background: var(--law-gold);
            color: var(--law-black);
            box-shadow: 0 0 20px rgba(197, 160, 89, 0.4);
          }

          /* טשטוש זכוכית לתפריטים */
          .glass-nav {
            backdrop-filter: blur(12px);
            background: rgba(5, 7, 10, 0.8);
            border-bottom: 1px solid rgba(197, 160, 89, 0.2);
          }
        `}} />

                <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('load', function() {
            if (typeof tsParticles !== 'undefined') {
              tsParticles.load("tsparticles", {
                fpsLimit: 60,
                particles: {
                  color: { value: "#c5a059" },
                  links: { color: "#c5a059", distance: 180, enable: true, opacity: 0.2, width: 1 },
                  move: { enable: true, speed: 0.8 },
                  number: { density: { enable: true, area: 900 }, value: 60 },
                  opacity: { value: 0.3 },
                  size: { value: { min: 1, max: 2 } },
                },
                interactivity: {
                  events: { onHover: { enable: true, mode: "grab" } },
                  modes: { grab: { distance: 250, links: { opacity: 0.4 } } }
                }
              });
            }
          });
        `}} />
            </Head>

            <div id="tsparticles"></div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={router.route}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Component {...pageProps} />
                </motion.div>
            </AnimatePresence>
        </>
    );
}

export default MyApp;