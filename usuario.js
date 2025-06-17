
const { createClient } = supabase;
const supabaseClient = createClient("https://zwdhycmuoueftlnnxaxe.supabase.co", 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3ZGh5Y211b3VlZnRsbm54YXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMjc4MjUsImV4cCI6MjA2NTcwMzgyNX0.b6H1w4CxGpB_6qVfdnO397aesUouN1icYiBU0g_ttj8");

function cargarFechasDisponibles() {
    const select = document.getElementById("fecha");
    const hoy = new Date();
    for (let i = 0; i < 14; i++) {
        const fecha = new Date(hoy);
        fecha.setDate(hoy.getDate() + i);
        const yyyy = fecha.getFullYear();
        const mm = String(fecha.getMonth() + 1).padStart(2, "0");
        const dd = String(fecha.getDate()).padStart(2, "0");
        const fechaTexto = `${yyyy}-${mm}-${dd}`;
        const option = document.createElement("option");
        option.value = fechaTexto;
        option.textContent = `${dd}/${mm}/${yyyy}`;
        select.appendChild(option);
    }
}

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
}

async function reservar() {
    const clase_id = document.getElementById("clase").value;
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const fecha = document.getElementById("fecha").value;
    const mensaje = document.getElementById("mensaje");

    if (!clase_id || !nombre || !telefono || !fecha) {
        mensaje.textContent = "Completá todos los campos.";
        mensaje.style.color = "red";
        return;
    }

    const { error } = await supabaseClient.from("reservas").insert([
        { clase_id, nombre, telefono, fecha }
    ]);

    if (error) {
        mensaje.textContent = "Error al reservar.";
        mensaje.style.color = "red";
    } else {
        mensaje.textContent = "¡Reserva exitosa!";
        mensaje.style.color = "green";
    }
}

cargarFechasDisponibles();
cargarClases();
