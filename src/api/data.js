// const port = import.meta.env.VITE_PORT;
// const path = "http://localhost:" + port;

const path = "https://jsramverk-hagt21-fdbhdnf5hrgrcbcc.northeurope-01.azurewebsites.net/"

export async function getAllData() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${path}/`, {
        headers: { "x-access-token": token }
    });

    const data = await res.json();

    if (res.status === 401) {
        let message = "Unauthorized";

        // Om backend skickar felmeddelande, används den ist.
        if (data && data.errors && data.errors.title) {
            message = data.errors.title;
        }

        const error = new Error(message);
        // Lägger till status egenskap för att användas när token går ut.
        // Fångas i Docs och leder till automatisk logout.
        error.status = 401;
        throw error;
    }

    return data;
}


export async function getOne(id) {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${path}/docs/${id}`, {
            headers: {
                "x-access-token": token
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

    export async function inviteInternal(docId, email) {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${path}/invite-internal`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({ docId, email}),
        });

        return res.json();
    } catch (err) {
        console.error("Invitation failed:", err)
    }
}

    export async function invite(docId, email) {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${path}/invite`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({ docId, email}),
        });

        return res.json();
    } catch (err) {
        console.error("Invitation failed:", err)
    }
}

/* Användare i samlingen 'docs' som kopplas till ett specifikt 'doc' */
export async function getUsersList(docId) {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${path}/users/${docId}`, {
            method: "GET",
            headers: {
                "x-access-token": token
            },
        });

        return res.json();
    } catch (err) {
        console.error("Fetching users failed:", err)
    }
}

/* Alla registrerade användare i databasen i 'users' samlingen */
export async function getAllUsers() {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${path}/users`, {
            method: "GET",
            headers: {
                "x-access-token": token
            },
        });

        return res.json();
    } catch (err) {
        console.error("Fetching users failed:", err)
    }
}
