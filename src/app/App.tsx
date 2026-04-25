import { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from 'motion/react';
import {
  Scale,
  Briefcase,
  FileText,
  ShoppingCart,
  Star,
  Phone,
  Instagram,
  MapPin,
  MessageCircle,
  ChevronDown,
  Award,
  Target,
  TrendingUp,
  Menu,
  X,
  Users,
  ArrowUp,
} from 'lucide-react';
import professionalPhoto from 'figma:asset/ea4499811dbcff2f321fd4b60be65790d594d985.png';

/* ─────────────────────────────────────────────
   Animated counter – counts up when scrolled into view
───────────────────────────────────────────── */
function StatCounter({
  end,
  suffix,
  label,
  delay = 0,
}: {
  end: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const duration = 1800;
      let startTime: number;
      const animate = (ts: number) => {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * end));
        if (progress < 1) requestAnimationFrame(animate);
        else setCount(end);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isInView, end, delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${delay / 1000 + 0.1}s, transform 0.5s ease ${delay / 1000 + 0.1}s`,
      }}
      className="text-center group"
    >
      <div
        className="text-4xl sm:text-5xl font-bold text-[#C8A96E]"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        {count}
        {suffix}
      </div>
      <div className="w-6 h-px bg-[#C8A96E]/40 mx-auto my-2 group-hover:w-10 transition-all duration-300" />
      <div className="text-xs sm:text-sm text-[#F5F0E8]/55 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Reusable section heading with gold divider
───────────────────────────────────────────── */
function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl mb-5 text-[#FFFFFF]"
        style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
      >
        {title}
      </h2>
      {/* Gold decorative divider */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C8A96E]" />
        <div className="w-2 h-2 bg-[#C8A96E] rotate-45 shrink-0" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C8A96E]" />
      </div>
      {subtitle && (
        <p className="text-base sm:text-lg text-[#F5F0E8]/70 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main App
───────────────────────────────────────────── */
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const navbarBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(8, 13, 20, 0)', 'rgba(8, 13, 20, 0.95)'],
  );

  useEffect(
    () =>
      scrollY.on('change', (v) => {
        setShowBackToTop(v > 500);
      }),
    [scrollY],
  );

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const testimonials = [
    {
      name: 'Maria Silva',
      text: 'Profissional extremamente competente e atencioso. Resolveu meu caso com agilidade e transparência. Recomendo sem reservas!',
      rating: 5,
    },
    {
      name: 'João Santos',
      text: 'Excelente advogado! Me orientou em todas as etapas do processo e conseguiu um resultado muito além das minhas expectativas. Muito obrigado!',
      rating: 5,
    },
    {
      name: 'Ana Oliveira',
      text: 'Muito profissional e dedicado. Senti total segurança durante todo o processo. Com certeza voltarei a contratar seus serviços.',
      rating: 5,
    },
  ];

  const navLinks = [
    { id: 'sobre', label: 'Sobre' },
    { id: 'areas', label: 'Áreas' },
    { id: 'depoimentos', label: 'Depoimentos' },
  ];

  return (
    <div
      className="min-h-screen bg-[#1A1A2E] text-[#F5F0E8]"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C8A96E] via-[#E8D5B0] to-[#C8A96E] z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ── Navbar ── */}
      <motion.nav
        style={{ backgroundColor: navbarBg }}
        className="fixed top-[3px] left-0 right-0 z-50 backdrop-blur-md border-b border-[#C8A96E]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <h2
              className="text-xl sm:text-2xl font-bold text-[#C8A96E] cursor-pointer select-none"
              style={{ fontFamily: 'Playfair Display, serif' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Dr. Christian Almeida
            </h2>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="relative text-[#F5F0E8] hover:text-[#C8A96E] transition-colors group"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C8A96E] group-hover:w-full transition-all duration-300" />
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contato')}
                className="bg-[#C8A96E] text-[#1A1A2E] px-6 py-2.5 rounded-full hover:bg-[#E8D5B0] transition-all duration-300 shadow-lg shadow-[#C8A96E]/20 font-semibold"
              >
                Contato
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-[#F5F0E8] p-2"
              aria-label="Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="md:hidden bg-[#16213E] border-b border-[#C8A96E]/20 shadow-xl overflow-hidden"
            >
              <div className="px-4 py-6 space-y-1">
                {navLinks.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="block w-full text-left py-3 px-2 text-[#F5F0E8] hover:text-[#C8A96E] transition-colors border-b border-[#C8A96E]/10"
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection('contato')}
                  className="w-full bg-[#C8A96E] text-[#1A1A2E] px-6 py-3 rounded-full hover:bg-[#E8D5B0] transition-all duration-300 font-semibold mt-3"
                >
                  Contato
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Floating WhatsApp button ── */}
      <motion.a
        href="https://wa.me/5571992224023"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center whatsapp-ring"
        aria-label="Fale pelo WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
      </motion.a>

      {/* ── Back to top ── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-6 z-50 w-11 h-11 bg-[#C8A96E]/15 border border-[#C8A96E]/40 rounded-full flex items-center justify-center text-[#C8A96E] hover:bg-[#C8A96E]/30 hover:border-[#C8A96E]/70 transition-all duration-300 backdrop-blur-sm"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#16213E] via-[#1A1A2E] to-[#1A1A2E]" />

        {/* Animated background blobs */}
        <div className="absolute top-1/4 left-8 sm:left-20 w-72 h-72 sm:w-[26rem] sm:h-[26rem] bg-[#C8A96E]/8 rounded-full blur-3xl animate-float-1 pointer-events-none" />
        <div className="absolute bottom-1/4 right-8 sm:right-20 w-80 h-80 sm:w-[30rem] sm:h-[30rem] bg-[#C8A96E]/5 rounded-full blur-3xl animate-float-2 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Photo with rotating gradient border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 90 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56">
              {/* Soft pulsing glow behind */}
              <div className="absolute inset-0 rounded-full bg-[#C8A96E]/30 blur-2xl scale-125 animate-[pulse_4s_ease-in-out_infinite]" />
              {/* Rotating conic gradient ring */}
              <div
                className="absolute inset-0 rounded-full rotate-conic"
                style={{
                  background:
                    'conic-gradient(from 0deg, #C8A96E, #E8D5B0, #C8A96E60, #16213E, #C8A96E)',
                }}
              />
              {/* Static inner circle – clips image, hides ring's inside */}
              <div className="absolute inset-[3px] rounded-full overflow-hidden bg-[#16213E]">
                <img
                  src={professionalPhoto}
                  alt="Dr. Christian Almeida"
                  className="w-full h-full object-contain bg-[#16213E]"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#C8A96E]/10 border border-[#C8A96E]/30 px-4 py-2 rounded-full mb-6">
              <Award className="w-4 h-4 text-[#C8A96E]" />
              <span className="text-sm text-[#C8A96E] font-medium">OAB/BA</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-4 text-[#FFFFFF]"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            Dr. Christian Almeida
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl lg:text-2xl mb-3 text-[#E8D5B0]"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            "Estratégia e técnica a serviço dos seus direitos."
          </motion.p>

          <motion.p
            className="text-base sm:text-lg text-[#F5F0E8]/60 mb-10 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            Teixeira &amp; Hora Advogados Associados
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
          >
            <motion.button
              onClick={() => scrollToSection('contato')}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto bg-[#C8A96E] text-[#1A1A2E] px-8 py-4 rounded-full shadow-lg shadow-[#C8A96E]/30 font-semibold text-base transition-colors hover:bg-[#E8D5B0]"
            >
              Entre em Contato
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('areas')}
              whileHover={{ scale: 1.06, backgroundColor: 'rgba(200,169,110,0.12)' }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto bg-transparent border-2 border-[#C8A96E] text-[#C8A96E] px-8 py-4 rounded-full transition-all duration-300 font-medium"
            >
              Ver Áreas de Atuação
            </motion.button>
          </motion.div>

          {/* Animated chevron */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-6 h-6 text-[#C8A96E]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          STATS
      ════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#0F2A4A] border-y border-[#C8A96E]/10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
          <StatCounter end={5}   suffix="+"  label="Anos de Experiência" delay={0}   />
          <StatCounter end={200} suffix="+"  label="Clientes Atendidos"  delay={150} />
          <StatCounter end={98}  suffix="%"  label="Taxa de Satisfação"  delay={300} />
          <StatCounter end={5}   suffix=""   label="Áreas de Atuação"    delay={450} />
        </div>
      </section>

      {/* ════════════════════════════════════════
          SOBRE
      ════════════════════════════════════════ */}
      <section id="sobre" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#16213E]">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Sobre"
            subtitle="Com sólida formação jurídica e experiência em casos complexos, atuo com dedicação para garantir que seus direitos sejam protegidos. Minha abordagem combina conhecimento técnico, visão estratégica e atendimento humanizado, sempre buscando as melhores soluções para cada cliente."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Target,
                title: 'Atendimento Personalizado',
                description:
                  'Cada caso é único. Ofereço atenção exclusiva e soluções sob medida para suas necessidades jurídicas.',
              },
              {
                icon: TrendingUp,
                title: 'Visão Estratégica',
                description:
                  'Analiso todos os ângulos do seu caso para traçar a melhor estratégia e maximizar suas chances de êxito.',
              },
              {
                icon: Award,
                title: 'Resultado Comprovado',
                description:
                  'Histórico consistente de sucesso na defesa dos interesses dos clientes, com transparência e ética.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative bg-[#0F2A4A] border border-[#C8A96E]/20 rounded-2xl p-8 hover:border-[#C8A96E]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#C8A96E]/10 overflow-hidden group"
              >
                {/* Top border reveal */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A96E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="bg-[#C8A96E]/10 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#C8A96E]/20 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-7 h-7 text-[#C8A96E]" />
                </div>
                <h3
                  className="text-xl mb-3 text-[#FFFFFF]"
                  style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}
                >
                  {item.title}
                </h3>
                <p className="text-[#F5F0E8]/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ÁREAS DE ATUAÇÃO
      ════════════════════════════════════════ */}
      <section id="areas" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A2E]">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Áreas de Atuação"
            subtitle="Soluções jurídicas completas para pessoas físicas e jurídicas"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                icon: Scale,
                title: 'Direito Cível',
                description:
                  'Atuação completa em contratos, responsabilidade civil, direito de família e sucessões, com análise estratégica e soluções seguras para proteção do seu patrimônio.',
              },
              {
                icon: Briefcase,
                title: 'Direito Penal',
                description:
                  'Atuação em todas as fases da persecução penal, com acompanhamento em autos de prisão em flagrante e audiências de custódia, condução de ações penais e atuação estratégica perante o Tribunal do Júri, com foco na proteção das garantias fundamentais e na construção de defesa técnica consistente.',
              },
              {
                icon: Users,
                title: 'Direito do Trabalho',
                description:
                  'Atuação em demandas trabalhistas, tanto na esfera preventiva quanto contenciosa, com elaboração de peças, assessoria jurídica e condução de processos, visando a efetiva proteção de direitos e a solução estratégica de conflitos entre empregado e empregador.',
              },
              {
                icon: FileText,
                title: 'Consultoria Jurídica',
                description:
                  'Consultoria jurídica estratégica para empresas, com foco na prevenção de riscos, elaboração de pareceres técnicos e suporte seguro para tomada de decisões.',
              },
              {
                icon: ShoppingCart,
                title: 'Direito do Consumidor',
                description:
                  'Defesa de direitos do consumidor, vícios de produtos, cobranças indevidas e indenizações.',
              },
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                /* Last card: centered when alone in a 2-col grid */
                className={`relative bg-[#16213E] border border-[#C8A96E]/20 rounded-2xl p-8 hover:border-[#C8A96E]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#C8A96E]/10 group overflow-hidden${index === 4 ? ' sm:col-span-2 sm:max-w-lg sm:mx-auto w-full' : ''}`}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A96E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="bg-[#C8A96E]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C8A96E]/20 group-hover:scale-110 transition-all duration-300">
                  <area.icon className="w-8 h-8 text-[#C8A96E]" />
                </div>
                <h3
                  className="text-xl sm:text-2xl mb-3 text-[#FFFFFF]"
                  style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}
                >
                  {area.title}
                </h3>
                <p className="text-[#F5F0E8]/70 leading-relaxed">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          DEPOIMENTOS
      ════════════════════════════════════════ */}
      <section id="depoimentos" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#16213E]">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Depoimentos" subtitle="O que dizem nossos clientes" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {testimonials.map((dep, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative bg-[#0F2A4A] border border-[#C8A96E]/20 rounded-2xl p-8 hover:border-[#C8A96E]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#C8A96E]/10 group overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A96E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Decorative quote mark */}
                <div
                  className="text-[#C8A96E]/10 text-8xl leading-none mb-1 select-none"
                  aria-hidden
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  ❝
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(dep.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C8A96E] text-[#C8A96E]" />
                  ))}
                </div>
                <p className="text-[#F5F0E8]/80 leading-relaxed mb-6 italic text-sm sm:text-base">
                  "{dep.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#C8A96E]/20 flex items-center justify-center text-[#C8A96E] font-bold shrink-0">
                    {dep.name.charAt(0)}
                  </div>
                  <p
                    className="text-[#E8D5B0]"
                    style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}
                  >
                    {dep.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CONTATO RÁPIDO
      ════════════════════════════════════════ */}
      <section id="contato" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A2E]">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Entre em Contato" subtitle="Estou à disposição para ajudá-lo" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: MessageCircle,
                title: 'WhatsApp',
                className: 'bg-[#25D366] hover:bg-[#1fc857] shadow-[#25D366]/25',
                link: 'https://wa.me/5571992224023',
              },
              {
                icon: Instagram,
                title: 'Instagram',
                className:
                  'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 shadow-purple-500/20',
                link: 'https://instagram.com/dchristianlp',
              },
              {
                icon: Phone,
                title: 'Ligar',
                className: 'bg-[#C8A96E] hover:bg-[#E8D5B0] shadow-[#C8A96E]/25',
                link: 'tel:+5571992224023',
              },
              {
                icon: MapPin,
                title: 'Localização',
                className: 'bg-[#C8A96E] hover:bg-[#E8D5B0] shadow-[#C8A96E]/25',
                link: 'https://maps.google.com/?q=Rua+Conselheiro+Dantas,+22,+Comércio,+Salvador,+BA',
              },
            ].map((btn, index) => (
              <motion.a
                key={index}
                href={btn.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className={`${btn.className} text-white p-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                <btn.icon className="w-6 h-6" />
                <span className="text-lg font-semibold">{btn.title}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          MAPA / ESCRITÓRIO
      ════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#16213E]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl mb-5 text-[#FFFFFF]"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
            >
              Nosso Escritório
            </h2>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C8A96E]" />
              <div className="w-2 h-2 bg-[#C8A96E] rotate-45 shrink-0" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C8A96E]" />
            </div>
            <div className="flex items-center justify-center gap-2 text-base sm:text-lg text-[#F5F0E8]/70">
              <MapPin className="w-5 h-5 text-[#C8A96E] shrink-0" />
              <p>Rua Conselheiro Dantas, nº 22, Comércio, Salvador/BA</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden border border-[#C8A96E]/20 shadow-2xl shadow-[#C8A96E]/5"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5!2d-38.51!3d-12.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzEzLjIiUyAzOMKwMzAnMzYuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-700"
              title="Localização do escritório"
            />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className="bg-[#0F2A4A] border-t border-[#C8A96E]/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3
              className="text-2xl sm:text-3xl mb-2 text-[#FFFFFF]"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
            >
              Dr. Christian Almeida
            </h3>
            <p className="text-[#F5F0E8]/50 mb-6 tracking-widest text-xs uppercase">
              Advogado | OAB/BA
            </p>
            <div className="flex justify-center gap-6 mb-8">
              {[
                { href: 'https://wa.me/5571992224023', icon: MessageCircle, label: 'WhatsApp' },
                {
                  href: 'https://instagram.com/dchristianlp',
                  icon: Instagram,
                  label: 'Instagram',
                },
                { href: 'tel:+5571992224023', icon: Phone, label: 'Telefone' },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-[#C8A96E] hover:text-[#E8D5B0] transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="border-t border-[#C8A96E]/10 pt-8 text-center">
            <p className="text-sm text-[#F5F0E8]/40">
              © {new Date().getFullYear()} Dr. Christian Almeida — Todos os direitos reservados
            </p>
            <p className="text-sm text-[#F5F0E8]/40 mt-1">
              Teixeira &amp; Hora Advogados Associados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
