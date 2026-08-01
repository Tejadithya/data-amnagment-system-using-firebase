let currentUser = null;
let editingRecordId = null;

function formatDate(isoString) {
    if (!isoString) return "-";
    return new Date(isoString).toLocaleDateString();
}

function getRecordsRef() {
    return database.ref("users/" + currentUser.name + "/records");
}

function resetForm() {
    document.getElementById("record-title").value = "";
    document.getElementById("record-category").value = "";
    document.getElementById("record-description").value = "";
    editingRecordId = null;
    document.getElementById("form-title").textContent = "Add New Record";
    document.getElementById("save-btn").textContent = "Add Record";
    document.getElementById("cancel-edit-btn").hidden = true;
}

function renderRecords(records) {
    const tbody = document.getElementById("records-body");
    const emptyState = document.getElementById("empty-state");
    const entries = Object.entries(records || {});

    if (entries.length === 0) {
        tbody.innerHTML = "";
        emptyState.hidden = false;
        return;
    }

    emptyState.hidden = true;
    tbody.innerHTML = entries.map(([id, record]) => `
        <tr>
            <td>${escapeHtml(record.title)}</td>
            <td>${escapeHtml(record.category)}</td>
            <td>${escapeHtml(record.description)}</td>
            <td>${formatDate(record.createdAt)}</td>
            <td class="actions">
                <button class="btn-edit" data-id="${id}">Edit</button>
                <button class="btn-delete" data-id="${id}">Delete</button>
            </td>
        </tr>
    `).join("");

    tbody.querySelectorAll(".btn-edit").forEach((btn) => {
        btn.addEventListener("click", () => startEdit(btn.dataset.id, records[btn.dataset.id]));
    });

    tbody.querySelectorAll(".btn-delete").forEach((btn) => {
        btn.addEventListener("click", () => deleteRecord(btn.dataset.id));
    });
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text || "";
    return div.innerHTML;
}

function loadRecords() {
    getRecordsRef().on("value", (snapshot) => {
        renderRecords(snapshot.val());
    });
}

function startEdit(id, record) {
    editingRecordId = id;
    document.getElementById("record-title").value = record.title;
    document.getElementById("record-category").value = record.category;
    document.getElementById("record-description").value = record.description;
    document.getElementById("form-title").textContent = "Edit Record";
    document.getElementById("save-btn").textContent = "Update Record";
    document.getElementById("cancel-edit-btn").hidden = false;
    document.getElementById("record-title").focus();
}

function deleteRecord(id) {
    if (!confirm("Delete this record?")) return;

    getRecordsRef().child(id).remove().catch((error) => {
        alert("Failed to delete record: " + error.message);
    });
}

function saveRecord() {
    const title = document.getElementById("record-title").value.trim();
    const category = document.getElementById("record-category").value.trim();
    const description = document.getElementById("record-description").value.trim();

    if (!title || !category) {
        alert("Title and category are required.");
        return;
    }

    const payload = {
        title,
        category,
        description,
        updatedAt: new Date().toISOString()
    };

    if (editingRecordId) {
        getRecordsRef().child(editingRecordId).update(payload)
            .then(() => resetForm())
            .catch((error) => alert("Failed to update: " + error.message));
    } else {
        payload.createdAt = new Date().toISOString();
        getRecordsRef().push(payload)
            .then(() => resetForm())
            .catch((error) => alert("Failed to add: " + error.message));
    }
}

function initDashboard() {
    currentUser = requireAuth();
    if (!currentUser) return;

    document.getElementById("user-name").textContent = currentUser.name;
    document.getElementById("user-email").textContent = currentUser.email || "";

    document.getElementById("save-btn").addEventListener("click", saveRecord);
    document.getElementById("cancel-edit-btn").addEventListener("click", resetForm);
    document.getElementById("logout-btn").addEventListener("click", () => {
        clearCurrentUser();
        window.location.href = "login.html";
    });

    loadRecords();
}

document.addEventListener("DOMContentLoaded", initDashboard);
