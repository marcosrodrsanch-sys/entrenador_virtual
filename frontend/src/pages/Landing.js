import React from 'react';
import logo from '../assets/pesa.png';
import heroImage from '../assets/remoCopia1.jpg';

const Landing = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-center py-3 bg-background-dark/80 backdrop-blur-sm border-b border-solid border-white/10">
        <nav className="flex items-center justify-between w-full max-w-6xl px-4 mx-auto">
          <div className="flex items-center gap-4 text-white">
            <img src={logo} alt="AI Trainer" className="h-8 w-auto" />
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">AI Trainer</h2>
          </div>
          <div className="hidden md:flex flex-1 justify-end gap-2">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-black text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
              <span className="truncate">Registrarse Gratis</span>
            </button>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Iniciar Sesión</span>
            </button>
          </div>
          <div className="md:hidden text-white">
            <span className="material-symbols-outlined">menu</span>
          </div>
        </nav>
      </header>

    
    {/*Foto*/}
      <main className="flex flex-col items-center justify-center w-full grow">
        <div className="flex flex-col w-full max-w-6xl px-4 mx-auto">
          {/* Hero Section */}
          <section className="py-20 md:py-32">
            <div 
              className="flex min-h-[480px] flex-col gap-8 rounded-xl items-center justify-center p-4 text-center bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(16, 34, 22, 0.6) 0%, rgba(16, 34, 22, 0.9) 100%), url(${heroImage})`
              }}
            >
              <div className="flex flex-col gap-4 max-w-3xl">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl">
                  Tu entrenamiento, perfeccionado por la inteligencia artificial
                </h1>
                <h2 className="text-white/90 text-base font-normal leading-normal md:text-lg">
                  Obtén rutinas que se adaptan a ti y un seguimiento de tu progreso en tiempo real para alcanzar tus metas más rápido.
                </h2>
              </div>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-black text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                <span className="truncate">Crear mi plan personalizado</span>
              </button>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 md:py-24">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4 text-center items-center">
                <h2 className="text-white tracking-light text-3xl font-bold leading-tight md:text-4xl md:font-black md:leading-tight md:tracking-[-0.033em] max-w-3xl">
                  Descubre el poder de un entrenamiento inteligente
                </h2>
                <p className="text-white/80 text-base font-normal leading-normal max-w-3xl">
                  Nuestra IA analiza tus datos para ofrecerte una experiencia de fitness única y efectiva.
                </p>
              </div>



              {/*Cards Características*/}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap10 p-0">
                <div className="flex flex-1 gap-6 rounded-xl border border-white/10 bg-white/5 p-8 md:p-10 flex-col text-center items-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="text-primary bg-primary/10 p-4 rounded-full">
                    <span className="material-symbols-outlined !text-5xl">spark</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-white text-xl font-bold leading-tight">Planes Hiper-personalizados</h3>
                    <p className="text-white/70 text-base font-normal leading-relaxed">
                      La IA crea y ajusta tus planes de entrenamiento según tus objetivos y rendimiento.
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 gap-6 rounded-xl border border-white/10 bg-white/5 p-8 md:p-10 flex-col text-center items-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="text-primary bg-primary/10 p-4 rounded-full">
                    <span className="material-symbols-outlined !text-5xl">monitoring</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-white text-xl font-bold leading-tight">Análisis de Progreso Inteligente</h3>
                    <p className="text-white/70 text-base font-normal leading-relaxed">
                      Visualiza tu progreso con gráficos y métricas predictivas para mantenerte motivado.
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 gap-6 rounded-xl border border-white/10 bg-white/5 p-8 md:p-10 flex-col text-center items-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="text-primary bg-primary/10 p-4 rounded-full">
                    <span className="material-symbols-outlined !text-5xl">videocam</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-white text-xl font-bold leading-tight">Feedback en Tiempo Real</h3>
                    <p className="text-white/70 text-base font-normal leading-relaxed">
                      Recibe correcciones sobre tu postura y ritmo para maximizar cada ejercicio.
                    </p>
                  </div>
                </div>
              </div>






            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 md:py-24">
            <div className="flex flex-col gap-8">
              <h2 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em] text-center">
                Lo que dicen nuestros usuarios
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex h-full flex-col gap-4 text-center rounded-lg">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center size-24 bg-gray-600"></div>
                  <div>
                    <p className="text-white/70 text-base font-normal leading-normal italic">
                      "Nunca estuve tan motivado. Las rutinas son desafiantes pero perfectas para mí."
                    </p>
                    <p className="text-white text-base font-medium leading-normal mt-2">Alex Gómez</p>
                  </div>
                </div>
                <div className="flex h-full flex-col gap-4 text-center rounded-lg">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center size-24 bg-gray-600"></div>
                  <div>
                    <p className="text-white/70 text-base font-normal leading-normal italic">
                      "Ver mi progreso con los gráficos me cambió el juego por completo. ¡Es adictivo!"
                    </p>
                    <p className="text-white text-base font-medium leading-normal mt-2">Sofía Martín</p>
                  </div>
                </div>
                <div className="flex h-full flex-col gap-4 text-center rounded-lg">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center size-24 bg-gray-600"></div>
                  <div>
                    <p className="text-white/70 text-base font-normal leading-normal italic">
                      "La corrección de postura me ha ayudado a evitar lesiones y sentirme más seguro."
                    </p>
                    <p className="text-white text-base font-medium leading-normal mt-2">Carlos Ruiz</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section - NUEVA */}
          <section className="py-16 md:py-24 border-t border-white/10" id="contacto">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col items-center text-center gap-4">
                <h2 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em] md:text-4xl md:font-black">
                  Contacta con Nosotros
                </h2>
                <p className="text-white/80 max-w-2xl">
                  ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Rellena el formulario o utiliza nuestros otros canales de contacto.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-6">
                  <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/90 text-sm font-medium" htmlFor="name">Nombre</label>
                      <input 
                        className="bg-white/5 border border-white/10 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-white/40" 
                        id="name" 
                        placeholder="Tu nombre completo" 
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/90 text-sm font-medium" htmlFor="email">Correo Electrónico</label>
                      <input 
                        className="bg-white/5 border border-white/10 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-white/40" 
                        id="email" 
                        placeholder="tu@email.com" 
                        type="email"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/90 text-sm font-medium" htmlFor="message">Mensaje</label>
                      <textarea 
                        className="bg-white/5 border border-white/10 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-white/40 resize-none" 
                        id="message" 
                        placeholder="¿En qué podemos ayudarte?" 
                        rows="4"
                      ></textarea>
                    </div>
                    <button 
                      className="flex items-center justify-center w-full bg-primary text-black font-bold h-10 px-4 rounded-lg hover:bg-primary/90 transition-colors" 
                      type="submit"
                    >
                      Enviar Mensaje
                    </button>
                  </form>
                </div>
                <div className="flex flex-col gap-8 justify-center">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/10 p-3 rounded-full text-primary">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div>
                        <h3 className="text-white text-lg font-bold">Correo Electrónico</h3>
                        <a className="text-white/70 hover:text-primary transition-colors" href="mailto:soporte@aitrainer.com">
                          soporte@aitrainer.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-white/10 p-3 rounded-full text-primary">
                        <span className="material-symbols-outlined">call</span>
                      </div>
                      <div>
                        <h3 className="text-white text-lg font-bold">Teléfono</h3>
                        <a className="text-white/70 hover:text-primary transition-colors" href="tel:+34912345678">
                          +34 912 345 678
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-white text-lg font-bold">Síguenos</h3>
                    <div className="flex gap-4">
                      <a className="text-white/70 hover:text-primary transition-colors" href="#">
                        <svg className="h-6 w-6" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </a>
                      <a className="text-white/70 hover:text-primary transition-colors" href="#">
                        <svg className="h-6 w-6" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 2.8 3.2 3 5.2-1.4 1.2-3.1 2-4.9 2.4-1.2 3.4-4.1 5.8-7.7 6.3-1.4.2-2.8 0-4.2-.5-3.6-1.2-6.5-4.1-7.5-7.7-.9-3.2.3-6.6 2.8-8.8 1.5-1.3 3.3-2.1 5.2-2.3 2.2-.2 4.5.5 6.4 1.8 1.2.9 2.3 1.8 3.4 2.8.1.1.2.2.3.3v.1c.1-.1.2-.2.2-.2.1-.1.2-.2.3-.3.1-.1.2-.2.3-.3.1-.1.2-.1.2-.2.1 0 .2-.1.3-.1.1 0 .2-.1.3-.1s.2-.1.3-.1.2 0 .3-.1.2-.1.3-.1.2 0 .3 0 .2 0 .3.1.2.1.3.1.2.1.3.2.2.1.3.2.1.1.2.2.1.2.2.3.1.1.2.2.1.2.2.3.1.2.2.3.1.1.2.2.1.1.2.2.1 0 .1.1.1.1.2.1.1.1.2.2.1.1.2.2.1.1.1.2.1.1.1.2v.1c0 .1-.1.2-.1.3-.1.1-.1.2-.2.3s-.2.2-.3.3-.2.2-.3.3-.2.1-.3.2-.2.1-.3.2-.2.1-.3.1-.2.1-.3.1-.2 0-.3.1-.2 0-.3 0-.2 0-.3 0-.2 0-.3-.1-.2 0-.3-.1-.2-.1-.3-.1-.2-.1-.3-.1-.2-.1-.3-.2-.2-.1-.3-.2-.1-.1-.2-.2-.1-.2-.2-.3-.1-.2-.2-.3-.1-.2-.2-.3-.1-.1-.2-.2-.1-.2-.2-.3-.1-.1-.1-.2-.1-.1-.1-.2v-.1z"></path>
                        </svg>
                      </a>
                      <a className="text-white/70 hover:text-primary transition-colors" href="#">
                        <svg className="h-6 w-6" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                          <rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-background-dark border-t border-solid border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50">© 2025 AI Trainer. Todos los derechos reservados.</p>
            <div className="flex gap-4 text-sm text-white/70">
              <a className="hover:text-white transition-colors" href="#">Términos de Servicio</a>
              <a className="hover:text-white transition-colors" href="#">Política de Privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;