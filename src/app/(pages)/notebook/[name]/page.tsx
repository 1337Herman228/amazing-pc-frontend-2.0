"use client";

import SinglePcPage from "@/components/pages/single-product/single-pc/SinglePcPage";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    const encodedProductName =
        typeof params?.name === "string" ? params.name : "";
    const productName = decodeURIComponent(encodedProductName);

    return <SinglePcPage pcModelGroupName={productName} />;
}
