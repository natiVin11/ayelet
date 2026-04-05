import Head from 'next/head';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import {
    Scale, Users, FileText, Heart, Shield, MessageCircle,
    Accessibility, X, Check, MapPin, Phone, Mail, Globe, ChevronDown, Gavel, Award, Landmark, Briefcase, TrendingUp, Info, Star
} from 'lucide-react';

// הגדרות אנימציה יוקרתיות
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: [0.19, 1, 0.22, 1] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

export default function Home() {
    const [selectedExpertise, setSelectedExpertise] = useState(null);
    const [activeFaq, setActiveFaq] = useState(null);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    const expertiseData = [
        { id: 1, icon: <Gavel size={40} />, title: "דיני משפחה וגירושין", full: "ניהול אסטרטגי של תיקי גירושין מורכבים, איזון משאבים, ופירוק שיתוף בנכסים ובחברות בערכאות המשפטיות הגבוהות ביותר." },
        { id: 2, icon: <FileText size={40} />, title: "צוואות וירושות", full: "עריכת צוואות מורכבות, ניהול עיזבונות וייצוג בסכסוכי ירושה רגישים בתוך המשפחה להבטחת כיבוד רצונכם." },
        { id: 3, icon: <Heart size={40} />, title: "גישור ויישוב סכסוכים", full: "הגעה להסכמים יציבים מחוץ לכותלי בית המשפט. חיסכון בזמן, כסף וסבל מיותר תוך שמירה על טובת הילדים." },
        { id: 4, icon: <Shield size={40} />, title: "הסכמי ממון", full: "יצירת ודאות כלכלית והגנה משפטית על נכסים לפני נישואין או בפרק ב', המותאמים אישית למבנה הנכסים שלכם." },
        { id: 5, icon: <Landmark size={40} />, title: "ליטיגציה בבתי דין", full: "מומחיות ייחודית בייצוג בבתי הדין הרבניים. התמחות בתביעות כתובה, גט, ומרוץ סמכויות המשלב את הדין הדתי והאזרחי." },
        { id: 6, icon: <Award size={40} />, title: "ייפוי כוח מתמשך", full: "הבטחת עתידכם האישי והרכושי. הדרך היחידה להבטיח כי האנשים עליהם אתם סומכים יקבלו החלטות עבורכם." }
    ];

    const processSteps = [
        { num: "01", title: "אבחון אסטרטגי", desc: "ניתוח מעמיק של המצב המשפטי ובניית מפת דרכים לניצחון." },
        { num: "02", title: "ניהול המערכה", desc: "ייצוג נחוש ופעולה מהירה בערכאות המשפטיות להשגת יתרון טקטי." },
        { num: "03", title: "הסדר וביטחון", desc: "גיבוש פתרון קבע המגן על נכסיכם ועל עתיד משפחתכם." }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#c5a059] font-assistant scroll-smooth overflow-x-hidden" dir="rtl">
            <Head>
                <title>איילת סהר דווידוב | משרד עורכי דין וגישור יוקרתי</title>
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@200;400;700&family=Cinzel:wght@400;700;900&display=swap');
                    .font-luxury { font-family: 'Cinzel', serif; }
                    .gold-gradient { background: linear-gradient(90deg, #c5a059, #f5e0a3, #c5a059); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                    .glass-nav { backdrop-filter: blur(25px); background: rgba(0, 0, 0, 0.85); border-bottom: 1px solid rgba(197, 160, 89, 0.15); }
                    .expertise-card { border: 1px solid rgba(197, 160, 89, 0.1); transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
                    .expertise-card:hover { border-color: #c5a059; background: rgba(197, 160, 89, 0.05); transform: translateY(-5px); }
                    .separator { height: 1px; background: linear-gradient(90deg, transparent, #c5a059, transparent); opacity: 0.3; }
                `}</style>
            </Head>

            {/* Navbar - Ultra Slim */}
            <nav className="fixed top-0 w-full z-[100] glass-nav">
                <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.4em]">
                    <div className="font-luxury text-2xl gold-gradient font-black tracking-tighter italic">A. SAHAR DAVIDOV</div>
                    <div className="hidden lg:flex gap-12 text-gray-400">
                        <a href="#about" className="hover:text-[#c5a059] transition">Profile</a>
                        <a href="#expertise" className="hover:text-[#c5a059] transition">Expertise</a>
                        <a href="#process" className="hover:text-[#c5a059] transition">Process</a>
                        <a href="#contact" className="hover:text-[#c5a059] transition font-bold text-white border-b border-[#c5a059] pb-1">Contact</a>
                    </div>
                </div>
            </nav>

            {/* Hero - Cinematic Parallax */}
            <section ref={heroRef} className="h-screen flex items-center justify-center relative overflow-hidden">
                <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-25 grayscale" alt="Law Office" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#050505]"></div>
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center z-10 px-6">
                    <motion.div variants={fadeInUp} className="mb-6 inline-flex items-center gap-3 text-[#c5a059] font-luxury tracking-[0.5em] text-sm italic">
                        <Star size={14} /> Established Excellence <Star size={14} />
                    </motion.div>
                    <motion.h1 variants={fadeInUp} className="text-6xl md:text-[13rem] font-luxury font-black mb-10 leading-none tracking-tighter gold-gradient uppercase italic">
                        LEGACY
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-gray-400 text-lg md:text-2xl font-light tracking-[0.3em] max-w-4xl mx-auto mb-16 uppercase italic">
                        אסטרטגיה משפטית • עוצמה • נחישות
                    </motion.p>
                    <motion.div variants={fadeInUp}>
                        <a href="#contact" className="group relative px-20 py-8 inline-block overflow-hidden bg-[#c5a059]">
                            <span className="relative z-10 text-black font-bold uppercase tracking-[0.6em] text-xs">תיאום ייעוץ אסטרטגי</span>
                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        </a>
                    </motion.div>
                </motion.div>
            </section>

            {/* Profile - Magazine Style */}
            <section id="about" className="py-48 bg-white text-black px-8 relative overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-32 items-center">
                    <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} className="lg:w-1/2">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-1 bg-[#c5a059]"></div>
                            <span className="text-[#c5a059] font-bold uppercase tracking-widest text-sm">Professional Profile</span>
                        </div>
                        <h2 className="font-luxury text-7xl text-black mb-12 font-black leading-tight italic tracking-tighter uppercase">עו"ד איילת <br/><span className="gold-text">סהר דווידוב</span></h2>
                        <p className="text-3xl leading-relaxed text-gray-800 font-light mb-10 border-r-8 border-black pr-12 italic font-assistant">
                            "ייצוג משפטי הוא לא רק מקצוע, הוא אומנות של אסטרטגיה והבנת נפש האדם."
                        </p>
                        <p className="text-xl text-gray-500 leading-relaxed font-light mb-12">
                            עו"ד איילת סהר דווידוב מובילה את המשרד בסטנדרט חסר פשרות. המשרד מתמחה בליטיגציה מורכבת בדיני משפחה וירושה, תוך שימוש בכלים משפטיים יצירתיים המעניקים יתרון טקטי ללקוח כבר מהצעד הראשון.
                        </p>
                        <div className="grid grid-cols-2 gap-12 pt-10">
                            <div><span className="block text-5xl font-luxury font-black italic gold-text tracking-tighter">15+</span><span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Yrs Experience</span></div>
                            <div><span className="block text-5xl font-luxury font-black italic gold-text tracking-tighter">TOP</span><span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Legal Tier</span></div>
                        </div>
                    </motion.div>
                    <div className="lg:w-1/2 relative group">
                        <div className="absolute -inset-6 border-8 border-gray-50 z-0 translate-x-12 translate-y-12 transition-transform group-hover:translate-x-8 group-hover:translate-y-8 duration-700"></div>
                        <div className="relative z-10 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)]">
                            <img src="https://img.haarets.co.il/bs/00000195-6524-db7b-afdd-f72cafae0000/90/63/5ac1c68c407a8b5ff3778dfa9888/60353011.JPG?precrop=1080,628,x0,y52&width=1200" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" alt="Ayelet Sahar Davidov" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Expertise - Industrial Luxury Grid */}
            <section id="expertise" className="py-48 bg-black px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-32 flex flex-col items-center">
                        <h2 className="font-luxury text-5xl gold-gradient mb-6 uppercase tracking-[0.3em] font-black italic">Practice Expertise</h2>
                        <div className="separator w-full max-w-2xl"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {expertiseData.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="expertise-card p-20 text-center group relative cursor-pointer"
                                onClick={() => setSelectedExpertise(item)}
                            >
                                <div className="text-[#c5a059] mb-10 flex justify-center group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100">{item.icon}</div>
                                <h3 className="text-2xl font-luxury text-white mb-6 tracking-widest uppercase italic group-hover:gold-gradient">{item.title}</h3>
                                <div className="text-[10px] uppercase font-bold tracking-[0.4em] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">Read Full Brief</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section - הוספה חדשה לשקיפות ואמינות */}
            <section id="process" className="py-48 bg-white text-black px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="font-luxury text-5xl text-center mb-32 uppercase tracking-widest font-black italic">הדרך לניצחון</h2>
                    <div className="grid md:grid-cols-3 gap-20">
                        {processSteps.map((step, i) => (
                            <div key={i} className="relative">
                                <div className="text-[12rem] font-luxury font-black text-gray-50 absolute -top-40 right-0 z-0">{step.num}</div>
                                <div className="relative z-10 pt-10 border-t-2 border-black">
                                    <h3 className="text-3xl font-luxury font-bold mb-6 uppercase italic tracking-tighter">{step.title}</h3>
                                    <p className="text-xl text-gray-500 font-light leading-relaxed font-assistant">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ - הסמכות המשפטית */}
            <section id="faq" className="py-48 bg-[#080808] text-white px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-luxury text-4xl text-center mb-24 gold-gradient uppercase tracking-widest">תובנות משפטיות (FAQ)</h2>
                    <div className="space-y-6">
                        {/* שימוש בנתוני ה-FAQ הקיימים שלך */}
                        {[
                            { q: "מהו 'מרוץ הסמכויות' ואיך הוא משפיע עליי?", a: "מרוץ הסמכויות הוא המצב בו קיימת סמכות מקבילה לבית המשפט לענייני משפחה ולבית הדין הרבני. הגשת התביעה ראשונה לערכאה המתאימה יכולה להכריע את גורל התיק כולו." },
                            { q: "האם תמיד כדאי ללכת לגישור?", a: "גישור הוא כלי עוצמתי, אך הוא דורש רצון טוב משני הצדדים. במקרים של חוסר איזון כוחות קיצוני, לפעמים אין מנוע מניהול הליך משפטי נחוש." }
                        ].map((faq, i) => (
                            <div key={i} className="border border-white/5 bg-white/5 rounded-sm">
                                <button
                                    className="w-full p-8 text-right flex justify-between items-center hover:bg-white/5 transition"
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                >
                                    <span className="text-xl font-bold uppercase tracking-tight italic">{faq.q}</span>
                                    <ChevronDown className={`transition-transform duration-500 text-[#c5a059] ${activeFaq === i ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden border-t border-white/5"
                                        >
                                            <div className="p-8 text-lg text-gray-400 font-light leading-relaxed italic">{faq.a}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact - The Grand Closing */}
            <section id="contact" className="py-48 bg-black text-white px-8 relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
                    <div className="space-y-16">
                        <h2 className="font-luxury text-8xl gold-gradient mb-12 font-black leading-none uppercase italic tracking-tighter">GET IN<br/>TOUCH</h2>
                        <div className="space-y-12">
                            <div className="flex items-center gap-8 group">
                                <div className="p-5 border border-[#c5a059]/20 text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-black transition-all duration-500"><MapPin /></div>
                                <p className="text-2xl font-light tracking-wide italic">מגדלי העסקים, תל אביב | אשקלון</p>
                            </div>
                            <div className="flex items-center gap-8 group">
                                <div className="p-5 border border-[#c5a059]/20 text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-black transition-all duration-500"><Phone /></div>
                                <p className="text-3xl font-luxury font-bold gold-text tracking-widest italic uppercase">050-0000000</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-20 shadow-[0_80px_150px_rgba(0,0,0,0.7)]">
                        <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid md:grid-cols-2 gap-12">
                                <input type="text" placeholder="שם מלא" className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-black outline-none focus:border-[#c5a059] transition text-xl font-light font-assistant" />
                                <input type="tel" placeholder="טלפון" className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-black outline-none focus:border-[#c5a059] transition text-xl font-light font-assistant" />
                            </div>
                            <textarea placeholder="תמצית המקרה (דיסקרטיות מוחלטת)" className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-black outline-none focus:border-[#c5a059] transition text-xl font-light h-32 font-assistant"></textarea>
                            <button type="submit" className="w-full bg-black text-[#c5a059] py-8 font-bold uppercase tracking-[0.6em] hover:bg-[#c5a059] hover:text-black transition-all duration-700 text-xs">
                                שליחת פנייה אסטרטגית
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black py-24 text-center border-t border-white/5">
                <div className="font-luxury text-3xl gold-text mb-8 font-black tracking-[0.4em] uppercase italic">A. SAHAR DAVIDOV</div>
                <div className="text-gray-700 text-[9px] uppercase tracking-[0.6em] font-bold">
                    © 2026 AYELET SAHAR DAVIDOV • LEGAL MASTERCLASS • ALL RIGHTS RESERVED
                </div>
            </footer>

            {/* Modal Detail - Gallery Look */}
            <AnimatePresence>
                {selectedExpertise && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] bg-black/98 flex items-center justify-center p-6 backdrop-blur-3xl"
                        onClick={() => setSelectedExpertise(null)}
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
                            className="bg-white text-black max-w-2xl w-full p-20 relative text-center shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setSelectedExpertise(null)} className="absolute top-8 left-8 text-gray-300 hover:text-black transition"><X size={45} /></button>
                            <div className="text-[#c5a059] mb-10 flex justify-center opacity-50">{selectedExpertise.icon}</div>
                            <h3 className="font-luxury text-4xl mb-10 font-black uppercase italic tracking-tighter">{selectedExpertise.title}</h3>
                            <div className="separator w-full mb-10 opacity-10"></div>
                            <p className="text-2xl leading-relaxed font-light text-gray-700 italic font-assistant">{selectedExpertise.full}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* WhatsApp */}
            <div className="fixed bottom-12 left-12 z-[200]">
                <a href="https://wa.me/972500000000" className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                    <MessageCircle color="white" size={30} />
                </a>
            </div>
        </div>
    );
}
