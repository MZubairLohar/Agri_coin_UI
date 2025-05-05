"use client"

import AdminLayout from "@/components/maincomp/AdminLayout";

export default function AdminDashboard({children}) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
