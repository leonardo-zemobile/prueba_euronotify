export async function sendToSlack(
    source_page: string,
    text: string,
    error?: string
) {
    try {

        const base = process.env.NEXT_PUBLIC_BASE_URL

        const response = await fetch(`${base}/api/send-error-to-slack`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ source_page, text, error }),
        });

        if (!response.ok) {
            console.error("Failed to send to Slack:", await response.text());
            return false;
        }

        return true;
    } catch (err) {
        console.error("Slack helper error:", err);
        return false;
    }
}

// lib/send-to-slack-direct.ts
export async function sendToSlackDirect(
    source_page: string,
    text: string,
    error?: string
) {
    const url = process.env.SLACK_ERROR_WEBHOOK;
    if (!url) {
        console.error('SLACK_ERROR_WEBHOOK missing');
        return false;
    }

    console.log("Sending message to slack....")

    const slackMessage = `
        🚨 *New Error Logged* 🚨
        *Source Page:* \`${source_page}\`
        *Message:* ${text}
        *Error:* \`\`\`${error || 'N/A'}\`\`\`
        `.trim();

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: slackMessage }),
        });

        console.log("tried to send  message to slack.")
        
        if (!res.ok) {
            console.error('Slack webhook failed:', res.status, await res.text());
            return false;
        }
        return true;
    } catch (e) {
        console.error('Slack webhook exception:', e);
        return false;
    }
}
