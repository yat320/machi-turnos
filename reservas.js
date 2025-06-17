
const { createClient } = supabase;
const supabaseClient = createClient("https://zwdhycmuoueftlnnxaxe.supabase.co", 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3ZGh5Y211b3VlZnRsbm54YXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMjc4MjUsImV4cCI6MjA2NTcwMzgyNX0.b6H1w4CxGpB_6qVfdnO397aesUouN1icYiBU0g_ttj8");

async function cargarClases() {
    const { data, error } = await supabaseClient.from("clases").select("*").order("dia").order("hora");
    const select = document.getElementById("clase");
    select.innerHTML = "";
    if (error || !data) {
        const option = document.createElement("option");
        option.textContent = "Error al cargar clases";
        select.appendChild(option);
        return;
    }
    data.forEach(clase => {
        const option = document.createElement("option");
        option.value = clase.id;
        option.textContent = `${clase.dia} ${clase.hora} - ${clase.nombre}`;
        select.appendChild(option);
    });
    select.addEventListener("change", cargarReservas);
}

async function cargarReservas() {
    const claseId = document.getElementById("clase").value;
    const ul = document.getElementById("reservas");
    ul.innerHTML = "";
    if (!claseId) return;

    const { data, error } = await supabaseClient.from("reservas").select("*").eq("clase_id", claseId).order("fecha");
    if (error || !data) {
        const li = document.createElement("li");
        li.textContent = "Error al cargar reservas";
        ul.appendChild(li);
        return;
    }
    if (data.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No hay reservas para esta clase";
        ul.appendChild(li);
    } else {
        data.forEach(r => {
            const li = document.createElement("li");
            li.textContent = `${r.fecha}: ${r.nombre} (${r.telefono})`;
            ul.appendChild(li);
        });
    }
}

cargarClases();
