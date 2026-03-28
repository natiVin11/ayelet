import db from '../../lib/db';

export default async function handler(req, res) {
    // בדיקה שהבקשה היא אכן POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, phone, email, message } = req.body;

    // ניקוי מספר הטלפון מתווים מיותרים (רווחים, מקפים וכו')
    const cleanPhone = phone.replace(/\D/g, '');

    try {
        // 1. שמירה במסד הנתונים SQLite
        const stmt = db.prepare('INSERT INTO leads (name, phone, email, message) VALUES (?, ?, ?, ?)');
        const info = stmt.run(name, cleanPhone, email, message);

        console.log(`Lead saved to DB with ID: ${info.lastInsertRowid}`);

        // 2. שליחת הודעה אוטומטית ללקוח דרך שרת הוואטסאפ המקומי (פורט 3001)
        try {
            await fetch('http://localhost:3001/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: cleanPhone,
                    message: `שלום ${name}, תודה שפנית למשרד עו"ד איילת סהר דווידוב. קיבלנו את פנייתך ונחזור אליך בהקדם.`
                })
            });
            console.log(`Auto-reply sent to customer: ${cleanPhone}`);
        } catch (whatsappError) {
            console.error('Failed to send WhatsApp to customer. Is whatsapp-server.js running?');
        }

        // 3. שליחת הודעה לאדמין (עו"ד איילת סהר דווידוב)
        try {
            await fetch('http://localhost:3001/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: '972500000000', // יש להחליף למספר האמיתי של המשרד בפורמט בינלאומי ללא פלוס
                    message: `🔔 פנייה חדשה מהאתר!\n\n👤 שם: ${name}\n📞 טלפון: ${cleanPhone}\n📧 אימייל: ${email || 'לא הוזן'}\n📝 הודעה: ${message}`
                })
            });
            console.log('Notification sent to admin via WhatsApp');
        } catch (adminError) {
            console.error('Failed to send WhatsApp notification to admin.');
        }

        // החזרת תשובה חיובית לאתר
        return res.status(200).json({ success: true, id: info.lastInsertRowid });

    } catch (error) {
        console.error('Database/API Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}