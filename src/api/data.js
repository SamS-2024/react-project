const port = import.meta.env.VITE_PORT;
const path = "http://localhost:" + port;

export async function getAllData() {
    try {
        const res = await fetch(`${path}/`);
        return res.json();

    } catch (err) {
        console.error("Failed to fetch documents:", err)
    }
}