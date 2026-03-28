import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
    Scale, Users, FileText, Heart, Shield, MessageCircle,
    Accessibility, X, Check, MapPin, Phone, Mail, Clock, Globe, ChevronDown
} from 'lucide-react';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

export default function Home() {
    const [isAccessibilityOpen, setAccessibilityOpen] = useState(false);
    const [lang, setLang] = useState('he');
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const content = {
        he: {
            nav: ["פרופיל משרד", "התמחויות", "צור קשר"],
            heroTitle: "איילת סהר דווידוב",
            heroSub: "משרד עורכי דין • גישור • אסטרטגיה משפטית",
            heroBtn: "תיאום פגישת אסטרטגיה",
            aboutTitle: "החזון המקצועי",
            aboutP1: "בצמתים המכריעים של החיים, אתם זקוקים לייצוג שמשלב נחישות חסרת פשרות עם תבונה אסטרטגית. משרדנו מתמחה בניהול משברים משפחתיים מורכבים בערכאות המשפטיות הגבוהות ביותר.",
            aboutP2: "אנו מאמינים כי כל לקוח זכאי לליווי אישי המותאם לצרכיו הייחודיים, תוך בניית אסטרטגיה משפטית חכמה שנועדה להשיג את התוצאה המיטבית.",
            expertiseTitle: "תחומי המומחיות",
            contactTitle: "צרו קשר",
            formName: "שם מלא",
            formPhone: "מספר טלפון",
            formMail: "דואר אלקטרוני",
            formMsg: "תיאור המקרה (דיסקרטיות מלאה)",
            formBtn: "שלח פנייה למשרד",
            sending: "מעבד...",
            success: "הפנייה התקבלה במשרדנו.",
            address: "מגדלי העסקים, קומה 24, תל אביב",
            hours: "א' - ה' | 08:30 - 18:00"
        },
        en: {
            nav: ["About", "Expertise", "Contact"],
            heroTitle: "AYELET SAHAR DAVIDOV",
            heroSub: "LAW FIRM • MEDIATION • LEGAL STRATEGY",
            heroBtn: "Schedule Consultation",
            aboutTitle: "Professional Vision",
            aboutP1: "At life's most critical junctions, you require representation that combines uncompromising determination with strategic wisdom. Our firm specializes in managing complex family disputes.",
            aboutP2: "We believe that every client is entitled to personal guidance tailored to their unique needs, while building a smart legal strategy.",
            expertiseTitle: "PRACTICE AREAS",
            contactTitle: "GET IN TOUCH",
            formName: "Full Name",
            formPhone: "Phone Number",
            formMail: "Email Address",
            formMsg: "Case Summary (Strict Confidentiality)",
            formBtn: "Send Message",
            sending: "Sending...",
            success: "Message Received Successfully.",
            address: "Business Towers, 24th Floor, Tel Aviv",
            hours: "Sun - Thu | 08:30 - 18:00"
        }
    };

    const t = content[lang];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                alert(t.success);
                setFormData({ name: '', phone: '', email: '', message: '' });
            } else {
                alert('שגיאה: ' + data.error);
            }
        } catch (err) {
            alert('החיבור לשרת נכשל. וודא ששרת הוואטסאפ פעיל.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`min-h-screen ${lang === 'he' ? 'text-right' : 'text-left'} bg-[#fcfcfc] selection:bg-[#c5a059] selection:text-white`} dir={lang === 'he' ? 'rtl' : 'ltr'}>
            <Head>
                <title>איילת סהר דווידוב | משרד עורכי דין וגישור</title>
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;600&family=Cinzel:wght@400;700&display=swap');
                    .font-luxury { font-family: 'Cinzel', serif; }
                    .font-assistant { font-family: 'Assistant', sans-serif; }
                    .gold-text { color: #c5a059; }
                    .bg-navy { background-color: #0a192f; }
                    .glass-nav { backdrop-filter: blur(12px); background: rgba(255, 255, 255, 0.9); border-bottom: 1px solid #eee; }
                    .btn-gold { border: 1px solid #c5a059; color: #c5a059; transition: all 0.4s; }
                    .btn-gold:hover { background: #c5a059; color: white; box-shadow: 0 10px 20px rgba(197, 160, 89, 0.2); }
                `}</style>
            </Head>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-[100] glass-nav transition-all duration-500">
                <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
                    <div className="font-luxury text-xl md:text-2xl gold-text tracking-widest uppercase font-bold">
                        A. SAHAR DAVIDOV
                    </div>
                    <div className="hidden lg:flex gap-10 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500 items-center">
                        <a href="#about" className="hover:text-[#c5a059] transition-colors">{t.nav[0]}</a>
                        <a href="#expertise" className="hover:text-[#c5a059] transition-colors">{t.nav[1]}</a>
                        <a href="#contact" className="hover:text-[#c5a059] transition-colors">{t.nav[2]}</a>
                        <button onClick={() => setLang(lang === 'he' ? 'en' : 'he')} className="flex items-center gap-2 border border-gray-200 px-3 py-1 hover:border-[#c5a059] transition uppercase">
                            <Globe size={12} /> {lang === 'he' ? 'EN' : 'HE'}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="h-screen flex flex-col items-center justify-center relative bg-navy overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <motion.div initial="hidden" animate="visible" className="text-center z-10 px-6">
                    <motion.div variants={fadeInUp} className="w-16 h-px bg-[#c5a059] mx-auto mb-8"></motion.div>
                    <motion.h1 variants={fadeInUp} className="text-6xl md:text-9xl font-luxury text-white mb-6 leading-tight tracking-tighter">
                        {t.heroTitle}
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-lg md:text-2xl font-light tracking-[0.4em] text-gray-400 mb-16 uppercase italic">
                        {t.heroSub}
                    </motion.p>
                    <motion.div variants={fadeInUp}>
                        <a href="#contact" className="btn-gold px-12 py-4 text-xs font-bold uppercase tracking-widest">
                            {t.heroBtn}
                        </a>
                    </motion.div>
                </motion.div>
                <div className="absolute bottom-10 animate-bounce text-[#c5a059] opacity-50">
                    <ChevronDown size={24} />
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-32 bg-white px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div initial={{ opacity: 0, x: lang === 'he' ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <h2 className="font-luxury text-4xl mb-10 border-b-2 border-[#c5a059] inline-block pb-4 uppercase tracking-wider">{t.aboutTitle}</h2>
                        <p className="text-2xl leading-relaxed text-gray-800 font-light mb-8 italic">
                            "{t.aboutP1}"
                        </p>
                        <p className="text-xl leading-relaxed text-gray-500 font-light">
                            {t.aboutP2}
                        </p>
                    </motion.div>
                    <div className="relative">
                        <div className="absolute -inset-4 border border-gray-100 z-0 translate-x-4 translate-y-4"></div>
                        <div className="relative z-10 aspect-video bg-[#0a192f] overflow-hidden shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1000" alt="Office Profile" className="object-cover w-full h-full grayscale opacity-70" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Expertise Section */}
            <section id="expertise" className="py-32 bg-[#f8f8f8] px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-24 text-center">
                        <h2 className="font-luxury text-4xl mb-6 uppercase tracking-[0.2em]">{t.expertiseTitle}</h2>
                        <div className="w-16 h-1 bg-[#c5a059] mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
                        <ExpertiseDetail
                            title={lang === 'he' ? "דיני משפחה וגירושין" : "Family Law & Divorce"}
                            detail={lang === 'he' ? "ניהול תיקי גירושין מורכבים בערכאות המשפטיות הגבוהות ביותר." : "Managing complex divorce cases in the highest courts."}
                        />
                        <ExpertiseDetail
                            title={lang === 'he' ? "צוואות וירושות" : "Wills & Estates"}
                            detail={lang === 'he' ? "תכנון עזבון, עריכת צוואות מורכבות וניהול סכסוכי ירושה." : "Estate planning and management of inheritance disputes."}
                        />
                        <ExpertiseDetail
                            title={lang === 'he' ? "גישור אסטרטגי" : "Strategic Mediation"}
                            detail={lang === 'he' ? "פתרון סכסוכים מחוץ לכותלי בית המשפט להשגת הסכמים יציבים." : "Out-of-court conflict resolution for stable agreements."}
                        />
                        <ExpertiseDetail
                            title={lang === 'he' ? "הסכמי ממון" : "Prenuptial Agreements"}
                            detail={lang === 'he' ? "בניית מעטפת משפטית להגנה על נכסים ורכוש משפחתי." : "Legal protection frameworks for family assets."}
                        />
                        <ExpertiseDetail
                            title={lang === 'he' ? "משמורת ומזונות" : "Custody & Support"}
                            detail={lang === 'he' ? "קביעת הסדרי שהות מטיבים וחישוב מזונות ריאליים." : "Determining custody arrangements and support calculations."}
                        />
                        <ExpertiseDetail
                            title={lang === 'he' ? "ייפוי כוח מתמשך" : "Enduring Power of Attorney"}
                            detail={lang === 'he' ? "הבטחת העתיד האישי והרכושי בליווי מקצועי ורגיש." : "Ensuring personal and property future with expert guidance."}
                        />
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-32 bg-navy text-white px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
                    <motion.div initial={{ opacity: 0, x: lang === 'he' ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <h2 className="font-luxury text-5xl gold-text mb-12 uppercase tracking-wide">{t.contactTitle}</h2>
                        <div className="space-y-12">
                            <ContactItem icon={<MapPin size={20}/>} label={lang === 'he' ? "כתובת" : "Address"} value={t.address} />
                            <ContactItem icon={<Phone size={20}/>} label={lang === 'he' ? "טלפון" : "Phone"} value="050-0000000" />
                            <ContactItem icon={<Mail size={20}/>} label={lang === 'he' ? "אימייל" : "Email"} value="office@ayelet-law.co.il" />
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: lang === 'he' ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white/5 p-12 border border-white/10 backdrop-blur-xl">
                        <form className="space-y-10" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <input
                                    type="text"
                                    placeholder={t.formName}
                                    required
                                    className="bg-transparent border-b border-gray-700 py-3 focus:border-[#c5a059] outline-none transition w-full font-light"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                                <input
                                    type="tel"
                                    placeholder={t.formPhone}
                                    required
                                    className="bg-transparent border-b border-gray-700 py-3 focus:border-[#c5a059] outline-none transition w-full font-light"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                />
                            </div>
                            <textarea
                                placeholder={t.formMsg}
                                required
                                className="bg-transparent border-b border-gray-700 py-3 focus:border-[#c5a059] outline-none transition w-full h-32 font-light"
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                            ></textarea>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-gold w-full py-5 text-xs font-bold uppercase tracking-[0.3em] disabled:opacity-50"
                            >
                                {isSubmitting ? t.sending : t.formBtn}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#05070a] py-20 text-center px-8">
                <div className="font-luxury text-xl gold-text mb-6 tracking-[0.4em] uppercase">AYELET SAHAR DAVIDOV</div>
                <div className="h-px w-24 bg-gray-800 mx-auto mb-10"></div>
                <p className="text-[10px] text-gray-600 uppercase tracking-widest leading-loose max-w-2xl mx-auto font-light">
                    © 2026 {lang === 'he' ? 'כל הזכויות שמורות למשרד עורכי דין איילת סהר דווידוב' : 'All Rights Reserved to Ayelet Sahar Davidov Law Offices'}<br/>
                    Professionalism • Strategy • Excellence
                </p>
            </footer>

            {/* Floating UI */}
            <div className="fixed bottom-10 left-10 flex flex-col gap-5 z-[200]">
                <a href="https://wa.me/972500000000" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                    <MessageCircle color="white" size={28} />
                </a>
                <button onClick={() => setAccessibilityOpen(true)} className="w-14 h-14 bg-[#c5a059] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform text-white">
                    <Accessibility size={28} />
                </button>
            </div>

            {/* Accessibility */}
            <AnimatePresence>
                {isAccessibilityOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 z-[300] flex items-center justify-center p-6 backdrop-blur-md">
                        <div className="bg-white text-black p-12 rounded-2xl max-w-lg w-full relative">
                            <button onClick={() => setAccessibilityOpen(false)} className="absolute top-6 left-6 text-gray-400 hover:text-black transition"><X size={32}/></button>
                            <h3 className="font-luxury text-2xl mb-8 border-b-2 border-[#c5a059] pb-4 uppercase">Accessibility</h3>
                            <div className="grid gap-4">
                                <AccessibilityOption label={lang === 'he' ? "ניגודיות גבוהה" : "High Contrast"} />
                                <AccessibilityOption label={lang === 'he' ? "הגדלת טקסט" : "Large Text"} />
                                <AccessibilityOption label={lang === 'he' ? "ביטול אנימציות" : "Disable Animations"} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ExpertiseDetail({ title, detail }) {
    return (
        <div className="p-16 bg-white hover:bg-gray-50 transition-all duration-700 group flex flex-col items-center text-center">
            <h3 className="text-xl font-bold mb-6 text-[#0a192f] group-hover:gold-text transition-colors uppercase tracking-wider">{title}</h3>
            <div className="w-10 h-px bg-gray-200 group-hover:w-full group-hover:bg-[#c5a059] transition-all duration-1000 mb-6"></div>
            <p className="text-gray-500 leading-relaxed font-light text-sm">{detail}</p>
        </div>
    );
}

function ContactItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-6 group">
            <div className="text-[#c5a059] transition-all duration-500">{icon}</div>
            <div>
                <p className="text-[10px] uppercase tracking-widest text-[#c5a059] mb-2">{label}</p>
                <p className="text-xl font-light text-white tracking-wide">{value}</p>
            </div>
        </div>
    );
}

function AccessibilityOption({ label }) {
    return (
        <button className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-[#c5a059] hover:text-white transition-all font-bold">
            <span className="text-xs uppercase tracking-widest">{label}</span>
            <Check size={16} />
        </button>
    );
}