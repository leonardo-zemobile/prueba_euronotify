import { sendToSlackDirect } from "../send-to-slack";

export type GeoInfo = {
    ip: string | null;
    countryCode: string | null;
    countryName: string | null;
    region: string | null;
    city: string | null;
    postal: string | null;
    loc: string | null;        // "lat,lon"
    latitude: number | null;
    longitude: number | null;
    org: string | null;
    timezone: string | null;
    request_id: string | null;
};

export async function getUserGeo(): Promise<GeoInfo> {
    const res = await fetch("/api/get-geo", { cache: "no-store" });
    if (!res.ok) {
        const body = await res.text().catch(() => '');
        await sendToSlackDirect(
            'getUserGeo',
            'Failed to fetch /api/get-geo',
            `status=${res.status}\nbody=${body}`
        );
        throw new Error('Failed to get geo');
    }

    return res.json();
}
