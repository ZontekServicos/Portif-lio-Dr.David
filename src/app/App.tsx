import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
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
  Users
} from 'lucide-react';
import professionalPhoto from 'figma:asset/ea4499811dbcff2f321fd4b60be65790d594d985.png';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navbarBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(8, 13, 20, 0)', 'rgba(8, 13, 20, 0.95)']
  );

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-[#F5F0E8]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Navbar */}
      <motion.nav 
        style={{ backgroundColor: navbarBg }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[#C8A96E]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex-shrink-0">
              <h2 
                className="text-xl sm:text-2xl font-bold text-[#C8A96E]" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Dr. Christian Almeida
              </h2>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('sobre')}
                className="text-[#F5F0E8] hover:text-[#C8A96E] transition-colors"
              >
                Sobre
              </button>
              <button 
                onClick={() => scrollToSection('areas')}
                className="text-[#F5F0E8] hover:text-[#C8A96E] transition-colors"
              >
                Áreas
              </button>
              <button 
                onClick={() => scrollToSection('depoimentos')}
                className="text-[#F5F0E8] hover:text-[#C8A96E] transition-colors"
              >
                Depoimentos
              </button>
              <button 
                onClick={() => scrollToSection('contato')}
                className="bg-[#C8A96E] text-[#1A1A2E] px-6 py-2.5 rounded-full hover:bg-[#E8D5B0] transition-all duration-300 shadow-lg shadow-[#C8A96E]/20"
              >
                Contato
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-[#F5F0E8] p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 sm:top-20 left-0 right-0 bg-[#16213E] border-b border-[#C8A96E]/20 shadow-xl"
          >
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => scrollToSection('sobre')}
                className="block w-full text-left py-3 text-[#F5F0E8] hover:text-[#C8A96E] transition-colors"
              >
                Sobre
              </button>
              <button 
                onClick={() => scrollToSection('areas')}
                className="block w-full text-left py-3 text-[#F5F0E8] hover:text-[#C8A96E] transition-colors"
              >
                Áreas
              </button>
              <button 
                onClick={() => scrollToSection('depoimentos')}
                className="block w-full text-left py-3 text-[#F5F0E8] hover:text-[#C8A96E] transition-colors"
              >
                Depoimentos
              </button>
              <button 
                onClick={() => scrollToSection('contato')}
                className="w-full bg-[#C8A96E] text-[#1A1A2E] px-6 py-3 rounded-full hover:bg-[#E8D5B0] transition-all duration-300"
              >
                Contato
              </button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#16213E] via-[#1A1A2E] to-[#1A1A2E]"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#C8A96E]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#C8A96E]/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#C8A96E] to-[#E8D5B0] rounded-full blur-xl opacity-50"></div>
              <img
                src={professionalPhoto}
                alt="Dr. Christian Almeida"
                className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full object-contain bg-[#16213E] border-4 border-[#C8A96E] shadow-2xl shadow-[#C8A96E]/30"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#C8A96E]/10 border border-[#C8A96E]/30 px-4 py-2 rounded-full mb-6">
              <Award className="w-4 h-4 text-[#C8A96E]" />
              <span className="text-sm text-[#C8A96E]">OAB/BA</span>
            </div>

            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-4 text-[#FFFFFF]"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
            >
              Dr. Christian Almeida
            </h1>

            <p 
              className="text-lg sm:text-xl lg:text-2xl mb-3 text-[#E8D5B0]"
              style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'normal', fontWeight: 400 }}
            >
              "Estratégia e técnica a serviço dos seus direitos."
            </p>

            <p className="text-base sm:text-lg text-[#F5F0E8]/70 mb-10 max-w-2xl mx-auto">
              Teixeira & Hora Advogados Associados
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => scrollToSection('contato')}
                className="w-full sm:w-auto bg-[#C8A96E] text-[#1A1A2E] px-8 py-4 rounded-full hover:bg-[#E8D5B0] transition-all duration-300 shadow-lg shadow-[#C8A96E]/30 hover:shadow-[#E8D5B0]/30 hover:scale-105"
              >
                Entre em Contato
              </button>
              <button 
                onClick={() => scrollToSection('areas')}
                className="w-full sm:w-auto bg-transparent border-2 border-[#C8A96E] text-[#C8A96E] px-8 py-4 rounded-full hover:bg-[#C8A96E]/10 transition-all duration-300"
              >
                Ver Áreas de Atuação
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 text-[#C8A96E] animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#16213E]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl mb-6 text-[#FFFFFF]"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
            >
              Sobre
            </h2>
            <p className="text-base sm:text-lg text-[#F5F0E8]/70 max-w-3xl mx-auto leading-relaxed">
              Com sólida formação jurídica e experiência em casos complexos, atuo com dedicação 
              para garantir que seus direitos sejam protegidos. Minha abordagem combina conhecimento 
              técnico, visão estratégica e atendimento humanizado, sempre buscando as melhores soluções 
              para cada cliente.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Target,
                title: "Atendimento Personalizado",
                description: "Cada caso é único. Ofereço atenção exclusiva e soluções sob medida para suas necessidades jurídicas."
              },
              {
                icon: TrendingUp,
                title: "Visão Estratégica",
                description: "Analiso todos os ângulos do seu caso para traçar a melhor estratégia e maximizar suas chances de êxito."
              },
              {
                icon: Award,
                title: "Resultado Comprovado",
                description: "Histórico consistente de sucesso na defesa dos interesses dos clientes, com transparência e ética."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#0F2A4A] border border-[#C8A96E]/20 rounded-2xl p-8 hover:border-[#C8A96E]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#C8A96E]/10"
              >
                <div className="bg-[#C8A96E]/10 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-[#C8A96E]" />
                </div>
                <h3 className="text-xl mb-3 text-[#FFFFFF]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
                  {item.title}
                </h3>
                <p className="text-[#F5F0E8]/70 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section id="areas" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A2E]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl mb-6 text-[#FFFFFF]"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
            >
              Áreas de Atuação
            </h2>
            <p className="text-base sm:text-lg text-[#F5F0E8]/70 max-w-3xl mx-auto">
              Soluções jurídicas completas para pessoas físicas e jurídicas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                icon: Scale,
                title: "Direito Cível",
                description: "Atuação completa em contratos, responsabilidade civil, direito de família e sucessões, com análise estratégica e soluções seguras para proteção do seu patrimônio."
              },
              {
                icon: Briefcase,
                title: "Direito Penal",
                description: "Atuação em todas as fases da persecução penal, com acompanhamento em autos de prisão em flagrante e audiências de custódia, condução de ações penais e atuação estratégica perante o Tribunal do Júri, com foco na proteção das garantias fundamentais e na construção de defesa técnica consistente."
              },
              {
                icon: Users,
                title: "Direito do Trabalho",
                description: "Atuação em demandas trabalhistas, tanto na esfera preventiva quanto contenciosa, com elaboração de peças, assessoria jurídica e condução de processos, visando a efetiva proteção de direitos e a solução estratégica de conflitos entre empregado e empregador."
              },
              {
                icon: FileText,
                title: "Consultoria Jurídica",
                description: "Consultoria jurídica estratégica para empresas, com foco na prevenção de riscos, elaboração de pareceres técnicos e suporte seguro para tomada de decisões."
              },
              {
                icon: ShoppingCart,
                title: "Direito do Consumidor",
                description: "Defesa de direitos do consumidor, vícios de produtos, cobranças indevidas e indenizações."
              }
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#16213E] border border-[#C8A96E]/20 rounded-2xl p-8 hover:border-[#C8A96E]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#C8A96E]/10 group"
              >
                <div className="bg-[#C8A96E]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C8A96E]/20 transition-colors">
                  <area.icon className="w-8 h-8 text-[#C8A96E]" />
                </div>
                <h3 className="text-xl sm:text-2xl mb-3 text-[#FFFFFF]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
                  {area.title}
                </h3>
                <p className="text-[#F5F0E8]/70 leading-relaxed">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#16213E]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl mb-6 text-[#FFFFFF]"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
            >
              Depoimentos
            </h2>
            <p className="text-base sm:text-lg text-[#F5F0E8]/70">
              O que dizem nossos clientes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                name: "Maria Silva",
                text: "Profissional extremamente competente e atencioso. Resolveu meu caso com agilidade e transparência. Recomendo sem reservas!",
                rating: 5
              },
              {
                name: "João Santos",
                text: "Excelente advogado! Me orientou em todas as etapas do processo e conseguiu um resultado muito além das minhas expectativas. Muito obrigado!",
                rating: 5
              }
            ].map((depoimento, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#0F2A4A] border border-[#C8A96E]/20 rounded-2xl p-8 hover:border-[#C8A96E]/50 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(depoimento.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C8A96E] text-[#C8A96E]" />
                  ))}
                </div>
                <p className="text-[#F5F0E8]/70 leading-relaxed mb-6 italic">
                  "{depoimento.text}"
                </p>
                <p className="text-[#E8D5B0]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
                  {depoimento.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato Rápido */}
      <section id="contato" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A2E]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl mb-6 text-[#FFFFFF]"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
            >
              Entre em Contato
            </h2>
            <p className="text-base sm:text-lg text-[#F5F0E8]/70">
              Estou à disposição para ajudá-lo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: MessageCircle,
                title: "WhatsApp",
                color: "bg-[#25D366]",
                hoverColor: "hover:bg-[#1fc757]",
                link: "https://wa.me/5571992224023"
              },
              {
                icon: Instagram,
                title: "Instagram",
                color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
                hoverColor: "hover:opacity-90",
                link: "https://instagram.com/dchristianlp"
              },
              {
                icon: Phone,
                title: "Ligar",
                color: "bg-[#C8A96E]",
                hoverColor: "hover:bg-[#E8D5B0]",
                link: "tel:+5571992224023"
              },
              {
                icon: MapPin,
                title: "Localização",
                color: "bg-[#C8A96E]",
                hoverColor: "hover:bg-[#E8D5B0]",
                link: "https://maps.google.com/?q=Rua+Conselheiro+Dantas,+22,+Comércio,+Salvador,+BA"
              }
            ].map((btn, index) => (
              <motion.a
                key={index}
                href={btn.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${btn.color} ${btn.hoverColor} text-white p-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105`}
              >
                <btn.icon className="w-6 h-6" />
                <span className="text-lg">{btn.title}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Mapa e Endereço */}
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
              className="text-3xl sm:text-4xl lg:text-5xl mb-6 text-[#FFFFFF]"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
            >
              Nosso Escritório
            </h2>
            <div className="flex items-center justify-center gap-2 text-base sm:text-lg text-[#F5F0E8]/70">
              <MapPin className="w-5 h-5 text-[#C8A96E]" />
              <p>Rua Conselheiro Dantas, nº 22, Comércio, Salvador/BA</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden border border-[#C8A96E]/20 shadow-2xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5!2d-38.51!3d-12.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzEzLjIiUyAzOMKwMzAnMzYuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F2A4A] border-t border-[#C8A96E]/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 
              className="text-2xl sm:text-3xl mb-2 text-[#FFFFFF]"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
            >
              Dr. Christian Almeida
            </h3>
            <p className="text-[#F5F0E8]/70 mb-6">
              Advogado | OAB/BA
            </p>
            <div className="flex justify-center gap-6 mb-8">
              <a
                href="https://wa.me/5571992224023"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C8A96E] hover:text-[#E8D5B0] transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com/dchristianlp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C8A96E] hover:text-[#E8D5B0] transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="tel:+5571992224023"
                className="text-[#C8A96E] hover:text-[#E8D5B0] transition-colors"
              >
                <Phone className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="border-t border-[#C8A96E]/20 pt-8 text-center">
            <p className="text-sm text-[#F5F0E8]/50">
              © {new Date().getFullYear()} Dr. Christian Almeida - Todos os direitos reservados
            </p>
            <p className="text-sm text-[#F5F0E8]/50 mt-2">
              Teixeira & Hora Advogados Associados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}