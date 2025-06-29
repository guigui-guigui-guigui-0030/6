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
        const { user_id, category, q } = req.query;

        if (!user_id) {
            return res.status(400).json({ error: '�ݭn�Τ� ID' });
        }

        // �������Ѯw�ƾ�
        const mockKnowledge = [
            {
                id: '1',
                title: 'Flask API �}�o���n',
                content: '�o�O�@�����㪺 Flask API �}�o���n�A�]�t���ѳ]�p�B��Ʈw�ާ@�����e...',
                category: '�޳N���',
                tags: ['Python', 'Flask', 'API'],
                created_at: '2024-12-01',
                file_type: 'PDF'
            },
            {
                id: '2',
                title: 'Firebase ��X�о�',
                content: '�Բӻ����p��b Python �M�פ���X Firebase �A��...',
                category: '�޳N���',
                tags: ['Firebase', 'Python', '��Ʈw'],
                created_at: '2024-12-02',
                file_type: 'DOCX'
            },
            {
                id: '3',
                title: '�t�ξާ@��U',
                content: '���㪺�t�ξާ@�����A�]�t�Τ�޲z�B�v���]�w���\��...',
                category: '�ާ@��U',
                tags: ['�ާ@', '��U', '�t��'],
                created_at: '2024-12-03',
                file_type: 'PDF'
            }
        ];

        let results = mockKnowledge;

        // �����L�o
        if (category) {
            results = results.filter(item => item.category === category);
        }

        // �j�M�L�o
        if (q) {
            results = results.filter(item =>
                item.title.includes(q) ||
                item.content.includes(q) ||
                item.tags.some(tag => tag.includes(q))
            ).map(item => ({
                ...item,
                score: Math.random() * 0.5 + 0.5 // ���������פ���
            }));
        }

        res.status(200).json({
            user_id,
            results,
            total: results.length
        });
    } catch (error) {
        res.status(500).json({ error: '���J����: ' + error.message });
    }
}