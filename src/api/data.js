const path = "http://localhost:3000";

export async function getAllData() {
    try {
        const res = await fetch(`${path}/`);
        return res.json();

    } catch (err) {
        console.error("Failed to fetch documents:", err)
    }
}

export async function getOne(id) {
    try {
        const res = await fetch(`${path}/${id}`);
        return res.json();

    } catch (err) {
        console.error("Failed to fetch document:", err)
  }
}