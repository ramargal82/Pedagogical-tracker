interface Env {
  GOOGLE_SHEETS_WEBHOOK_URL: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const webhookUrl = context.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return Response.json(
      { error: "Google Sheets webhook URL not configured." },
      { status: 500 }
    );
  }

  try {
    const body = await context.request.json();

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    return Response.json({ result: text });
  } catch (error) {
    console.error("Sheets Webhook Error:", error);
    return Response.json(
      { error: "Failed to send data to Google Sheets." },
      { status: 500 }
    );
  }
};
