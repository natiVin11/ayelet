export default async function handler(req, res) {
    const { action } = req.query;

    if (action === 'status') {
        const response = await fetch('http://localhost:3001/status');
        const data = await response.json();
        return res.json(data);
    }

    if (action === 'send') {
        const response = await fetch('http://localhost:3001/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        return res.json(data);
    }
}