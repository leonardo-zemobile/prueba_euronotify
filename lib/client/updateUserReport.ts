// lib/updateUserReport.ts

import { sendToSlackDirect } from "../send-to-slack";


export async function updateUserReport(data: any) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/update-reports`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                cache: "no-store", // Important for server components
            }
        );

        if (!res.ok) {
            console.error("❌ Failed to update user report", res.status, await res.text());

            await sendToSlackDirect(
                '/lib/updateUserReport',
                `Failed to update user report`,
                `status=${res.status}\nbody=${res}`
            );

            return null;
        }

        return res.json();
    } catch (err) {
        console.error("❌ updateUserReport error:", err);
        await sendToSlackDirect(
            '/lib/updateUserReport',
            `updateUserReport error`,
            `status=500\nbody=${err}`
        );

        return null;
    }
}
