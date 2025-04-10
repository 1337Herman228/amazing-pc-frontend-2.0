import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import Configurator from "@/components/pages/configurator/Configurator_V2";

export default function Page() {
    return (
        <>
            <div className="mb-16">
                <AdminDashboard type="pc" />
            </div>
            <Configurator isManageRole />;
        </>
    );
}
