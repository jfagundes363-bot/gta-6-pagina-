/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft,
  ChevronRight,
  Check, 
  X, 
  Zap,
  Gift,
  ArrowRight,
  Instagram,
  Smartphone,
  Lightbulb,
  Clock,
  TrendingUp,
  Gamepad2
} from 'lucide-react';

const CHECKOUT_URL_990 = "https://checkout.wiven.com.br/checkout/cmvza2s9x01n301putdo1r1ki?offer=V0KTHAG";
const CHECKOUT_URL_1490 = "https://checkout.wiven.com.br/checkout/cmvza2s9x01n301putdo1r1ki?offer=96WSX0H";
const CHECKOUT_URL_1990 = "https://checkout.wiven.com.br/checkout/cmvza2s9x01n301putdo1r1ki?offer=V64U71K";

const handleCheckoutClick = (value = 19.90, planName = 'Fábrica GTA VI - Completo') => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'InitiateCheckout', {
      value: value,
      currency: 'BRL',
      content_name: planName
    });
  }
};

interface Testimonial {
  id: number;
  image: string;
  fallback: string;
  aspectClass: string;
  width: number;
  height: number;
}

const testimonials: Testimonial[] = [
  { id: 1, image: "/assets/yzySbU9.webp", fallback: "https://i.imgur.com/yzySbU9.png", aspectClass: "aspect-[853/1844]", width: 853, height: 1844 },
  { id: 2, image: "/assets/lWC3oZv.webp", fallback: "https://i.imgur.com/lWC3oZv.png", aspectClass: "aspect-[852/1846]", width: 852, height: 1846 },
  { id: 3, image: "/assets/E5zmOZf.webp", fallback: "https://i.imgur.com/E5zmOZf.png", aspectClass: "aspect-[852/1846]", width: 852, height: 1846 },
  { id: 4, image: "/assets/fZqUZ3O.webp", fallback: "https://i.imgur.com/fZqUZ3O.png", aspectClass: "aspect-[851/1847]", width: 851, height: 1847 },
  { id: 5, image: "/assets/bWVsx0v.webp", fallback: "https://i.imgur.com/bWVsx0v.png", aspectClass: "aspect-[852/1846]", width: 852, height: 1846 },
  { id: 6, image: "/assets/Q3Tlvs7.webp", fallback: "https://i.imgur.com/Q3Tlvs7.png", aspectClass: "aspect-[941/1672]", width: 941, height: 1672 },
  { id: 7, image: "/assets/eHcPEeU.webp", fallback: "https://i.imgur.com/eHcPEeU.png", aspectClass: "aspect-[941/1672]", width: 941, height: 1672 },
  { id: 8, image: "/assets/s3EHPal.webp", fallback: "https://i.imgur.com/s3EHPal.png", aspectClass: "aspect-[941/1672]", width: 941, height: 1672 },
  { id: 9, image: "/assets/cmGzNnT.webp", fallback: "https://i.imgur.com/cmGzNnT.png", aspectClass: "aspect-[941/1671]", width: 941, height: 1671 },
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // VSL Video Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error('Play error:', err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    setVideoProgress((current / duration) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current || !videoRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = ratio * videoRef.current.duration;
    setVideoProgress(ratio * 100);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setVideoProgress(100);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Calculate days left to launch (19/11/2026)
  const [daysLeft, setDaysLeft] = useState(() => {
    const launch = new Date(2026, 10, 19).getTime();
    const diff = launch - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 17;
  });

  useEffect(() => {
    const updateDays = () => {
      const launch = new Date(2026, 10, 19).getTime();
      const diff = launch - new Date().getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      setDaysLeft(days > 0 ? days : 17);
    };
    updateDays();
    const interval = setInterval(updateDays, 1000 * 60); // update every minute
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  useEffect(() => {
    if (carouselRef.current) {
      const child = carouselRef.current.children[currentSlide] as HTMLElement;
      if (child) {
        child.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentSlide]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased overflow-x-hidden selection:bg-[#ff2d87] selection:text-white">
      
      {/* 1. TOP STICKY URGENCY BANNER */}
      <aside 
        aria-label="Aviso de urgência de lançamento" 
        className="sticky top-0 z-40 bg-gradient-to-r from-[#ff2d87] via-[#ff5360] to-[#ff8a3d] text-[#1a0626] font-bold text-center px-4 py-2.5 text-xs sm:text-sm md:text-base shadow-md flex items-center justify-center gap-1.5 sm:gap-2 tracking-wide select-none"
      >
        <span className="shrink-0 text-sm sm:text-base animate-pulse">⏳</span>
        <span>
          Falta <span className="underline decoration-2 underline-offset-2 font-extrabold">{daysLeft} dias</span> para o lançamento do GTA
        </span>
      </aside>

      {/* 2. HERO / HEADER */}
      <header className="pt-6 sm:pt-8 md:pt-10 pb-8 sm:pb-12 px-4 sm:px-6 bg-gradient-to-b from-purple-50/40 via-white to-white">
        <div className="max-w-[680px] mx-auto text-center">
          
          {/* Logo Fábrica GTA 6 (Novo Emblema Oficial com Fundo Transparente) */}
          <div className="flex justify-center items-center py-2 sm:py-6 mb-6 sm:mb-10 w-full">
            <img 
              alt="Logo Fábrica GTA VI" 
              src="/assets/ievrcuf.webp" 
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://i.imgur.com/ievrcuf.png";
              }}
              width={633}
              height={394}
              fetchPriority="high"
              className="h-44 sm:h-60 md:h-72 lg:h-80 w-auto max-w-[92vw] sm:max-w-[440px] object-contain filter drop-shadow-[0_12px_35px_rgba(255,45,135,0.4)] transition-transform duration-300 hover:scale-105"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Kicker Text */}
          <div className="flex justify-center mb-3 px-2">
            <p className="text-[12px] sm:text-[14px] font-extrabold tracking-wide uppercase text-[#ff2d87] text-center leading-snug">
              O mundo esperou <span className="text-slate-950 font-black">mais de 10 anos</span> por esse jogo
            </p>
          </div>

          {/* Main Headline */}
          <h1 className="font-anton uppercase text-[28px] sm:text-4xl md:text-[50px] leading-[1.1] mb-3 text-slate-950 tracking-normal text-balance">
            Você sabia que dá para montar e monetizar um canal de{' '}
            <span className="gta-gradient-text drop-shadow-[0_2px_12px_rgba(255,45,135,0.35)]">
              GTA VI
            </span>{' '}
            em menos de 15 dias?
          </h1>

          <p className="font-anton uppercase text-slate-600 text-[15px] sm:text-xl md:text-[22px] mb-2 leading-snug">
            Sem aparecer, sem saber editar e sem precisar comprar o jogo
          </p>
        </div>

        {/* Arte Principal no Estilo GTA VI (Atualizada com a imagem enviada) */}
        <div className="max-w-[480px] sm:max-w-[560px] mx-auto my-6 sm:my-8 px-4">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-[0_20px_50px_rgba(142,45,226,0.16)] bg-slate-50 transition-all duration-300 hover:shadow-[0_25px_60px_rgba(255,45,135,0.22)]">
            <img 
              alt="Arte principal no estilo GTA VI" 
              src="/assets/BKdJ77e.webp" 
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://i.imgur.com/BKdJ77e.png";
              }}
              width={1086}
              height={1448}
              fetchPriority="high"
              className="w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-500"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        <div className="max-w-[680px] mx-auto text-center">
          {/* Subheadline (Posicionado abaixo da imagem) */}
          <div className="mb-6">
            <p className="font-anton uppercase text-[21px] sm:text-[28px] md:text-[34px] text-slate-900 leading-[1.15]">
              Nossa ferramenta entrega tudo{' '}
              <span className="text-[#ff2d87]">100% PRONTO</span> pra usar —{' '}
              <span className="block sm:inline mt-1 sm:mt-0">
                venha lucrar com a{' '}
                <span className="gta-gradient-text">MAIOR OPORTUNIDADE</span> da{' '}
                <span className="gta-gradient-text">DÉCADA</span>
              </span>
            </p>
          </div>

          {/* Hero Pitch */}
          <p className="text-[15px] sm:text-lg text-slate-700 max-w-[580px] mx-auto mb-6 leading-relaxed text-center">
            <span className="font-extrabold text-[#ff2d87] block mb-1">
              Faltam poucos dias!!
            </span>
            <strong className="text-slate-950 font-bold block mb-1">
              Faça parte da próxima geração de milionários da internet.
            </strong>
            <span className="text-slate-600 block">
              Ao invés de apenas assistir, faça parte desse time e comece a produzir!!
            </span>
          </p>

          {/* Main CTA */}
          <a 
            href="#oferta" 
            className="gta-btn-gradient block w-full text-center text-white uppercase font-anton text-lg sm:text-2xl tracking-wider py-4 sm:py-5 px-5 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] min-h-[52px] sm:min-h-[58px] flex items-center justify-center shadow-[0_10px_30px_rgba(255,45,135,0.45)]"
          >
            Quero montar meu canal agora
          </a>
        </div>
      </header>




      {/* 5. SECTION: JANELA DE TEMPO (CALLOUT CARD) */}
      <section className="py-8 sm:py-10 px-4 sm:px-6 bg-white">
        <div className="max-w-[680px] mx-auto">
          {/* Smartphone Frame para VSL (Apenas bordas elegantes, sem notch/câmera obstruindo) */}
          <div className="w-full flex justify-center py-2 sm:py-4">
            <div className="relative mx-auto w-full max-w-[310px] sm:max-w-[340px] aspect-[9/16] bg-black rounded-[36px] sm:rounded-[42px] border-[5px] sm:border-[6px] border-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.12)] overflow-hidden select-none">
              
              {/* HTML5 Video Element */}
              <video
                ref={videoRef}
                src="https://i.imgur.com/QJSEEZ5.mp4"
                poster="/assets/vsl-poster.webp"
                playsInline
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer block"
              />

              {/* Capa do primeiro frame + Ícone YouTube Centralizado quando pausado */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer bg-black/10"
                >
                  {/* Imagem do primeiro frame (capa) */}
                  <img 
                    src="/assets/vsl-poster.webp" 
                    alt="Capa do vídeo" 
                    width={464}
                    height={832}
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Sombra sutil para destaque do botão */}
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                  {/* Ícone YouTube Centralizado */}
                  <div className="relative z-10 group/yt cursor-pointer transform transition-transform duration-200 hover:scale-110 active:scale-95">
                    <svg 
                      viewBox="0 0 68 48" 
                      className="w-16 h-12 sm:w-20 sm:h-14 drop-shadow-[0_8px_25px_rgba(0,0,0,0.6)]"
                    >
                      <path 
                        d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" 
                        fill="#FF0000" 
                      />
                      <path d="M45,24 27,14 27,34" fill="#FFFFFF" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Barra de andamento verde conforme o vídeo anda */}
              <div 
                onClick={handleSeek}
                className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-30 cursor-pointer py-1.5"
              >
                <div className="w-full h-1 sm:h-1.5 bg-white/25 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#22c55e] h-full rounded-full transition-all duration-75 shadow-[0_0_10px_rgba(34,197,94,0.9)]"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* NOVA SEÇÃO: IDENTIFICAÇÃO EMOCIONAL (GTA VI) */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-[#000000] text-white border-t border-slate-900">
        <div className="max-w-[880px] mx-auto">
          
          {/* Headline Principal */}
          <div className="text-center max-w-[760px] mx-auto mb-8 sm:mb-12">
            <h2 className="font-anton uppercase text-2xl sm:text-4xl md:text-5xl leading-[1.12] mb-4 tracking-normal">
              <span className="block text-white">
                Você passa horas assistindo outras pessoas crescerem na internet...
              </span>
              <span className="block mt-2 text-[#FF2525] drop-shadow-[0_2px_18px_rgba(255,37,37,0.35)]">
                Mas quando vai chegar a sua vez?
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-lg max-w-[620px] mx-auto leading-relaxed">
              Você conhece as tendências, acompanha GTA VI e sabe o que viraliza. Mas ainda não começou a criar.
            </p>
          </div>

          {/* 5 Cards de Identificação */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 sm:gap-4 mb-10 sm:mb-12">
            
            {/* Card 1 — Celular */}
            <div className="md:col-span-2 bg-[#101014] border border-[#3d0f14] rounded-[12px] p-4 sm:p-5 flex items-start gap-3 sm:gap-4 transition-all duration-200 hover:border-[#FF2525]/80 hover:shadow-[0_4px_20px_rgba(255,37,37,0.15)] group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-tr from-[#ff2d87]/15 to-[#ff8a3d]/15 border border-[#ff2d87]/30 flex items-center justify-center shrink-0 text-[#ff2d87] group-hover:scale-105 transition-transform">
                <Smartphone className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-[15px] sm:text-[17px] font-bold text-white mb-1 leading-snug">
                  Você passa horas no feed, mas nunca posta nada.
                </h3>
                <p className="text-[12.5px] sm:text-[14px] text-slate-400 leading-snug">
                  Consome vídeos todos os dias, mas seu canal continua sendo apenas uma ideia.
                </p>
              </div>
            </div>

            {/* Card 2 — Lâmpada */}
            <div className="md:col-span-2 bg-[#101014] border border-[#3d0f14] rounded-[12px] p-4 sm:p-5 flex items-start gap-3 sm:gap-4 transition-all duration-200 hover:border-[#FF2525]/80 hover:shadow-[0_4px_20px_rgba(255,37,37,0.15)] group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-tr from-[#ff2d87]/15 to-[#ff8a3d]/15 border border-[#ff2d87]/30 flex items-center justify-center shrink-0 text-[#ff8a3d] group-hover:scale-105 transition-transform">
                <Lightbulb className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-[15px] sm:text-[17px] font-bold text-white mb-1 leading-snug">
                  Você já pensou: eu também poderia fazer isso.
                </h3>
                <p className="text-[12.5px] sm:text-[14px] text-slate-400 leading-snug">
                  Vê vídeos viralizando, salva ideias e promete começar amanhã.
                </p>
              </div>
            </div>

            {/* Card 3 — Relógio */}
            <div className="md:col-span-2 bg-[#101014] border border-[#3d0f14] rounded-[12px] p-4 sm:p-5 flex items-start gap-3 sm:gap-4 transition-all duration-200 hover:border-[#FF2525]/80 hover:shadow-[0_4px_20px_rgba(255,37,37,0.15)] group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-tr from-[#ff2d87]/15 to-[#ff8a3d]/15 border border-[#ff2d87]/30 flex items-center justify-center shrink-0 text-[#ff2d87] group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-[15px] sm:text-[17px] font-bold text-white mb-1 leading-snug">
                  Você sempre espera o momento perfeito.
                </h3>
                <p className="text-[12.5px] sm:text-[14px] text-slate-400 leading-snug">
                  Quer aprender tudo antes de começar e acaba não publicando nada.
                </p>
              </div>
            </div>

            {/* Card 4 — Gráfico Crescente */}
            <div className="md:col-span-2 md:col-start-2 bg-[#101014] border border-[#3d0f14] rounded-[12px] p-4 sm:p-5 flex items-start gap-3 sm:gap-4 transition-all duration-200 hover:border-[#FF2525]/80 hover:shadow-[0_4px_20px_rgba(255,37,37,0.15)] group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-tr from-[#ff2d87]/15 to-[#ff8a3d]/15 border border-[#ff2d87]/30 flex items-center justify-center shrink-0 text-[#ff8a3d] group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-[15px] sm:text-[17px] font-bold text-white mb-1 leading-snug">
                  Você vê canais pequenos crescendo. E o seu?
                </h3>
                <p className="text-[12.5px] sm:text-[14px] text-slate-400 leading-snug">
                  Enquanto outros publicam e evoluem, você continua apenas assistindo.
                </p>
              </div>
            </div>

            {/* Card 5 — Controle Gamer */}
            <div className="md:col-span-2 bg-[#101014] border border-[#3d0f14] rounded-[12px] p-4 sm:p-5 flex items-start gap-3 sm:gap-4 transition-all duration-200 hover:border-[#FF2525]/80 hover:shadow-[0_4px_20px_rgba(255,37,37,0.15)] group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-tr from-[#ff2d87]/15 to-[#ff8a3d]/15 border border-[#ff2d87]/30 flex items-center justify-center shrink-0 text-[#ff2d87] group-hover:scale-105 transition-transform">
                <Gamepad2 className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-[15px] sm:text-[17px] font-bold text-white mb-1 leading-snug">
                  Você ama GTA VI, mas ainda não cria conteúdo.
                </h3>
                <p className="text-[12.5px] sm:text-[14px] text-slate-400 leading-snug">
                  Conhece as novidades e tendências, mas não transforma isso em vídeos.
                </p>
              </div>
            </div>

          </div>

          {/* Fechamento Emocional */}
          <div className="bg-[#101014] border border-[#3d0f14] rounded-[16px] sm:rounded-[20px] p-6 sm:p-8 text-center max-w-[700px] mx-auto shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
            <h3 className="font-anton uppercase text-lg sm:text-2xl text-white mb-2 leading-tight">
              O problema não é falta de ideias.{' '}
              <span className="text-[#FF2525]">É continuar deixando tudo para depois.</span>
            </h3>

            <p className="text-slate-300 text-sm sm:text-base mb-6 max-w-[540px] mx-auto leading-relaxed">
              Com a Noobtoon, você tem vídeos, ideias, títulos e legendas organizados para começar a publicar.
            </p>

            <a 
              href="#oferta" 
              className="gta-btn-gradient block w-full text-center text-white uppercase font-anton text-base sm:text-xl tracking-wider py-4 sm:py-4.5 px-6 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_30px_rgba(255,45,135,0.45)]"
            >
              Quero parar de assistir e começar a criar
            </a>
          </div>

        </div>
      </section>

      {/* 7. SECTION: SEU CANAL MONTADO - VEJA O QUE RECEBE + BÔNUS */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 border-t border-slate-100 bg-slate-50/70">
        <div className="max-w-[680px] mx-auto">
          
          <h2 className="text-center font-anton uppercase text-2xl sm:text-4xl leading-tight mb-6 sm:mb-8 text-slate-950">
            Seu canal, praticamente montado.{' '}
            <span className="gta-gradient-text block sm:inline">Veja o que você recebe:</span>
          </h2>


          {/* Bônus Gratuitos */}
          <div className="bg-gradient-to-br from-orange-50/50 via-white to-pink-50/50 rounded-xl sm:rounded-2xl border border-orange-200 p-4 sm:p-7 shadow-sm mb-6 sm:mb-8 relative">
            <h3 className="font-anton uppercase text-[#ff8a3d] text-xl sm:text-2xl tracking-wide mb-3 sm:mb-4">
              BÔNUS
            </h3>

            <ul className="space-y-2.5 sm:space-y-3 mb-6">
              <li className="border-b border-slate-200/80 pb-2.5 flex items-center gap-3">
                <span className="bg-orange-100 text-orange-700 font-bold text-xs sm:text-sm w-6 h-6 rounded-full flex items-center justify-center shrink-0">1</span>
                <span className="text-slate-950 font-bold text-sm sm:text-base uppercase tracking-tight">
                  PACK DE THUMBNAILS EDITÁVEIS
                </span>
              </li>
              <li className="border-b border-slate-200/80 pb-2.5 flex items-center gap-3">
                <span className="bg-orange-100 text-orange-700 font-bold text-xs sm:text-sm w-6 h-6 rounded-full flex items-center justify-center shrink-0">2</span>
                <span className="text-slate-950 font-bold text-sm sm:text-base uppercase tracking-tight">
                  PACK DE ROTEIROS PRONTOS
                </span>
              </li>
              <li className="border-b border-slate-200/80 pb-2.5 flex items-center gap-3">
                <span className="bg-orange-100 text-orange-700 font-bold text-xs sm:text-sm w-6 h-6 rounded-full flex items-center justify-center shrink-0">3</span>
                <span className="text-slate-950 font-bold text-sm sm:text-base uppercase tracking-tight">
                  BANCO DE IDEIAS DE VÍDEOS
                </span>
              </li>
            </ul>

            <div className="bg-white/90 border border-slate-200/80 rounded-xl p-3.5 sm:p-5 mb-5 shadow-xs">
              <h4 className="font-anton uppercase text-slate-950 text-base sm:text-lg tracking-wide mb-3 flex items-center gap-2">
                <span className="text-[#ff2d87]">✓</span> CHECKLIST DO YOUTUBER
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 text-[13.5px] sm:text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Preparação do canal</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Produção de conteúdo</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Edição e publicação</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Otimização (SEO)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Crescimento do canal</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Monetização</span>
                </li>
              </ul>
            </div>

            {/* Mockup de empilhamento dos bônus */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 mb-0">
              <img 
                alt="Mockup de empilhamento dos bônus exclusivos" 
                src="/assets/a5UQqHW.webp" 
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://i.imgur.com/a5UQqHW.png";
                }}
                width={960}
                height={960}
                className="w-full h-auto object-cover rounded-2xl"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. SECTION: OBJEÇÕES - SERÁ QUE FUNCIONA MESMO PRA MIM? */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 border-t border-slate-100 bg-white">
        <div className="max-w-[680px] mx-auto">
          <h2 className="text-center font-anton uppercase text-2xl sm:text-4xl leading-tight mb-6 sm:mb-8 text-slate-950">
            “Será que funciona <span className="gta-gradient-text">mesmo pra mim?</span>”
          </h2>

          <div className="space-y-2.5 sm:space-y-3">
            <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 shadow-sm open:border-[#ff2d87]/60 open:shadow-[0_4px_20px_rgba(255,45,135,0.08)]">
              <summary className="cursor-pointer text-slate-900 font-bold text-[15px] sm:text-lg p-3.5 sm:p-5 flex justify-between items-center select-none list-none active:bg-slate-50 min-h-[48px]">
                <span>Não tá saturado?</span>
                <span className="text-[#ff2d87] transition-transform duration-200 group-open:rotate-180 shrink-0 ml-2">▼</span>
              </summary>
              <div className="text-slate-600 text-sm sm:text-base px-3.5 sm:px-5 pb-4 pt-1 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                O jogo nem saiu. Você está adiantado, não atrasado. É essa a vantagem.
              </div>
            </details>

            <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 shadow-sm open:border-[#ff2d87]/60 open:shadow-[0_4px_20px_rgba(255,45,135,0.08)]">
              <summary className="cursor-pointer text-slate-900 font-bold text-[15px] sm:text-lg p-3.5 sm:p-5 flex justify-between items-center select-none list-none active:bg-slate-50 min-h-[48px]">
                <span>Não sei editar.</span>
                <span className="text-[#ff2d87] transition-transform duration-200 group-open:rotate-180 shrink-0 ml-2">▼</span>
              </summary>
              <div className="text-slate-600 text-sm sm:text-base px-3.5 sm:px-5 pb-4 pt-1 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                Os templates já estão prontos. Troca o clipe e exporta.
              </div>
            </details>

            <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 shadow-sm open:border-[#ff2d87]/60 open:shadow-[0_4px_20px_rgba(255,45,135,0.08)]">
              <summary className="cursor-pointer text-slate-900 font-bold text-[15px] sm:text-lg p-3.5 sm:p-5 flex justify-between items-center select-none list-none active:bg-slate-50 min-h-[48px]">
                <span>Não quero aparecer.</span>
                <span className="text-[#ff2d87] transition-transform duration-200 group-open:rotate-180 shrink-0 ml-2">▼</span>
              </summary>
              <div className="text-slate-600 text-sm sm:text-base px-3.5 sm:px-5 pb-4 pt-1 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                Nada aqui exige seu rosto ou sua voz.
              </div>
            </details>

            <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 shadow-sm open:border-[#ff2d87]/60 open:shadow-[0_4px_20px_rgba(255,45,135,0.08)]">
              <summary className="cursor-pointer text-slate-900 font-bold text-[15px] sm:text-lg p-3.5 sm:p-5 flex justify-between items-center select-none list-none active:bg-slate-50 min-h-[48px]">
                <span>Não tenho o jogo nem PS5.</span>
                <span className="text-[#ff2d87] transition-transform duration-200 group-open:rotate-180 shrink-0 ml-2">▼</span>
              </summary>
              <div className="text-slate-600 text-sm sm:text-base px-3.5 sm:px-5 pb-4 pt-1 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                Não precisa. Você trabalha com o que já vem no kit.
              </div>
            </details>

            <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 shadow-sm open:border-[#ff2d87]/60 open:shadow-[0_4px_20px_rgba(255,45,135,0.08)]">
              <summary className="cursor-pointer text-slate-900 font-bold text-[15px] sm:text-lg p-3.5 sm:p-5 flex justify-between items-center select-none list-none active:bg-slate-50 min-h-[48px]">
                <span>Ouvi que IA não monetiza.</span>
                <span className="text-[#ff2d87] transition-transform duration-200 group-open:rotate-180 shrink-0 ml-2">▼</span>
              </summary>
              <div className="text-slate-600 text-sm sm:text-base px-3.5 sm:px-5 pb-4 pt-1 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                Repostar vídeo dos outros, de fato, não dá certo. Por isso o kit te dá ganchos e cortes que tornam o vídeo seu. Caminho certo, não ilusão.
              </div>
            </details>
          </div>
        </div>
      </section>


      {/* 10. SECTION: EM 3 PASSOS */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 border-t border-slate-100 bg-slate-50/70">
        <div className="max-w-[680px] mx-auto">
          <h2 className="text-center font-anton uppercase text-2xl sm:text-4xl leading-tight mb-6 sm:mb-8 text-slate-950">
            Em <span className="gta-gradient-text">3 passos</span>:
          </h2>

          <div className="grid gap-3 sm:gap-4 mb-5">
            <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4 shadow-sm hover:border-[#ff2d87]/40 transition-colors">
              <div className="gta-gradient-text font-anton text-2xl sm:text-4xl leading-none min-w-[28px] sm:min-w-[36px] pt-0.5">
                1
              </div>
              <div className="text-[13.5px] sm:text-base text-slate-700 leading-snug">
                <strong className="text-slate-950 font-bold text-base sm:text-lg block mb-0.5">Baixa a pasta.</strong>
                Tudo organizado, acesso imediato no seu e-mail.
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4 shadow-sm hover:border-[#ff2d87]/40 transition-colors">
              <div className="gta-gradient-text font-anton text-2xl sm:text-4xl leading-none min-w-[28px] sm:min-w-[36px] pt-0.5">
                2
              </div>
              <div className="text-[13.5px] sm:text-base text-slate-700 leading-snug">
                <strong className="text-slate-950 font-bold text-base sm:text-lg block mb-0.5">Monta o vídeo.</strong>
                Um clipe + um gancho + um título no template, em minutos.
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4 shadow-sm hover:border-[#ff2d87]/40 transition-colors">
              <div className="gta-gradient-text font-anton text-2xl sm:text-4xl leading-none min-w-[28px] sm:min-w-[36px] pt-0.5">
                3
              </div>
              <div className="text-[13.5px] sm:text-base text-slate-700 leading-snug">
                <strong className="text-slate-950 font-bold text-base sm:text-lg block mb-0.5">Publica e repete.</strong>
                Seguindo o calendário, todo dia, enquanto a onda cresce.
              </div>
            </div>
          </div>

          {/* Ícones dos 3 Passos */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm">
            <img 
              alt="Ícones dos 3 passos" 
              src="/assets/C5FRzGf.webp" 
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://iili.io/C5FRzGf.png";
              }}
              width={1100}
              height={733}
              className="w-full h-auto object-cover rounded-2xl"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* 11. SECTION: O QUE ESTÃO DIZENDO */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 border-t border-slate-100 bg-white">
        <div className="max-w-[760px] mx-auto">
          <h2 className="text-center font-anton uppercase text-2xl sm:text-4xl leading-tight mb-4 sm:mb-6 text-slate-950">
            O que estão dizendo
          </h2>

          {/* Carousel with Side Navigation Arrows */}
          <div className="relative group/carousel my-2">
            {/* Seta Esquerda Minimalista */}
            <button 
              type="button"
              onClick={prevSlide}
              aria-label="Ver imagem anterior"
              className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-[#ff2d87] border border-slate-200 shadow-sm flex items-center justify-center transition-all duration-150 active:scale-90 cursor-pointer backdrop-blur-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
            </button>

            {/* Seta Direita Minimalista */}
            <button 
              type="button"
              onClick={nextSlide}
              aria-label="Ver próxima imagem"
              className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-[#ff2d87] border border-slate-200 shadow-sm flex items-center justify-center transition-all duration-150 active:scale-90 cursor-pointer backdrop-blur-xs"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
            </button>

            {/* Carousel Viewport */}
            <div 
              ref={carouselRef}
              className="flex items-center overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3 sm:gap-4 py-2 select-none -mx-4 px-6 sm:mx-0 sm:px-2 scroll-smooth"
            >
              {testimonials.map((t, idx) => (
                <div 
                  key={t.id}
                  className={`h-[480px] sm:h-[540px] md:h-[580px] max-h-[72vh] ${t.aspectClass} flex-shrink-0 snap-center rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-md select-none flex items-center justify-center`}
                >
                  <img 
                    alt={`Depoimento e resultado ${t.id}`} 
                    src={t.image} 
                    width={t.width}
                    height={t.height}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = t.fallback;
                    }}
                    draggable={false}
                    className="w-full h-full object-contain object-center select-none block"
                    loading={idx < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. SECTION: OFERTA (PRICING CARD & CHECKOUT) */}
      <section id="oferta" className="py-10 sm:py-20 px-4 sm:px-6 border-t border-slate-100 bg-white scroll-mt-12">
        <div className="max-w-[880px] mx-auto text-center">
          
          <h2 className="font-anton uppercase text-3xl sm:text-4xl md:text-5xl leading-tight mb-3 text-slate-950">
            Quanto vale <span className="gta-gradient-text">tudo isso?</span>
          </h2>

          <p className="text-slate-950 font-bold text-[14.5px] sm:text-lg mb-8 max-w-[620px] mx-auto leading-relaxed">
            outras ferramentas iguais chegam a custar mais de 50 reais, aqui você recebe tudo por menos de 20 reais
          </p>

          {/* Cards de Oferta Reunidos (Side-by-side / Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch mb-8 text-left">
            
            {/* CARD 1: PACOTE BÁSICO (R$ 9,90) */}
            <div className="bg-white border-2 border-slate-200 hover:border-slate-300 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between shadow-sm transition-all duration-200 relative">
              <div>
                <h3 className="font-anton uppercase text-xl sm:text-2xl text-slate-900 mb-3">
                  Pacote Básico
                </h3>

                {/* Imagem do Pacote 9,90 - 100% Legível e em Destaque */}
                <div className="w-full mb-3 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md shadow-slate-200/50 p-1.5 sm:p-2 transition-transform duration-300 hover:scale-[1.01]">
                  <img
                    src="/assets/SyzQHMi.webp"
                    alt="Pacote 50 Vídeos GTA 6 - R$ 9,90"
                    width={800}
                    height={800}
                    className="w-full h-auto aspect-square object-contain rounded-xl"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "https://i.imgur.com/SyzQHMi.png";
                    }}
                  />
                </div>

                {/* Price */}
                <div className="my-2.5 pb-2.5 border-b border-slate-100">
                  <div className="flex items-baseline gap-1 font-anton text-3xl sm:text-4xl text-slate-950 mt-0.5">
                    <span className="text-lg sm:text-xl text-[#ff2d87]">R$</span>
                    <span>9,90</span>
                  </div>
                </div>

                {/* Features (Compacto e 100% Legível e em Negrito) */}
                <div className="space-y-1.5 sm:space-y-2 mb-4 text-[11px] sm:text-xs">
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-slate-950 font-bold leading-tight">
                      Você recebe 50 vídeos sobre GTA 6 para postar
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-slate-950 font-bold leading-tight">
                      Formato vertical pronto para TikTok, Shorts, Reels e Kwai
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-slate-950 font-bold leading-tight">
                      Alta qualidade (1080p) e sem marca d’água
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-slate-950 font-bold leading-tight">
                      Acesso imediato no seu e-mail
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setShowUpgradeModal(true)}
                  className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white uppercase font-anton text-base tracking-wider py-3.5 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Garantir por R$ 9,90</span>
                </button>
              </div>
            </div>

            {/* CARD 2: MAIOR OFERTA - COMPLETO (R$ 19,90) */}
            <div className="bg-gradient-to-br from-pink-50/60 via-white to-purple-50/60 border-2 border-[#ff2d87] rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between shadow-[0_12px_40px_rgba(255,45,135,0.18)] relative overflow-hidden">
              {/* Highlight Badge */}
              <div className="absolute top-0 right-0">
                <div className="gta-btn-gradient text-white text-[10px] sm:text-xs font-anton tracking-wider uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-bl-xl shadow-sm">
                  MAIOR OFERTA · MAIS VENDIDO
                </div>
              </div>

              <div>
                <div className="inline-block bg-pink-100 text-[#ff2d87] text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2">
                  TUDO INCLUSO
                </div>
                <h3 className="font-anton uppercase text-xl sm:text-2xl text-slate-950 mb-3">
                  Ferramenta Completa + Bônus
                </h3>

                {/* Imagem do Pacote Completo 19,90 - 100% Legível e em Destaque */}
                <div className="w-full mb-3 overflow-hidden rounded-2xl bg-white border-2 border-pink-200 shadow-lg shadow-pink-500/15 p-1.5 sm:p-2 transition-transform duration-300 hover:scale-[1.01]">
                  <img
                    src="/assets/8fk6C3X.webp"
                    alt="Ferramenta Completa + Bônus - R$ 19,90"
                    width={800}
                    height={800}
                    className="w-full h-auto aspect-square object-contain rounded-xl"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "https://i.imgur.com/8fk6C3X.png";
                    }}
                  />
                </div>

                {/* Price */}
                <div className="my-2.5 pb-2.5 border-b border-pink-100">
                  <div className="text-slate-500 font-bold text-[11px] sm:text-xs">De <s className="font-extrabold text-slate-700">R$ 89,90</s> por 19,90</div>
                  <div className="flex items-baseline gap-1 font-anton text-3xl sm:text-4xl gta-gradient-text mt-0.5">
                    <span className="text-lg sm:text-xl text-[#ff2d87]">R$</span>
                    <span>19,90</span>
                    <span className="text-[10.5px] sm:text-[11px] font-sans font-bold text-slate-600 ml-1">pagamento único</span>
                  </div>
                </div>

                {/* Features (Compacto, 100% Legível e em Negrito) */}
                <div className="space-y-2 mb-4">
                  {/* Ferramenta Completa */}
                  <div className="bg-white/95 border border-pink-200 rounded-xl p-2.5 shadow-2xs">
                    <div className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <div>
                        <span className="text-slate-950 text-[11.5px] sm:text-xs font-extrabold block leading-snug">
                          A Ferramenta Completa
                        </span>
                        <span className="text-slate-800 text-[10px] sm:text-[11px] font-bold leading-tight block mt-0.5">
                          Estrutura do Canal GTA VI pronta, templates CapCut, ganchos e calendário de 30 dias.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 50 Vídeos */}
                  <div className="flex items-start gap-2 px-1">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-slate-950 text-[11px] sm:text-xs font-extrabold leading-tight">
                      50 Vídeos sobre GTA 6 para postar imediatamente
                    </span>
                  </div>

                  {/* Bônus da seção de bônus acima */}
                  <div className="bg-gradient-to-r from-orange-50/80 to-pink-50/80 border border-orange-200 rounded-xl p-2.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Gift className="w-3.5 h-3.5 text-[#ff8a3d]" />
                      <span className="font-anton uppercase text-[10.5px] sm:text-[11.5px] text-[#ff8a3d] tracking-wide">
                        BÔNUS EXCLUSIVOS INCLUSOS:
                      </span>
                    </div>
                    <ul className="space-y-1 text-[10px] sm:text-[10.5px] text-slate-950 font-bold uppercase">
                      <li className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full bg-orange-200 text-orange-900 text-[9px] font-extrabold flex items-center justify-center shrink-0">1</span>
                        <span>Pack de Thumbnails Editáveis</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full bg-orange-200 text-orange-900 text-[9px] font-extrabold flex items-center justify-center shrink-0">2</span>
                        <span>Pack de Roteiros Prontos</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full bg-orange-200 text-orange-900 text-[9px] font-extrabold flex items-center justify-center shrink-0">3</span>
                        <span>Banco de Ideias de Vídeos</span>
                      </li>
                    </ul>

                    {/* Checklist */}
                    <div className="mt-2 pt-1.5 border-t border-orange-200/70">
                      <span className="font-anton uppercase text-[9.5px] sm:text-[10.5px] text-slate-950 block mb-1 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                        CHECKLIST DO YOUTUBER:
                      </span>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[9.5px] sm:text-[10px] text-slate-900 font-bold">
                        <span>✓ Preparação do canal</span>
                        <span>✓ Produção de conteúdo</span>
                        <span>✓ Edição e publicação</span>
                        <span>✓ Otimização (SEO)</span>
                        <span>✓ Crescimento do canal</span>
                        <span>✓ Monetização</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href={CHECKOUT_URL_1990}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCheckoutClick(19.90, 'Pacote Completo 19,90')}
                  className="gta-btn-gradient block w-full text-center text-white uppercase font-anton text-base sm:text-lg tracking-wider py-3.5 px-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_30px_rgba(255,45,135,0.4)] flex items-center justify-center gap-2"
                >
                  <span>Garantir Tudo por R$ 19,90</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 13. SECTION: GARANTIA */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-slate-50/70 border-t border-slate-100">
        <div className="max-w-[680px] mx-auto text-center">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm flex flex-col items-center justify-center">
            <img 
              src="/assets/IMMNkQC.webp" 
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://i.imgur.com/IMMNkQC.png";
              }}
              width={640}
              height={640}
              alt="14 Dias de Garantia Incondicional" 
              className="w-full max-w-[220px] sm:max-w-[280px] h-auto object-contain mx-auto filter drop-shadow-[0_10px_25px_rgba(255,45,135,0.25)] transition-transform duration-300 hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <p className="mt-5 text-slate-900 font-extrabold text-base sm:text-lg tracking-tight">
              Compra 100% segura
            </p>
            <p className="mt-1 text-[11px] sm:text-xs text-slate-500 font-medium">
              Caso não fique satisfeito, receba seu dinheiro de volta.
            </p>
          </div>
        </div>
      </section>

      {/* 14. SECTION: PERGUNTAS FREQUENTES (FAQ) */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 border-t border-slate-100 bg-white">
        <div className="max-w-[680px] mx-auto">
          <h2 className="text-center font-anton uppercase text-2xl sm:text-4xl leading-tight mb-6 sm:mb-8 text-slate-950">
            Perguntas <span className="gta-gradient-text">frequentes</span>
          </h2>

          <div className="space-y-2.5 sm:space-y-3">
            <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 shadow-sm open:border-[#ff2d87]/60 open:shadow-[0_4px_20px_rgba(255,45,135,0.08)]">
              <summary className="cursor-pointer text-slate-900 font-bold text-[15px] sm:text-lg p-3.5 sm:p-5 flex justify-between items-center select-none list-none active:bg-slate-50 min-h-[48px]">
                <span>Como recebo?</span>
                <span className="text-[#ff2d87] transition-transform duration-200 group-open:rotate-180 shrink-0 ml-2">▼</span>
              </summary>
              <div className="text-slate-600 text-sm sm:text-base px-3.5 sm:px-5 pb-4 pt-1 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                Acesso imediato após a compra, no seu e-mail.
              </div>
            </details>

            <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 shadow-sm open:border-[#ff2d87]/60 open:shadow-[0_4px_20px_rgba(255,45,135,0.08)]">
              <summary className="cursor-pointer text-slate-900 font-bold text-[15px] sm:text-lg p-3.5 sm:p-5 flex justify-between items-center select-none list-none active:bg-slate-50 min-h-[48px]">
                <span>Funciona no TikTok, Reels, Kwai e Shorts?</span>
                <span className="text-[#ff2d87] transition-transform duration-200 group-open:rotate-180 shrink-0 ml-2">▼</span>
              </summary>
              <div className="text-slate-600 text-sm sm:text-base px-3.5 sm:px-5 pb-4 pt-1 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                Sim, os quatro.
              </div>
            </details>

            <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 shadow-sm open:border-[#ff2d87]/60 open:shadow-[0_4px_20px_rgba(255,45,135,0.08)]">
              <summary className="cursor-pointer text-slate-900 font-bold text-[15px] sm:text-lg p-3.5 sm:p-5 flex justify-between items-center select-none list-none active:bg-slate-50 min-h-[48px]">
                <span>Preciso aparecer ou usar minha voz?</span>
                <span className="text-[#ff2d87] transition-transform duration-200 group-open:rotate-180 shrink-0 ml-2">▼</span>
              </summary>
              <div className="text-slate-600 text-sm sm:text-base px-3.5 sm:px-5 pb-4 pt-1 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                Não.
              </div>
            </details>

            <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 shadow-sm open:border-[#ff2d87]/60 open:shadow-[0_4px_20px_rgba(255,45,135,0.08)]">
              <summary className="cursor-pointer text-slate-900 font-bold text-[15px] sm:text-lg p-3.5 sm:p-5 flex justify-between items-center select-none list-none active:bg-slate-50 min-h-[48px]">
                <span>Preciso ter o jogo ou um PC potente?</span>
                <span className="text-[#ff2d87] transition-transform duration-200 group-open:rotate-180 shrink-0 ml-2">▼</span>
              </summary>
              <div className="text-slate-600 text-sm sm:text-base px-3.5 sm:px-5 pb-4 pt-1 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                Não.
              </div>
            </details>

            <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 shadow-sm open:border-[#ff2d87]/60 open:shadow-[0_4px_20px_rgba(255,45,135,0.08)]">
              <summary className="cursor-pointer text-slate-900 font-bold text-[15px] sm:text-lg p-3.5 sm:p-5 flex justify-between items-center select-none list-none active:bg-slate-50 min-h-[48px]">
                <span>Sou iniciante total. Consigo?</span>
                <span className="text-[#ff2d87] transition-transform duration-200 group-open:rotate-180 shrink-0 ml-2">▼</span>
              </summary>
              <div className="text-slate-600 text-sm sm:text-base px-3.5 sm:px-5 pb-4 pt-1 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                Sim — foi feito exatamente pra quem começa do zero.
              </div>
            </details>

            <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 shadow-sm open:border-[#ff2d87]/60 open:shadow-[0_4px_20px_rgba(255,45,135,0.08)]">
              <summary className="cursor-pointer text-slate-900 font-bold text-[15px] sm:text-lg p-3.5 sm:p-5 flex justify-between items-center select-none list-none active:bg-slate-50 min-h-[48px]">
                <span>Quanto vou ganhar?</span>
                <span className="text-[#ff2d87] transition-transform duration-200 group-open:rotate-180 shrink-0 ml-2">▼</span>
              </summary>
              <div className="text-slate-600 text-sm sm:text-base px-3.5 sm:px-5 pb-4 pt-1 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                Depende da sua consistência. O que eu garanto é te entregar o ativo pronto e o caminho certo pra começar cedo — o resto é execução sua.
              </div>
            </details>
          </div>
        </div>
      </section>


      {/* 16. FOOTER */}
      <footer className="text-center text-slate-500 pt-8 pb-16 px-4 text-xs sm:text-[13px] border-t border-slate-200 bg-slate-50">
        <div className="max-w-[680px] mx-auto leading-relaxed">
          <p>
            FÁBRICA GTA VI — produto independente. Não é afiliado nem endossado pela Rockstar Games ou Take-Two Interactive. “Grand Theft Auto” e “GTA” são marcas de seus respectivos donos.
          </p>
          <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-slate-400">
            <p>
              © {new Date().getFullYear()} Noob Toon. Todos os direitos reservados.
            </p>
            <span className="hidden sm:inline text-slate-300">•</span>
            <a
              href="https://www.instagram.com/noob.toon_/?__pwa=1#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-[#ff2d87] transition-colors font-medium text-xs sm:text-[13px] group"
            >
              <Instagram className="w-4 h-4 text-[#ff2d87] group-hover:scale-110 transition-transform" />
              <span>Conheça nosso perfil</span>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#ff2d87] bg-pink-100/90 hover:bg-pink-200/90 text-[#ff2d87] px-2 py-0.5 rounded-full border border-pink-200 transition-colors">
                Clique aqui
              </span>
            </a>
          </div>
        </div>
      </footer>

      {/* 17. POP-UP MODAL: OFERTA ESPECIAL DE R$ 14,90 (DISPARADO PELO CARD DE R$ 9,90) */}
      {showUpgradeModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3.5 sm:p-4 touch-manipulation overflow-y-auto"
          onClick={() => setShowUpgradeModal(false)}
        >
          <div 
            className="relative max-w-lg w-full bg-white rounded-2xl sm:rounded-3xl border-2 border-[#ff2d87] shadow-2xl p-5 sm:p-7 text-left my-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
              <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span>Oferta Relâmpago Exclusiva</span>
            </div>

            <h3 className="font-anton uppercase text-2xl sm:text-3xl text-slate-950 leading-tight mb-2 pr-6">
              Leve a <span className="gta-gradient-text">Ferramenta Completa</span> + <span className="gta-gradient-text">Todos os Bônus</span> por apenas <span className="text-[#ff2d87]">R$ 14,90</span>!
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm mb-3 leading-relaxed">
              Não leve só os vídeos básicos. Por apenas <strong className="text-slate-900 font-bold">R$ 5,00 a mais</strong>, você desbloqueia a ferramenta completa com todos os bônus e templates:
            </p>

            {/* Imagem do Pacote Completo no Pop-up - 100% Legível e em Destaque */}
            <div className="w-full mb-3 overflow-hidden rounded-2xl bg-white border border-pink-200 shadow-md shadow-pink-500/10 p-1.5 sm:p-2 flex items-center justify-center">
              <img
                src="/assets/F39eh4c.webp"
                alt="Upgrade Ferramenta Completa + Bônus - R$ 14,90"
                width={800}
                height={800}
                className="w-full h-auto max-h-64 sm:max-h-72 aspect-square object-contain rounded-xl mx-auto"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://i.imgur.com/F39eh4c.png";
                }}
              />
            </div>

            {/* Price Box */}
            <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-orange-50 border border-pink-200 rounded-xl p-2.5 sm:p-3 mb-3 flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[10.5px] sm:text-xs line-through block font-medium">De R$ 19,90 por:</span>
                <div className="font-anton text-2xl sm:text-3xl gta-gradient-text leading-none flex items-baseline">
                  <span className="text-base text-[#ff2d87] mr-0.5">R$</span>
                  <span>14,90</span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block bg-[#ff2d87] text-white text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                  Economia de R$ 5,00
                </span>
              </div>
            </div>

            {/* Features Included (Compacto e 100% Legível) */}
            <div className="space-y-1.5 mb-3.5 text-[11px] sm:text-xs text-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="font-bold text-slate-950">A Ferramenta Completa do Canal GTA VI</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-slate-800">50 Vídeos sobre GTA 6 para postar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="text-slate-700">1. PACK DE THUMBNAILS EDITÁVEIS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="text-slate-700">2. PACK DE ROTEIROS PRONTOS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="text-slate-700">3. BANCO DE IDEIAS DE VÍDEOS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="text-slate-700">CHECKLIST DO YOUTUBER (SEO, Edição, Monetização)</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2">
              <a
                href={CHECKOUT_URL_1490}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  handleCheckoutClick(14.90, 'Upgrade Especial 14,90');
                  setShowUpgradeModal(false);
                }}
                className="gta-btn-gradient block w-full text-center text-white uppercase font-anton text-base sm:text-xl tracking-wider py-4 px-4 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] shadow-[0_10px_25px_rgba(255,45,135,0.4)] flex items-center justify-center gap-2"
              >
                <span>SIM! QUERO TUDO POR R$ 14,90</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href={CHECKOUT_URL_990}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  handleCheckoutClick(9.90, 'Pacote Básico 9,90');
                  setShowUpgradeModal(false);
                }}
                className="block w-full text-center text-slate-500 hover:text-slate-800 text-xs sm:text-sm py-2 transition-colors underline decoration-slate-300"
              >
                Voltar e pagar apenas R$ 9,90 pelos 50 vídeos
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
