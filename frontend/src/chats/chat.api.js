export async function getAiResponse({
  message,
  chatId,
  onContent,
  onChat,
  onComplete,
}) {
  try {
    const res = await fetch("/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        content: message,
        chatId,
      }),
    });

    if (!res.ok) {
      console.error("Failed to fetch from /api/chats:", res.status);
      onComplete();
      return;
    }

    const stream = res.body;

    const decoder = new TextDecoder();
    let buffer = "";

    const reader = stream.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      // Keep the last segment in the buffer as it might be incomplete
      buffer = lines.pop();

      lines.forEach((line) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return;

        if (trimmedLine.startsWith("data:")) {
          try {
            const dataStr = trimmedLine.slice(5).trim();
            if (dataStr) {
              onContent(JSON.parse(dataStr).text);
            }
          } catch (e) {
            console.error("Parse error on data:", e);
          }
        }
        
        if (trimmedLine.startsWith("title:")) {
          try {
            const chat = JSON.parse(trimmedLine.slice(6).trim());
            onChat({
              id: chat.id || chat.chatId || chatId,
              title: chat.title,
              messages: [],
            });
          } catch (e) {
            console.error("Parse error on title:", e);
          }
        }
      });
    }
  } catch (error) {
    console.error("Error during streaming:", error);
  } finally {
    onComplete();
  }
}
