export default async function handler(req, res) {
    // �]�m CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(400).json({ error: '�ݭn�Τ� ID' });
        }

        // �����έp�ƾ�
        const mockStats = {
            total_files: 156,
            total_categories: 8,
            total_tags: 42,
            total_size_mb: 2340,
            categories: [
                { name: '�޳N���', count: 45 },
                { name: '�ާ@��U', count: 32 },
                { name: '���Ѯw', count: 28 },
                { name: 'FAQ', count: 51 }
            ],
            file_types: [
                { type: 'PDF', count: 89 },
                { type: 'DOCX', count: 34 },
                { type: 'TXT', count: 23 },
                { type: 'MD', count: 10 }
            ]
        };

        res.status(200).json({
            user_id,
            statistics: mockStats
        });
    } catch (error) {
        res.status(500).json({ error: '���J�έp��ƥ���: ' + error.message });
    }
}