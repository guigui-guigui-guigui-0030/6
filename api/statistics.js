export default async function handler(req, res) {
    // 設置 CORS
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
            return res.status(400).json({ error: '需要用戶 ID' });
        }

        // 模擬統計數據
        const mockStats = {
            total_files: 156,
            total_categories: 8,
            total_tags: 42,
            total_size_mb: 2340,
            categories: [
                { name: '技術文件', count: 45 },
                { name: '操作手冊', count: 32 },
                { name: '知識庫', count: 28 },
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
        res.status(500).json({ error: '載入統計資料失敗: ' + error.message });
    }
}