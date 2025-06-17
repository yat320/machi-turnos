
const { createClient } = supabase;
const supabaseClient = createClient("https://zwdhycmuoueftlnnxaxe.supabase.co", 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3ZGh5Y211b3VlZnRsbm54YXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMjc4MjUsImV4cCI6MjA2NTcwMzgyNX0.b6H1w4CxGpB_6qVfdnO397aesUouN1icYiBU0g_ttj8");

async function cargarClases() {
  const clases = [
    { dia: "lunes", hora: "08:00", nombre: "Entrenamiento funcional", cupo: 30 },
    { dia: "lunes", hora: "09:00", nombre: "Entrenamiento femenino", cupo: 30 },
    { dia: "lunes", hora: "16:00", nombre: "Entrenamiento femenino sin impacto", cupo: 30 },
    { dia: "lunes", hora: "17:00", nombre: "Entrenamiento funcional", cupo: 30 },
    { dia: "lunes", hora: "18:00", nombre: "Entrenamiento femenino", cupo: 30 },
    { dia: "lunes", hora: "19:00", nombre: "Entrenamiento funcional", cupo: 30 },
    { dia: "lunes", hora: "20:00", nombre: "Entrenamiento funcional", cupo: 30 },
    { dia: "martes", hora: "08:00", nombre: "Hipopresivos", cupo: 30 },
    { dia: "martes", hora: "09:00", nombre: "Entrenamiento femenino", cupo: 30 },
    { dia: "martes", hora: "16:30", nombre: "Yoga terapéutico", cupo: 30 },
    { dia: "martes", hora: "18:00", nombre: "Entrenamiento femenino", cupo: 30 },
    { dia: "miércoles", hora: "08:00", nombre: "Entrenamiento funcional", cupo: 30 },
    { dia: "miércoles", hora: "09:00", nombre: "Stretching + Hipopresivos", cupo: 30 },
    { dia: "miércoles", hora: "16:00", nombre: "Hipopresivos", cupo: 30 },
    { dia: "miércoles", hora: "17:00", nombre: "Entrenamiento femenino", cupo: 30 },
    { dia: "miércoles", hora: "18:00", nombre: "Entrenamiento femenino sin impacto", cupo: 30 },
    { dia: "miércoles", hora: "19:00", nombre: "Entrenamiento funcional", cupo: 30 },
    { dia: "miércoles", hora: "20:00", nombre: "Entrenamiento funcional", cupo: 30 },
    { dia: "jueves", hora: "08:00", nombre: "Hipopresivos", cupo: 30 },
    { dia: "jueves", hora: "09:00", nombre: "Entrenamiento femenino", cupo: 30 },
    { dia: "jueves", hora: "16:30", nombre: "Yoga terapéutico", cupo: 30 },
    { dia: "jueves", hora: "17:00", nombre: "Entrenamiento femenino", cupo: 30 },
    { dia: "jueves", hora: "18:00", nombre: "Entrenamiento funcional", cupo: 30 },
    { dia: "jueves", hora: "19:00", nombre: "Entrenamiento funcional", cupo: 30 },
    { dia: "viernes", hora: "08:00", nombre: "Entrenamiento funcional", cupo: 30 },
    { dia: "viernes", hora: "09:00", nombre: "Stretching + Hipopresivos", cupo: 30 },
    { dia: "viernes", hora: "16:00", nombre: "Hipopresivos", cupo: 30 },
    { dia: "viernes", hora: "17:00", nombre: "Entrenamiento femenino", cupo: 30 },
    { dia: "viernes", hora: "18:00", nombre: "Entrenamiento femenino sin impacto", cupo: 30 },
    { dia: "viernes", hora: "19:00", nombre: "Entrenamiento funcional", cupo: 30 },
    { dia: "sábado", hora: "09:00", nombre: "Entrenamiento funcional", cupo: 30 },
    { dia: "sábado", hora: "10:00", nombre: "Stretching + Hipopresivos", cupo: 30 }
  ];

  const { error } = await supabaseClient.from("clases").upsert(clases, { onConflict: ["dia", "hora", "nombre"] });

  const mensaje = document.getElementById("mensaje");
  if (error) {
    mensaje.textContent = "Error al cargar clases: " + error.message;
    mensaje.style.color = "red";
  } else {
    mensaje.textContent = "✅ Clases cargadas con éxito.";
    mensaje.style.color = "green";
  }
}
