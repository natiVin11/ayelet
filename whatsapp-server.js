const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let qrCodeData = null;
let connectionStatus = "מנותק";

// יצירת הבוט של איילת עם הגדרות אופטימליות
const client = new Client({
    authStrategy: new LocalAuth(), // שומר את הסשן בתיקיית .wwebjs_auth
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ],
    }
});

// אירוע קבלת קוד QR
client.on('qr', (qr) => {
    console.log('--- קוד QR התקבל! יש לסרוק בלוח הבקרה ---');
    qrCodeData = qr;
    connectionStatus = "ממתין לסריקה";
});

// אירוע התחברות בהצלחה
client.on('ready', () => {
    console.log('✅ WhatsApp הבוט של איילת מוכן לעבודה!');
    connectionStatus = "מחובר";
    qrCodeData = null;
});

// אירוע התנתקות
client.on('disconnected', (reason) => {
    console.log('❌ וואטסאפ התנתק:', reason);
    connectionStatus = "מנותק";
    client.initialize(); // ניסיון אתחול מחדש אוטומטי
});

// API לקבלת סטטוס וקוד QR עבור ה-Frontend (Admin Panel)
app.get('/status', (req, res) => {
    res.json({
        status: connectionStatus,
        qr: qrCodeData,
        timestamp: new Date().getTime()
    });
});

// API לשליחת הודעה
app.post('/send', async (req, res) => {
    const { to, message } = req.body;

    if (connectionStatus !== "מחובר") {
        return res.status(500).json({ success: false, error: "וואטסאפ אינו מחובר. סרוק קוד QR באדמין." });
    }

    if (!to || !message) {
        return res.status(400).json({ success: false, error: "חסר מספר טלפון או תוכן הודעה." });
    }

    try {
        // ניקוי המספר מתווים שאינם ספרות (רווחים, מקפים, פלוס)
        let cleanNumber = to.replace(/\D/g, '');

        // אם המספר מתחיל ב-0, נהפוך אותו לפורמט ישראלי בינלאומי (972)
        if (cleanNumber.startsWith('05')) {
            cleanNumber = '972' + cleanNumber.substring(1);
        }

        // הוספת הסיומת של וואטסאפ
        const chatId = cleanNumber + "@c.us";

        // בדיקה אם המספר רשום בוואטסאפ (אופציונלי, למנוע שגיאות)
        const isRegistered = await client.isRegisteredUser(chatId);

        if (isRegistered) {
            await client.sendMessage(chatId, message);
            console.log(`✉️ הודעה נשלחה בהצלחה ל: ${cleanNumber}`);
            res.json({ success: true, to: cleanNumber });
        } else {
            console.log(`⚠️ המספר ${cleanNumber} אינו רשום בוואטסאפ`);
            res.status(404).json({ success: false, error: "המספר אינו רשום בוואטסאפ" });
        }

    } catch (err) {
        console.error('❌ שגיאה בשליחת הודעה:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// הפעלת הלקוח
client.initialize();

// הפעלת שרת ה-Express
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 שרת הוואטסאפ רץ על פורט ${PORT}`);
    console.log(`ממתין להתחברות...`);
});