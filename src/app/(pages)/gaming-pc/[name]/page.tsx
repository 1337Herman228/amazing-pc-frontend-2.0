"use client";

import SinglePcPage from "@/components/pages/single-product/single-pc/SinglePcPage";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    const productName = typeof params?.name === "string" ? params.name : "";
    return <SinglePcPage product_name={productName} />;
}
