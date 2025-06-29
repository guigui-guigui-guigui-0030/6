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
        const { user_id, category, q } = req.query;

        if (!user_id) {
            return res.status(400).json({ error: '需要用戶 ID' });
        }

        // 模擬知識庫數據
        const mockKnowledge = [
            {
                id: '1',
                title: 'Flask API 開發指南',
                content: '這是一份完整的 Flask API 開發指南，包含路由設計、資料庫操作等內容...',
                category: '技術文件',
                tags: ['Python', 'Flask', 'API'],
                created_at: '2024-12-01',
                file_type: 'PDF'
            },
            {
                id: '2',
                title: 'Firebase 整合教學',
                content: '詳細說明如何在 Python 專案中整合 Firebase 服務...',
                category: '技術文件',
                tags: ['Firebase', 'Python', '資料庫'],
                created_at: '2024-12-02',
                file_type: 'DOCX'
            },
            {
                id: '3',
                title: '系統操作手冊',
                content: '完整的系統操作說明，包含用戶管理、權限設定等功能...',
                category: '操作手冊',
                tags: ['操作', '手冊', '系統'],
                created_at: '2024-12-03',
                file_type: 'PDF'
            }
        ];

        let results = mockKnowledge;

        // 分類過濾
        if (category) {
            results = results.filter(item => item.category === category);
        }

        // 搜尋過濾
        if (q) {
            results = results.filter(item =>
                item.title.includes(q) ||
                item.content.includes(q) ||
                item.tags.some(tag => tag.includes(q))
            ).map(item => ({
                ...item,
                score: Math.random() * 0.5 + 0.5 // 模擬相關度分數
            }));
        }

        res.status(200).json({
            user_id,
            results,
            total: results.length
        });
    } catch (error) {
        res.status(500).json({ error: '載入失敗: ' + error.message });
    }
}