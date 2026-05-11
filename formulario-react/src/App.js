import { useState } from 'react';

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_NOMBRE = /^[\p{L}\s'.-]+$/u;
const PATRONES_SOSPECHOSOS = /(--|;|\/\*|\*\/|\bunion\b|\bselect\b|\bdrop\b|\binsert\b|\bdelete\b|\bupdate\b|<script)/i;

const LIMITES = {
    nombre: { min: 2, max: 50 },
    correo: { min: 5, max: 100 },
    contraseña: { min: 8, max: 64 },
};

const ETIQUETAS_FUERZA = ['', 'Débil', 'Media', 'Fuerte'];

function calcularFuerza(valor) {
    if (!valor) return 0;
    let puntos = 0;
    if (valor.length >= 8) puntos++;
    if (/[A-Z]/.test(valor) && /[a-z]/.test(valor)) puntos++;
    if (/\d/.test(valor) && /[^A-Za-z0-9]/.test(valor)) puntos++;
    if (valor.length >= 12) puntos++;
    return Math.min(3, puntos);
}

function App() {
    const [form, setForm] = useState({ nombre: '', correo: '', contraseña: '' });
    const [tocado, setTocado] = useState({ nombre: false, correo: false, contraseña: false });
    const [exito, setExito] = useState(null);
    const [cargando, setCargando] = useState(false);

    const validar = (campo, valor) => {
        const v = valor.trim();

        if (PATRONES_SOSPECHOSOS.test(valor)) {
            return 'El campo contiene caracteres no permitidos.';
        }

        if (campo === 'nombre') {
            if (!v) return 'El nombre es obligatorio.';
            if (v.length < LIMITES.nombre.min) return `El nombre debe tener al menos ${LIMITES.nombre.min} caracteres.`;
            if (v.length > LIMITES.nombre.max) return `El nombre no puede superar los ${LIMITES.nombre.max} caracteres.`;
            if (!REGEX_NOMBRE.test(v)) return 'El nombre solo puede contener letras y espacios.';
        }

        if (campo === 'correo') {
            if (!v) return 'El correo no puede estar vacío.';
            if (v.length > LIMITES.correo.max) return `El correo no puede superar los ${LIMITES.correo.max} caracteres.`;
            if (!REGEX_CORREO.test(v)) return 'Ingresa un correo con formato válido.';
        }

        if (campo === 'contraseña') {
            if (valor.length < LIMITES.contraseña.min) return `La contraseña debe tener mínimo ${LIMITES.contraseña.min} caracteres.`;
            if (valor.length > LIMITES.contraseña.max) return `La contraseña no puede superar los ${LIMITES.contraseña.max} caracteres.`;
        }

        return '';
    };

    const errores = {
        nombre: validar('nombre', form.nombre),
        correo: validar('correo', form.correo),
        contraseña: validar('contraseña', form.contraseña),
    };

    const formularioValido = !errores.nombre && !errores.correo && !errores.contraseña;
    const fuerza = calcularFuerza(form.contraseña);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const limite = LIMITES[name].max;
        setForm({ ...form, [name]: value.slice(0, limite) });
        if (exito) setExito(null);
    };

    const handleBlur = (e) => {
        setTocado({ ...tocado, [e.target.name]: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTocado({ nombre: true, correo: true, contraseña: true });

        if (!formularioValido) {
            setExito({ tipo: 'danger', mensaje: 'Revisa los campos marcados antes de continuar.' });
            return;
        }

        setCargando(true);
        const nombre = form.nombre.trim();

        setTimeout(() => {
            setExito({ tipo: 'success', mensaje: `Registro exitoso. Bienvenido a Panadería ELI, ${nombre}.` });
            setForm({ nombre: '', correo: '', contraseña: '' });
            setTocado({ nombre: false, correo: false, contraseña: false });
            setCargando(false);
        }, 800);
    };

    const claseInput = (campo) => {
        if (!tocado[campo]) return 'form-control';
        return errores[campo] ? 'form-control is-invalid' : 'form-control is-valid';
    };

    return (
        <div className="app-bg">
            <span className="app-shape app-shape--lg" aria-hidden="true"></span>
            <span className="app-shape app-shape--md" aria-hidden="true"></span>
            <span className="app-shape app-shape--sm" aria-hidden="true"></span>
            <span className="app-shape app-shape--ring" aria-hidden="true"></span>

            <main className="container d-flex justify-content-center">
                <div className="tarjeta">

                    <div className="marca">
                        <span className="marca__logo">ELI</span>
                        <span className="marca__separador" aria-hidden="true"></span>
                        <span className="marca__tag">Panadería</span>
                    </div>

                    <h1 className="titulo">Crear cuenta</h1>
                    <p className="subtitulo">Recibe el pan más fresco cada día.</p>

                    {exito && (
                        <div className={`alert alert-${exito.tipo} py-2`} role="alert">
                            {exito.mensaje}
                        </div>
                    )}

                    <form noValidate onSubmit={handleSubmit}>
                        <div className="mb-3 campo-stagger">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                className={claseInput('nombre')}
                                placeholder="Tu nombre"
                                autoComplete="name"
                                required
                                minLength={LIMITES.nombre.min}
                                maxLength={LIMITES.nombre.max}
                                value={form.nombre}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {tocado.nombre && errores.nombre && (
                                <div className="invalid-feedback d-block">{errores.nombre}</div>
                            )}
                        </div>

                        <div className="mb-3 campo-stagger">
                            <label htmlFor="correo" className="form-label">Correo</label>
                            <input
                                type="email"
                                id="correo"
                                name="correo"
                                className={claseInput('correo')}
                                placeholder="ejemplo@correo.com"
                                autoComplete="email"
                                required
                                maxLength={LIMITES.correo.max}
                                value={form.correo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {tocado.correo && errores.correo && (
                                <div className="invalid-feedback d-block">{errores.correo}</div>
                            )}
                        </div>

                        <div className="mb-3 campo-stagger">
                            <label htmlFor="contraseña" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                id="contraseña"
                                name="contraseña"
                                className={claseInput('contraseña')}
                                placeholder="Mínimo 8 caracteres"
                                autoComplete="new-password"
                                required
                                minLength={LIMITES.contraseña.min}
                                maxLength={LIMITES.contraseña.max}
                                value={form.contraseña}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {tocado.contraseña && errores.contraseña && (
                                <div className="invalid-feedback d-block">{errores.contraseña}</div>
                            )}
                            {form.contraseña.length > 0 && (
                                <div className="fuerza">
                                    <div className="fuerza__barras" aria-hidden="true">
                                        <span className={`fuerza__segmento ${fuerza >= 1 ? `activo-${fuerza}` : ''}`}></span>
                                        <span className={`fuerza__segmento ${fuerza >= 2 ? `activo-${fuerza}` : ''}`}></span>
                                        <span className={`fuerza__segmento ${fuerza >= 3 ? `activo-${fuerza}` : ''}`}></span>
                                    </div>
                                    <span className={`fuerza__etiqueta nivel-${fuerza}`}>
                                        {ETIQUETAS_FUERZA[fuerza]}
                                    </span>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-eli w-100"
                            disabled={cargando}
                        >
                            {cargando ? (
                                <>
                                    <span className="spinner" aria-hidden="true"></span>
                                    Creando cuenta...
                                </>
                            ) : (
                                'Crear cuenta'
                            )}
                        </button>

                        <p className="text-center mt-3 mb-0 small text-muted">
                            ¿Ya tienes cuenta? <a href="#" className="enlace-eli">Inicia sesión</a>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default App;
