import { IncomingForm } from 'formidable';
import fs from 'fs';

export default async function handler(req, res) {
    // 設置 CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const form = new IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: '文件解析失敗' });
            }

            // 模擬處理上傳的文件
            const uploadedFiles = Object.keys(files).map(key => {
                const file = files[key];
                return {
                    filename: file.originalFilename,
                    size: file.size,
                    type: file.mimetype,
                    status: 'success'
                };
            });

            res.status(200).json({
                message: '文件上傳成功',
                files: uploadedFiles,
                user_id: fields.user_id,
                category: fields.category,
                tags: fields.tags?.split(',') || []
            });
        });
    } catch (error) {
        res.status(500).json({ error: '上傳失敗: ' + error.message });
    }
}