/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./styles/**/*.css",
    ],
    theme: {
        extend: {
            colors: {
                prime: '#0F172A', // כחול נייבי עמוק מאוד (כמעט שחור)
                gold: {
                    400: '#FDE047',
                    500: '#D4AF37', // זהב יוקרתי
                    600: '#C5A028',
                }
            },
            fontFamily: {
                sans: ['"Heebo"', 'sans-serif'], // פונט עברי מודרני
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}