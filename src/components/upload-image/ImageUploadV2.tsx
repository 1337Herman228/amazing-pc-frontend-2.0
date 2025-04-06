"use client";

import { PlusOutlined } from "@ant-design/icons";
import { ConfigProvider, GetProp, Image, Upload } from "antd";
import {
    RcFile,
    UploadFile,
    UploadListType,
    UploadProps,
} from "antd/es/upload/interface";
import { useEffect, useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const urlToFile = async (
    url: string,
    filename: string,
    mimeType = "image/jpeg"
): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
};

const fileToUploadFile = (file: File): UploadFile => ({
    uid: "-1", // любой уникальный id
    name: file.name,
    status: "done",
    originFileObj: file as RcFile,
});

interface ImageUploadV2Props {
    defaultImgUrl?: string;
    isFormSubmitted: boolean;
    img: File;
    accept?: string; //'image/*
    listType?: UploadListType | undefined; //"picture-card"
    setImg: any;
}

const ImageUploadV2 = ({
    defaultImgUrl,
    isFormSubmitted,
    img,
    accept = "image/*",
    listType = "picture-card",
    setImg,
}: ImageUploadV2Props) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        const prepareDefaultFile = async () => {
            if (defaultImgUrl) {
                const file = await urlToFile(defaultImgUrl, "image.jpg");
                const uploadFile: UploadFile = fileToUploadFile(file);
                setImg(file);
                setFileList([uploadFile]);
            }
        };

        prepareDefaultFile();
    }, [defaultImgUrl]);

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange: UploadProps["onChange"] = ({
        fileList: newFileList,
    }) => {
        setFileList(newFileList);
        if (newFileList.length == 0) setImg(undefined);
    };

    const uploadButton = (
        <button
            style={{
                color: "var(--text-color-grey)",
                border: 0,
                background: "none",
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 4,
                }}
            >
                Загрузить
            </div>
        </button>
    );

    const customRequest: any = async ({
        file,
        onSuccess,
        onError,
    }: {
        file: any;
        onSuccess: any;
        onError: any;
    }) => {
        try {
            setImg(file as File);
            onSuccess();
        } catch {
            onError();
        }
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Upload: {
                        colorBorder: `${
                            !img && isFormSubmitted
                                ? "var(--red-error-color)"
                                : "gray"
                        }`,
                        colorPrimary: "var(--main-color)", //цвет рамки при наведении
                    },
                },
            }}
        >
            <Upload
                accept={accept}
                customRequest={customRequest}
                listType={listType}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                            !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                />
            )}
        </ConfigProvider>
    );
};

export default ImageUploadV2;
