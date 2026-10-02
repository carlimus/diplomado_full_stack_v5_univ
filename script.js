/**
 *
 * Conceptos clave demostrados en este proyecto:
 * 1. Ciclo de vida del DOM (DOMContentLoaded).
 * 2. Pila de ejecucion (Call Stack) y comportamiento LIFO.
 * 3. Manejo de eventos del DOM y retroalimentacion de interfaz.
 * 4. Ambito lexico (Lexical Scope) y Clausuras (Closures).
 * 5. Patron de objeto UI y persistencia con Web Storage API (localStorage).
 * 6. Programacion funcional e inmutabilidad (map, filter, reduce).
 * 7. Delegacion de eventos (Event Delegation) y propagacion (Event Bubbling).
 * 8. Asincronia moderna: async/await, Fetch API y control de errores con try/catch.
 */
 
// Se asegura que todo el arbol DOM este parseado antes de manipular elementos
document.addEventListener("DOMContentLoaded", () => {
 
    /* ==========================================================================
       BLOQUE 1 (CLASE 4): EL CEREBRO DE JS - LA PILA DE EJECUCION (CALL STACK)
       Demostracion practica del comportamiento LIFO (Last In, First Out).
 
       - JavaScript es 'single-threaded' (un solo hilo de ejecucion principal).
       - El Call Stack registra en que punto del programa nos encontramos.
       - Cuando se invoca una funcion, se apila (push); cuando retorna, se desapila (pop).
       ========================================================================== */
    const terminalStack = document.querySelector("#terminal-callstack");
    const btnCallStack = document.querySelector("#btn-callstack");
    const btnClearTerminal = document.querySelector("#btn-clear-terminal");
 
    let logsStack = [];
 
    // Funcion auxiliar para registrar estados en la terminal visual
    function registrarPaso(mensaje) {
        logsStack.push(mensaje);
        terminalStack.textContent = logsStack.join("\n");
    }
 
    function cepillarDientes() {
        registrarPaso("   [3] -> Enfoque integral del negocio");
        //registrarPaso("   [3] <- Enfoque integral del negocio");
    }
 
    function bañarse() {
        registrarPaso("  [2] -> Más de 7 años de liderazgo de equipos tecnológicos");
        cepillarDientes(); // Invocacion anidada: cepillarDientes se apila sobre bañarse
        //registrarPaso("  [2] <- Más de 7 años de liderazgo de equipos tecnológicos");
    }
 
    function empezarDia() {
        registrarPaso(" [1] -> 13 años de experiencia");
        bañarse(); // Invocacion anidada: bañarse se apila sobre empezarDia
        //registrarPaso(" [1] <- 13 años de experiencia");
    }
 
    btnCallStack.addEventListener("click", () => {
        logsStack = ["--- BIENVENIDO A ESTA SECCIÓN ---"];
        empezarDia();
        logsStack.push("--- GRACIAS POR TU TIEMPO ---");
        terminalStack.textContent = logsStack.join("\n");
    });
 
    btnClearTerminal.addEventListener("click", () => {
        logsStack = [];
        terminalStack.textContent = "Presiona el boton para mostrar información...";
    });
 
 
    /* ==========================================================================
       BLOQUE 2 (CLASE 4): DOM - SELECCION, EVENTOS Y REACCIONES BASICAS
       
       - addEventListener escucha eventos del usuario de forma no bloqueante.
       - setTimeout permite programar acciones diferidas sin congelar el hilo principal.
       ========================================================================== */
    // Reaccion 1: Mensaje interactivo temporal al contactar
    const btnContacto = document.querySelector("#btn-contacto");
    const mensajeContacto = document.querySelector("#mensaje-contacto");
 
    btnContacto.addEventListener("click", () => {
        mensajeContacto.textContent = "Gracias por contactarme. Correo copiado y registrado.";
        mensajeContacto.classList.remove("hidden");
       
        // Ocultar automaticamente el mensaje tras 4 segundos
        setTimeout(() => {
            mensajeContacto.classList.add("hidden");
        }, 4000);
    });
 
    // Reaccion 2: Efecto hover por evento sobre el avatar (texto sobrio de iniciales/estado)
    const avatar = document.querySelector("#avatar");
    avatar.addEventListener("mouseenter", () => {
        avatar.textContent = "INFO";
    });
    avatar.addEventListener("mouseleave", () => {
        avatar.textContent = "CJMU";
    });
 
 
    /* ==========================================================================
       BLOQUE 3 (CLASE 5): SCOPE Y CLOSURES (CIERRES)
   
       - Un closure es una funcion que 'recuerda' las variables de su ambito lexico
         externo, incluso despues de que la funcion contenedora ha finalizado.
       - Permite la encapsulacion de variables privadas sin variables globales.
       ========================================================================== */
    function crearRastreador() {
        // Variable privada encapsulada dentro del ambito lexico
        let conteo = 0;
 
        // La funcion retornada mantiene acceso privilegiado a 'conteo'
        return function() {
            conteo++;
            return conteo;
        };
    }
 
    // rastrearClick almacena la funcion interna con su entorno lexico intacto
    const rastrearClick = crearRastreador();
    const btnRastreador = document.querySelector("#btn-rastreador");
 
    btnRastreador.addEventListener("click", () => {
        const total = rastrearClick();
        btnRastreador.textContent = `Clics para registrar tu visita (Conteo: ${total})`;
    });
 
 
    /* ==========================================================================
       BLOQUE 4 (CLASE 5): PATRON DE DISEÑO (OBJETO UI) & PERSISTENCIA CON LOCALSTORAGE
     
       - Agrupar la logica de interfaz en un objeto literal mejora la organizacion.
       - localStorage persiste datos en el navegador incluso al recargar o cerrar la pagina.
       ========================================================================== */
    const UI = {
        cuerpo: document.body,
        btnTema: document.querySelector("#btn-tema"),
 
        // Lee la preferencia almacenada al iniciar
        inicializarTema() {
            const temaGuardado = localStorage.getItem("temaPreferido");
 
            if (temaGuardado === "oscuro") {
                this.cuerpo.classList.add("dark-mode");
                this.btnTema.textContent = "Modo Claro";
            } else {
                this.cuerpo.classList.remove("dark-mode");
                this.btnTema.textContent = "Modo Oscuro";
            }
        },
 
        // Alterna la clase CSS y sincroniza el estado en localStorage
        alternarTema() {
            const esOscuro = this.cuerpo.classList.toggle("dark-mode");
 
            if (esOscuro) {
                localStorage.setItem("temaPreferido", "oscuro");
                this.btnTema.textContent = "Modo Claro";
            } else {
                localStorage.setItem("temaPreferido", "claro");
                this.btnTema.textContent = "Modo Oscuro";
            }
        }
    };
 
    // Inicializar estado guardado
    UI.inicializarTema();
 
    // Event listener para alternar tema
    UI.btnTema.addEventListener("click", () => UI.alternarTema());
 
 
    /* ==========================================================================
       BLOQUE 5 (CLASE 5): PROGRAMACION FUNCIONAL (INMUTABILIDAD: MAP, FILTER, REDUCE)
 
       - La inmutabilidad evita modificar directamente la fuente de datos original.
       - .map() transforma cada elemento y retorna un nuevo arreglo.
       - .filter() selecciona elementos que cumplen un predicado logico.
       - .reduce() acumula valores de un arreglo para calcular un resultado unico.
       ========================================================================== */
    // Source of Truth (Fuente de datos base e inmutable)
    const listaProyectos = [
        { id: 1, titulo: "Oracle PL/SQL & SQL", categoria: "Desarrollo", horas: 120 },
        { id: 2, titulo: "Oracle Database (9i, 10g, 11g, 19c)", categoria: "Database", horas: 85 },
        { id: 3, titulo: "Metodologías Ágiles", categoria: "Gestion", horas: 60 },
        { id: 4, titulo: "Oracle Forms 6i / 10g", categoria: "Desarrollo", horas: 45 },
        { id: 5, titulo: "Herramientas DBA & Dev", categoria: "Database", horas: 110 },
        { id: 6, titulo: "Análisis de Requerimientos TI", categoria: "Gestion", horas: 35 }
    ];
 
    const contenedorProyectos = document.querySelector("#contenedor-proyectos");
    const resumenMetrica = document.querySelector("#resumen-metrica");
    const botonesFiltro = document.querySelectorAll(".btn-filter");
    const detalleSeleccion = document.querySelector("#detalle-seleccion");
 
    // Funcion pura de renderizado
    function renderizarProyectos(proyectos) {
        // Transformacion declarativa de objetos a fragmentos HTML con .map()
        const htmlTarjetas = proyectos.map(proyecto => `
            <div class="proyecto-card" data-id="${proyecto.id}" data-titulo="${proyecto.titulo}">
                <h4>${proyecto.titulo}</h4>
                <p>Categoria: <strong>${proyecto.categoria}</strong></p>
                <p>Inversion: ${proyecto.horas} hrs</p>
                <span class="tag">${proyecto.categoria}</span>
            </div>
        `).join("");
 
        contenedorProyectos.innerHTML = htmlTarjetas;
 
        // Calculo de horas totales mediante .reduce()
        const totalHoras = proyectos.reduce((acumulador, actual) => acumulador + actual.horas, 0);
        resumenMetrica.textContent = `Proyectos mostrados: ${proyectos.length} | Horas totales de desarrollo: ${totalHoras} hrs`;
    }
 
    // Gestion de filtros declarativos con .filter()
    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", () => {
            botonesFiltro.forEach(b => b.classList.remove("active"));
            boton.classList.add("active");
 
            const criterio = boton.getAttribute("data-filtro");
 
            if (criterio === "Todos") {
                renderizarProyectos(listaProyectos);
            } else {
                // .filter() genera un nuevo array sin mutar 'listaProyectos'
                const filtrados = listaProyectos.filter(proyecto => proyecto.categoria === criterio);
                renderizarProyectos(filtrados);
            }
        });
    });
 
    // Renderizado inicial con todos los proyectos
    renderizarProyectos(listaProyectos);
 
 
    /* ==========================================================================
       BLOQUE 6 (CLASE 5): DELEGACION DE EVENTOS (EVENT DELEGATION & EVENT BUBBLING)
       
       - En lugar de agregar un escuchador a cada tarjeta individual (lo cual
         consumiria mas memoria y fallaria con elementos creados dinamicamente),
         se registra un unico listener en el contenedor padre.
       - Gracias a la propagacion de eventos (bubbling) y a .closest(), identificamos
         la tarjeta seleccionada de forma eficiente.
       ========================================================================== */
    contenedorProyectos.addEventListener("click", (evento) => {
        // evento.target: elemento concreto que origino el clic
        // .closest(): busca el ancestro mas cercano que coincida con el selector
        const tarjeta = evento.target.closest(".proyecto-card");
 
        if (!tarjeta) return; // Se descartan clics fuera de las tarjetas
 
        const id = tarjeta.getAttribute("data-id");
        const titulo = tarjeta.getAttribute("data-titulo");
 
        detalleSeleccion.textContent = `Evento capturado por delegacion: Seleccionaste "${titulo}" (ID: ${id})`;
        detalleSeleccion.classList.remove("hidden");
    });
 
 
    /* ==========================================================================
       BLOQUE 7 (CLASE 5): ASINCRONIA MAESTRA, FETCH API Y MANEJO DE ERRORES
   
       - Las peticiones HTTP con fetch() retornan una Promesa.
       - async/await permite escribir codigo asincrono con sintaxis secuencial y legible.
       - fetch() NO rechaza la promesa en codigos 404 o 500; por ello es obligatorio
         verificar if (!response.ok) y lanzar un error manualmente para que salte al catch.
       ========================================================================== */
    async function solicitarDatosProyectos(url) {
        try {
            detalleSeleccion.textContent = "Realizando peticion asincrona mediante fetch()...";
            detalleSeleccion.classList.remove("hidden");
 
            const respuesta = await fetch(url);
 
            // Validacion obligatoria de estado HTTP
            if (!respuesta.ok) {
                throw new Error(`Fallo de red o recurso no encontrado (HTTP ${respuesta.status})`);
            }
 
            const datos = await respuesta.json();
            detalleSeleccion.textContent = `Datos recibidos exitosamente: ${datos.length} elementos cargados.`;
            return datos;
 
        } catch (error) {
            // El bloque catch captura tanto fallos de red como excepciones de 'throw new Error'
            console.error("Detalle tÉcnico capturado en catch:", error);
            detalleSeleccion.textContent = `Hubo un problema: ${error.message}`;
            detalleSeleccion.classList.remove("hidden");
        }
    }
 
    // Boton para simular peticion Fetch exitosa
    document.querySelector("#btn-cargar-exito").addEventListener("click", async () => {
        const datos = await solicitarDatosProyectos("https://jsonplaceholder.typicode.com/posts?_limit=3");
        datos[0].title = "Sistema de Gestión de Pensiones";
        datos[0].body = "Sistema desarrollado con Oracle, PL/SQL y Forms.";

        datos[1].title = "Sistema de Gestión Documental";
        datos[1].body = "Proyecto de integración y gestión documental.";

        datos[2].title = "Dashboard de Indicadores";
        datos[2].body = "Visualización de información mediante Power BI.";
        if (datos) {
            const adaptados = datos.map((item, index) => ({
                id: item.id,
                titulo: item.title.slice(0, 25) + "...",
                categoria: index % 2 === 0 ? "Backend" : "Frontend",
                horas: 40
            }));
            renderizarProyectos(adaptados);
        }
    });
 
    // Boton para simular error HTTP 404 y verificar la captura en el bloque catch
    document.querySelector("#btn-cargar-error").addEventListener("click", async () => {
        await solicitarDatosProyectos("https://jsonplaceholder.typicode.com/recurso-inexistente-404");
    });
 
});