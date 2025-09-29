const port = import.meta.env.VITE_PORT;
// const path = "http://localhost:" + port;
const path = "https://jsramverk-hagt21-fdbhdnf5hrgrcbcc.northeurope-01.azurewebsites.net/"

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

export async function addOne(body) {
    try {
        const res = await fetch(`${path}/`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return res.json();
    } catch (err) {
        console.error("Failed to add document:", err)
    }
}

export async function deleteOne(id) {
    try {
        const res = await fetch(`${path}/delete/${id}`, {
            method: "DELETE",
        });
        return res.json();
    } catch (err) {
        console.error("Failed to delete document:", err)
    }
}

export async function updateOne(body) {
    try {
        const res = await fetch(`${path}/update`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return res.json();
    } catch (err) {
        console.error("Failed to update document:", err)
    }
}