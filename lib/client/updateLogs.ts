// lib/updateUserReport.ts


export async function UpdateLogs(data: any) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/update-logs`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                cache: "no-store", // Important for server components
            }
        );

        if (!res.ok) {
            console.error("❌ Failed to update user report", res.status, await res.text());
            return null;
        }

        return res.json();
    } catch (err) {
        console.error("❌ update logs error:", err);
        return null;
    }
}
