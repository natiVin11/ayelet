import { useState, useEffect } from 'react';
import db from '../lib/db';
import { QRCodeSVG } from 'qrcode.react';
import { MessageSquare, CheckCircle, RefreshCw, Users, ShieldCheck } from 'lucide-react';

export async function getServerSideProps() {
    const leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
    return { props: { leads: JSON.parse(JSON.stringify(leads)) } };
}

export default function AdminDashboard({ leads }) {
    const [qrCode, setQrCode] = useState(null);
    const [status, setStatus] = useState('מנותק');

    // פונקציה לבדיקת סטטוס חיבור וקבלת QR
    useEffect(() => {
        const checkStatus = async () => {
            const res = await fetch('/api/whatsapp/status');
            const data = await res.json();
            setStatus(data.status);
            if (data.qr) setQrCode(data.qr);
        };
        const interval = setInterval(checkStatus, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#05070a] text-white p-8" dir="rtl">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
                    <h1 className="text-4xl font-luxury gold-text">CONTROL PANEL</h1>
                    <div className="flex items-center gap-4">
            <span className={`px-4 py-1 rounded-full text-xs font-bold ${status === 'מחובר' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
              סטטוס וואטסאפ: {status}
            </span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* אזור חיבור לוואטסאפ */}
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl h-fit">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <MessageSquare className="text-[#c5a059]" /> חיבור WhatsApp Web
                        </h2>
                        {status === 'מחובר' ? (
                            <div className="text-center py-10">
                                <CheckCircle size={60} className="mx-auto text-green-500 mb-4" />
                                <p className="text-gray-400 font-light">המערכת מחוברת ומוכנה לשלוח הודעות אוטומטיות.</p>
                            </div>
                        ) : qrCode ? (
                            <div className="text-center bg-white p-6 rounded-xl">
                                <p className="text-black text-sm mb-4 font-bold">סרוק את הקוד כדי להתחבר:</p>
                                <QRCodeSVG value={qrCode} size={200} className="mx-auto" />
                                <p className="text-gray-500 text-xs mt-4 italic text-right">פתח וואטסאפ בטלפון &gt; מכשירים מקושרים &gt; קשר מכשיר</p>
                            </div>
                        ) : (
                            <div className="text-center py-10 italic text-gray-500">
                                <RefreshCw className="animate-spin mx-auto mb-4" /> מעלה קוד QR...
                            </div>
                        )}
                    </div>

                    {/* רשימת פניות אחרונות */}
                    <div className="lg:col-span-2 bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <Users className="text-[#c5a059]" /> פניות אחרונות מהאתר
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-right">
                                <thead>
                                <tr className="text-gray-500 border-b border-white/10">
                                    <th className="py-4 font-light italic">שם הלקוח</th>
                                    <th className="py-4 font-light italic">טלפון</th>
                                    <th className="py-4 font-light italic">הודעה</th>
                                    <th className="py-4 font-light italic text-left text-xs">סטטוס הודעה</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                {leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-white/5 transition">
                                        <td className="py-4 font-bold">{lead.name}</td>
                                        <td className="py-4 font-mono text-sm text-[#c5a059]">{lead.phone}</td>
                                        <td className="py-4 text-sm text-gray-400 max-w-xs truncate">{lead.message}</td>
                                        <td className="py-4 text-left">
                                            <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded">נשלח אוטומטית</span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}