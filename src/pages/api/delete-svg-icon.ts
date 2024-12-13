// pages/api/delete-svg-icon.js

import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadDir = path.join(process.cwd(), "public/svg-icons"); // Папка для сохранения изображений

const handler = (req: any, res: any) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: "Ошибка удаления" });
        }

        const name = fields?.name?.[0]; // получить поле 'name' из запроса
        const filePath = uploadDir + "/" + name + ".svg";

        fs.unlink(filePath, (err) => {
            if (err) {
                if (err.code === "ENOENT") {
                    return res.status(404).json({ error: "Файл не найден" });
                }
                return res.status(500).json({ error: "Ошибка удаления файла" });
            }
            res.status(200).json({ message: "Файл удален" });
        });
    });
};

export default handler;
