const port = import.meta.env.VITE_PORT;
const path = "http://localhost:" + port;
//const path = "https://jsramverk-hagt21-fdbhdnf5hrgrcbcc.northeurope-01.azurewebsites.net/"

export async function getAllData() {
    try {
        // Token hämtas från localStorage
        const token = localStorage.getItem("token");
        const res = await fetch(`${path}/docs`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
        return res.json();

    } catch (err) {
        console.error("Failed to fetch documents:", err)
    }
}

export async function getOne(id) {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${path}/${id}`, {
            headers: {
                "Content-type": "application/json",
                "x--token": token
            }
        });
        return res.json();

    } catch (err) {
        console.error("Failed to fetch document:", err)
  }
}

export async function addOne(body) {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${path}/`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
        return res.json();
    } catch (err) {
        console.error("Failed to add document:", err)
    }
}

export async function deleteOne(id) {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${path}/delete/${id}`, {
            method: "DELETE",
            headers: {
                "x-access-token": token
            }
        });
        return res.json();
    } catch (err) {
        console.error("Failed to delete document:", err)
    }
}

export async function login(body) {
    try {
        const res = await fetch(`${path}/login`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return res.json();
    } catch (err) {
        console.error("Login failed:", err)
    }
}

export async function register(body) {
    try {
        const res = await fetch(`${path}/register`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return res.json();
    } catch (err) {
        console.error("Register failed:", err)
    }
}
