import React from "react";
import EditPostForm from "./EditPostForm";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="max-w-xl mx-auto py-8" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-right">ویرایش پست</h1>
      <EditPostForm id={id} />
    </div>
  );
}
