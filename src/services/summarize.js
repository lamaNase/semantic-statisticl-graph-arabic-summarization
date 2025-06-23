export async function summarizeText(text) {
    console.log("here===================");
    const response = await fetch(`${process.env.REACT_APP_SUMMARIZE_API_URL}/summarize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
    });

    const data = await response.json();
    return data.sentences; // an array of { para_idx, sent_idx, text, score }
}