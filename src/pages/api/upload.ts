// pages/api/upload.js

import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadDir = path.join(process.cwd(), "public/uploads"); // Папка для сохранения изображений

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const handler = (req: any, res: any) => {
    const form: any = new IncomingForm();

    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err: any, fields: any, files: any) => {
        if (err) {
            return res.status(500).json({ error: "Ошибка загрузки" });
        }

        const name = fields.name[0]; // получить поле 'name' из запроса
        const filePath = files?.file[0]?.filepath;
        const newFilePath = path.join(uploadDir, name + ".jpg"); //Свое название изображения
        // const newFilePath = path.join(uploadDir, files.file[0].originalFilename ); //Оригинальное название изображения

        fs.rename(filePath, newFilePath, (err) => {
            if (err) {
                return res
                    .status(500)
                    .json({ error: "Ошибка перемещения файла" });
            }
            res.status(200).json({
                message: "Файл загружен",
                filePath: newFilePath,
            });
        });
    });
};

export default handler;
