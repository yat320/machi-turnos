
const SUPABASE_URL = "https://zwdhycmuoueftlnnxaxe.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3ZGh5Y211b3VlZnRsbm54YXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMjc4MjUsImV4cCI6MjA2NTcwMzgyNX0.b6H1w4CxGpB_6qVfdnO397aesUouN1icYiBU0g_ttj8";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function cargarClases() {
    const { data, error } = await supabase.from("clases").select("*").order("dia").order("hora");
    const select = document.getElementById("clase");
    data.forEach(clase => {
        const option = document.createElement("option");
        option.value = clase.id;
        option.textContent = `${clase.dia} ${clase.hora} - ${clase.nombre}`;
        select.appendChild(option);
    });
}

async function reservar() {
    const clase_id = document.getElementById("clase").value;
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const fecha = document.getElementById("fecha").value;

    const { error } = await supabase.from("reservas").insert([
        { clase_id: clase_id, nombre: nombre, telefono: telefono, fecha: fecha }
    ]);

    const mensaje = document.getElementById("mensaje");
    if (error) {
        mensaje.textContent = "Error al reservar.";
        mensaje.style.color = "red";
    } else {
        mensaje.textContent = "¡Reserva exitosa!";
        mensaje.style.color = "green";
    }
}

cargarClases();
