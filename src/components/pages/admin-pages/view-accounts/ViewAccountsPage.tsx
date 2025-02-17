"use client";

import AccountsTable from "@/components/tables/accounts-table/AccountsTable";
import "./ViewAccountsPage.scss";
import { useEffect, useState } from "react";
import { IUser } from "@/interfaces/types-v2";
import useFetch from "@/lib/hooks/useFetch";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";

const ViewAccountsPage = () => {
    const { getAccounts } = useFetch();

    const [accounts, setAccounts] = useState<IUser[] | null>(null);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        const data = await getAccounts();
        setAccounts(data);
    };

    const isLoading = !accounts;

    return (
        <>
            <AdminDashboard type="accounts" />
            {isLoading ? (
                <LoadingPage />
            ) : (
                <div className="container pt-100">
                    <AccountsTable fetch={fetchAccounts} data={accounts} />
                </div>
            )}
        </>
    );
};

export default ViewAccountsPage;
