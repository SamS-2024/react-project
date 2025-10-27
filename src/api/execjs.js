export async function execJs(code) {
    try {
        
        const res = await fetch('https://execjs.emilfolino.se/code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({code: btoa(code)}),
        });
        const result = await res.json();
        const decodedOutput = atob(result.data);
        return decodedOutput;
    } catch (err) {
        console.error("Failed to execute code:", err)
    }
}