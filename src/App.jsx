import React, { useState } from 'react';
import { Phone, Mail, MapPin, Play, Check, ChevronRight, Stethoscope, Menu, X, ArrowRight, Star, Clock, Loader2 } from 'lucide-react';

const treatmentsData = [
  { 
    title: "Umumiy Stomatologiya", 
    desc: "Tishlaringizning optimal sog'lig'ini saqlash uchun profilaktik parvarish, professional tozalash va to'liq tekshiruvlar.",
    img: "/images/service.jpg" 
  },
  { 
    title: "Tish Implantlari", 
    desc: "Ilg'or titan integratsiyasi texnologiyasidan foydalangan holda, tabiiy ko'rinishdagi doimiy tish o'rinbosarlari.",
    img: "/images/hero.jpg" 
  },
  { 
    title: "Estetik Oqartirish", 
    desc: "Birgina seansda tishlaringizni 8 tagacha oqartirib beruvchi professional lazerli oqartirish xizmati.",
    img: "/images/service.jpg" 
  },
  { 
    title: "Invisalign (Elaynerlar)", 
    desc: "An'anaviy temir breketlarsiz, ko'rinmas va qulay elaynerlar yordamida tishlarni tekislash.",
    img: "/images/service.jpg" 
  },
  { 
    title: "Chinni Vinirlar", 
    desc: "Tishlarning old qismini qoplaydigan va tabassumingizni mukammal qiluvchi o'ta yupqa keramik qoplamalar.",
    img: "/images/service.jpg" 
  },
  { 
    title: "Kanalni Davolash (Endodontiya)", 
    desc: "Infeksiyani yo'q qilish va tabiiy tishingizni saqlab qolish uchun og'riqsiz, aniq endodontik davolash.",
    img: "/images/service.jpg" 
  }
];

function Home({ navigate }) {
  const [formData, setFormData] = useState({ name: '', phone: '', date: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      
      const formBody = new FormData();
      formBody.append('Name', formData.name);
      formBody.append('Phone', formData.phone);
      formBody.append('Date', formData.date);

      await fetch(scriptUrl, {
        method: 'POST',
        body: formBody,
        mode: 'no-cors'
      });

      setSubmitStatus('success');
      setFormData({ name: '', phone: '', date: '' });
      setTimeout(() => setSubmitStatus(null), 4000);
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-[fade-in_0.5s_ease-out]">
      {/* Hero Section */}
      <section className="px-6 lg:px-12 pt-16 pb-24 md:pt-24 md:pb-32 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-8 overflow-hidden">
        <div className="lg:w-1/2 space-y-8 z-10 w-full animate-reveal" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-semibold leading-[1.05] tracking-tight text-zinc-900 break-words">
            Stomatologiya, <br className="hidden md:block"/>
            <span className="text-emerald-600">yangi bosqichda.</span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl max-w-lg leading-relaxed font-normal line-clamp-4">
            Eng zamonaviy uskunalar bilan jihozlangan klinikada jahon darajasidagi xizmatdan bahramand bo'ling. Mutaxassislarimiz tabassumingiz sog'lom va yorqin bo'lishini ta'minlaydi.
          </p>
          <div className="flex flex-wrap gap-4 items-center pt-2">
            <button onClick={() => navigate('treatments')} className="cursor-pointer bg-emerald-600 text-white px-8 py-3.5 rounded-full font-medium hover:bg-emerald-700 transition-all flex items-center gap-2 hover:scale-105 active:scale-95">
              Xizmatlarni Ko'rish <ArrowRight size={18} />
            </button>
            <button onClick={() => navigate('clinic')} className="cursor-pointer flex items-center gap-3 text-zinc-900 font-medium hover:opacity-70 transition-opacity px-4 py-2 group">
              <div className="bg-zinc-100 p-2.5 rounded-full group-hover:scale-110 transition-transform">
                <Play size={16} fill="currentColor" />
              </div>
              Klinika Bo'ylab Tur
            </button>
          </div>
        </div>
        
        <div className="lg:w-1/2 w-full animate-reveal" style={{ animationDelay: '0.2s' }}>
          <div className="relative group perspective-1000">
            <img 
              src="/images/hero.jpg" 
              alt="Zamonaviy Stomatologiya Klinikasi" 
              className="w-full h-[400px] md:h-[600px] object-cover rounded-[2rem] md:rounded-[3rem] bg-zinc-100 animate-float shadow-xl transition-transform duration-700 hover:[transform:rotateX(2deg)_rotateY(-2deg)_scale(1.02)]" 
              onError={(e) => { e.target.src = 'https://placehold.co/1200x800/047857/FFF/png?text=Klinika+Rasmi'; }}
            />
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="px-6 lg:px-12 -mt-16 md:-mt-32 relative z-20 max-w-[1200px] mx-auto animate-reveal" style={{ animationDelay: '0.3s' }}>
        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 md:p-10 transition-all hover:shadow-[0_15px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 duration-500">
          {submitStatus === 'success' && (
             <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl flex items-center gap-2 font-medium">
               <Check size={18} /> So'rovingiz muvaffaqiyatli yuborildi! Tez orada aloqaga chiqamiz.
             </div>
          )}
          {submitStatus === 'error' && (
             <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl font-medium">
               Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.
             </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-end">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider truncate block">Bemor Ismi</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Sardor Rahimov" 
                className="cursor-pointer w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm font-medium" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider truncate block">Telefon Raqam</label>
              <input 
                type="tel" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+998 90 123 45 67" 
                className="cursor-pointer w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm font-medium" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider truncate block">Qabul Sanasi</label>
              <div className="relative">
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="cursor-pointer w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm font-medium text-zinc-700 appearance-none" 
                />
              </div>
            </div>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer w-full bg-zinc-900 text-white px-6 py-3.5 rounded-xl font-medium hover:bg-zinc-800 disabled:opacity-70 transition-all text-sm h-[46px] truncate flex items-center justify-center gap-2 active:scale-95"
            >
              {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Yuborilmoqda...</> : "So'rovni Yuborish"}
            </button>
          </div>
        </form>
      </section>

      {/* Featured Treatments */}
      <section className="px-6 lg:px-12 py-24 md:py-32 max-w-[1400px] mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 animate-reveal">
          <div className="min-w-0">
            <h2 className="text-3xl md:text-5xl font-semibold text-zinc-900 tracking-tight leading-tight break-words">
              Keng qamrovli<br/> xizmatlar.
            </h2>
          </div>
          <button onClick={() => navigate('treatments')} className="cursor-pointer text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1 group pb-2 shrink-0">
            Barcha xizmatlarni ko'rish <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {treatmentsData.slice(0, 3).map((service, i) => (
            <div key={i} onClick={() => navigate('treatments')} className="group cursor-pointer flex flex-col min-w-0 animate-reveal" style={{ animationDelay: `${i * 0.1 + 0.2}s` }}>
              <div className="overflow-hidden rounded-[2rem] mb-6 bg-zinc-100 shrink-0 relative transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
                <img src={service.img} alt={service.title} 
                     className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                     onError={(e) => { e.target.src = 'https://placehold.co/600x400/047857/FFF/png?text=Xizmat'; }}/>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-2 tracking-tight truncate transition-colors group-hover:text-emerald-600">{service.title}</h3>
              <p className="text-zinc-500 font-normal leading-relaxed text-sm mb-4 line-clamp-3">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Treatments() {
  return (
    <div className="px-6 lg:px-12 py-16 md:py-24 max-w-[1400px] mx-auto animate-reveal">
      <h1 className="text-4xl md:text-6xl font-semibold text-zinc-900 tracking-tight mb-6">Xizmatlarimiz</h1>
      <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mb-16">Tabassumingizni sog'lom va chiroyli saqlash uchun mo'ljallangan professional stomatologik xizmatlarimiz bilan tanishing.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {treatmentsData.map((service, i) => (
          <div key={i} className="group cursor-pointer flex flex-col min-w-0 animate-reveal" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="overflow-hidden rounded-[2rem] mb-6 bg-zinc-100 shrink-0 shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
              <img src={service.img} alt={service.title} 
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400/047857/FFF/png?text=Xizmat'; }}/>
            </div>
            <h3 className="text-2xl font-semibold text-zinc-900 mb-3 tracking-tight truncate group-hover:text-emerald-600 transition-colors">{service.title}</h3>
            <p className="text-zinc-500 font-normal leading-relaxed mb-6 line-clamp-3">
              {service.desc}
            </p>
            <button className="text-emerald-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all mt-auto w-fit">
              Batafsil ma'lumot <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Specialists() {
  const team = [
    { name: "Dr. Farrux Yusupov", role: "Bosh Kosmetolog-Stomatolog", edu: "DDS, ToshMI", img: "/images/doctor.jpg" },
    { name: "Dr. Malika Azizova", role: "Ortodont", edu: "Tibbiyot fanlari nomzodi", img: "/images/doctor.jpg" },
    { name: "Dr. Sardor Olimov", role: "Yuz-jag' xirurgi", edu: "MD, xalqaro toifa", img: "/images/doctor.jpg" },
  ];
  return (
    <div className="px-6 lg:px-12 py-16 md:py-24 max-w-[1400px] mx-auto animate-reveal">
      <h1 className="text-4xl md:text-6xl font-semibold text-zinc-900 tracking-tight mb-6">Mutaxassislarimiz</h1>
      <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mb-16">Tabassumingizni mukammallashtirishga o'zini bag'ishlagan, ko'p yillik tajribaga ega shifokorlar jamoasi bilan tanishing.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {team.map((doc, i) => (
          <div key={i} className="cursor-pointer group border border-zinc-100 rounded-[2rem] p-4 bg-zinc-50 hover:bg-white hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 hover:-translate-y-2 animate-reveal" style={{ animationDelay: `${i * 0.15}s` }}>
            <img src={doc.img} alt={doc.name} className="w-full h-80 object-cover rounded-[1.5rem] mb-6 grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" onError={(e) => { e.target.src = 'https://placehold.co/600x600/047857/FFF/png?text=Shifokor'; }}/>
            <div className="px-2 pb-4">
              <h3 className="text-2xl font-semibold text-zinc-900 mb-1">{doc.name}</h3>
              <p className="text-emerald-600 font-medium mb-1">{doc.role}</p>
              <p className="text-zinc-400 text-sm">{doc.edu}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatientStories() {
  const stories = [
    { name: "Jamshid Q.", text: "Hayotimdagi eng qulay stomatologik tajriba. Dr. Farrux vinirlar yasashda haqiqiy san'atkor ekan.", rating: 5 },
    { name: "Aziza T.", text: "Implant qo'yishdan juda qo'rqqandim, lekin hammasi mutlaqo og'riqsiz o'tdi. Tavsiya qilaman!", rating: 5 },
    { name: "Rustam B.", text: "Zamonaviy jihozlar va ajoyib xodimlar. Eshikdan kirganingizdanoq sizga juda yuqori darajada xizmat ko'rsatishadi.", rating: 5 },
    { name: "Laylo S.", text: "Elayner (Invisalign) orqali tishlarimni tekislash ajoyib o'tdi. Jamoa doim barcha savollarimga javob berdi.", rating: 5 },
  ];
  return (
    <div className="px-6 lg:px-12 py-16 md:py-24 max-w-[1400px] mx-auto animate-reveal bg-zinc-50/50 rounded-3xl my-8">
      <h1 className="text-4xl md:text-6xl font-semibold text-zinc-900 tracking-tight mb-6">Mijozlar Fikri</h1>
      <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mb-16">Tabassumini bizga ishongan qadrli mijozlarimizning haqiqiy taassurotlari.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story, i) => (
          <div key={i} className="bg-white border border-zinc-100 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-reveal" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex gap-1 mb-4 text-emerald-500">
              {[...Array(story.rating)].map((_, j) => <Star key={j} size={18} fill="currentColor" />)}
            </div>
            <p className="text-zinc-700 text-lg font-medium leading-relaxed mb-6 italic">"{story.text}"</p>
            <p className="text-zinc-900 font-semibold">— {story.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Journal() {
  const posts = [
    { title: "Lazerli stomatologiya kelajagi", date: "12-Okt, 2026", category: "Texnologiya", img: "/images/service.jpg" },
    { title: "Tish oqartirish haqida 5 ta afsona", date: "28-Sen, 2026", category: "Estetika", img: "/images/hero.jpg" },
    { title: "Ovqatlanishning og'iz bo'shlig'iga ta'siri", date: "15-Sen, 2026", category: "Salomatlik", img: "/images/service.jpg" },
  ];
  return (
    <div className="px-6 lg:px-12 py-16 md:py-24 max-w-[1400px] mx-auto animate-reveal">
      <h1 className="text-4xl md:text-6xl font-semibold text-zinc-900 tracking-tight mb-6">Jurnal</h1>
      <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mb-16">Mutaxassislarimiz tomonidan tayyorlangan so'nggi maqolalar, maslahatlar va yangiliklar.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <div key={i} className="group cursor-pointer hover:-translate-y-2 transition-transform duration-500 animate-reveal" style={{ animationDelay: `${i * 0.15}s` }}>
            <div className="overflow-hidden rounded-3xl mb-6 shadow-sm group-hover:shadow-xl transition-shadow">
               <img src={post.img} alt={post.title} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.target.src = 'https://placehold.co/600x400/047857/FFF/png?text=Maqola'; }}/>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-3">
              <span>{post.category}</span>
              <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
              <span className="text-zinc-400">{post.date}</span>
            </div>
            <h3 className="text-2xl font-semibold text-zinc-900 group-hover:text-emerald-600 transition-colors">{post.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClinicInfo() {
  return (
    <div className="animate-reveal">
      <section className="px-6 lg:px-12 py-16 md:py-24 max-w-[1400px] mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center overflow-hidden">
        <div className="md:w-1/2 space-y-8 min-w-0">
          <h2 className="text-3xl md:text-5xl font-semibold text-zinc-900 tracking-tight leading-tight break-words">
            Mukammal parvarish.<br/> Mutlaq qulaylik.
          </h2>
          <p className="text-zinc-500 text-lg leading-relaxed font-normal">
            15 yildan ortiq vaqt mobaynida Lumina Stomatologiyasi O'zbekistonda kosmetik va restorativ stomatologiya bo'yicha yuqori standartlarni o'rnatib kelmoqda. Biz eng so'nggi texnologiyalarni aniqlik va qulaylik bilan uyg'unlashtiramiz.
          </p>
          <ul className="space-y-4 pt-4">
            {['Shveysariya stomatologik uskunalari', "Og'riqsiz lazer terapiyalari", 'Xalqaro toifadagi mutaxassislar'].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-zinc-700 font-medium">
                <div className="bg-zinc-100 p-1.5 rounded-full shrink-0">
                  <Check size={14} className="text-zinc-900" />
                </div>
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/2 grid grid-cols-2 gap-4 w-full">
          <img src="/images/hero.jpg" 
               className="w-full h-48 md:h-72 object-cover rounded-3xl mt-8 bg-zinc-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-500" alt="Klinika Interyeri" onError={(e) => { e.target.src = 'https://placehold.co/600x400/047857/FFF/png?text=Interyer'; }}/>
          <img src="/images/service.jpg" 
               className="w-full h-48 md:h-72 object-cover rounded-3xl bg-zinc-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-500" alt="Stomatologik Texnologiya" onError={(e) => { e.target.src = 'https://placehold.co/600x400/047857/FFF/png?text=Texnologiya'; }}/>
        </div>
      </section>
      
      <section className="px-6 lg:px-12 py-16 bg-zinc-900 text-white max-w-[1400px] mx-auto rounded-[3rem] my-12 shadow-2xl transition-all duration-700 hover:shadow-emerald-900/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="group cursor-pointer">
            <Clock className="w-10 h-10 text-emerald-400 mb-6 mx-auto md:mx-0 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-semibold mb-2">Ish Vaqti</h3>
            <p className="text-zinc-400">Dushanba - Juma: 08:00 - 18:00</p>
            <p className="text-zinc-400">Shanba: 09:00 - 14:00</p>
          </div>
          <div className="group cursor-pointer">
            <MapPin className="w-10 h-10 text-emerald-400 mb-6 mx-auto md:mx-0 group-hover:-translate-y-2 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-semibold mb-2">Manzil</h3>
            <p className="text-zinc-400">Amir Temur ko'chasi, 120-uy</p>
            <p className="text-zinc-400">Toshkent sh., O'zbekiston</p>
          </div>
          <div className="group cursor-pointer">
            <Phone className="w-10 h-10 text-emerald-400 mb-6 mx-auto md:mx-0 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-semibold mb-2">Aloqa</h3>
            <p className="text-zinc-400">+998 90 123 45 67</p>
            <p className="text-zinc-400">info@luminadental.uz</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'treatments', label: 'Xizmatlar' },
    { id: 'specialists', label: 'Mutaxassislarimiz' },
    { id: 'stories', label: 'Mijozlar Fikri' },
    { id: 'journal', label: 'Jurnal' },
    { id: 'clinic', label: 'Klinika Haqida' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-emerald-100 break-words flex flex-col">
      
      {/* Utility Bar */}
      <div className="hidden md:flex justify-between items-center px-6 lg:px-12 py-2 bg-zinc-50 text-xs font-medium text-zinc-500 border-b border-zinc-100 z-50 relative">
        <div className="flex gap-6">
          <span className="flex items-center gap-1.5 hover:text-zinc-900 transition-colors cursor-pointer"><Phone size={12} /> +998 90 123 45 67</span>
          <span className="flex items-center gap-1.5 hover:text-zinc-900 transition-colors cursor-pointer"><Mail size={12} /> info@luminadental.uz</span>
        </div>
        <span className="flex items-center gap-1.5 hover:text-zinc-900 transition-colors cursor-pointer">
          <MapPin size={12} /> Amir Temur ko'chasi, 120-uy, Toshkent
        </span>
      </div>

      {/* Navbar - Apple Style */}
      <nav className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-zinc-200/50 transition-all duration-300">
        <div className="px-6 lg:px-12 py-4 flex justify-between items-center">
          <div onClick={() => navigate('home')} className="flex items-center gap-2 text-zinc-900 font-semibold text-xl tracking-tight cursor-pointer hover:opacity-80 transition-opacity">
            <Stethoscope size={22} className="text-emerald-600" />
            Lumina Stomatologiyasi
          </div>
          
          <div className="hidden lg:flex gap-8 text-zinc-500 font-medium text-sm items-center">
            {navLinks.map((link) => (
              <a 
                key={link.id}
                onClick={() => navigate(link.id)} 
                className={`cursor-pointer transition-colors hover:text-zinc-900 ${currentPage === link.id ? 'text-emerald-600 font-bold' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex">
            <button onClick={() => navigate('home')} className="cursor-pointer bg-zinc-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors active:scale-95">
              Qabulga Yozilish
            </button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer lg:hidden text-zinc-900 p-1 hover:text-emerald-600 transition-colors">
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-zinc-100 flex flex-col py-6 px-6 space-y-5 font-medium text-zinc-600 h-screen animate-reveal">
            <a onClick={() => navigate('home')} className="text-xl hover:text-zinc-900 cursor-pointer transition-colors">Bosh Sahifa</a>
            {navLinks.map((link) => (
              <a 
                key={link.id}
                onClick={() => navigate(link.id)} 
                className={`text-xl cursor-pointer transition-colors hover:text-zinc-900 ${currentPage === link.id ? 'text-emerald-600 font-bold' : ''}`}
              >
                {link.label}
              </a>
            ))}
            <button onClick={() => {navigate('home');}} className="cursor-pointer bg-zinc-900 text-white px-6 py-4 rounded-2xl font-bold w-full mt-4 active:scale-95 transition-transform">
              Qabulga Yozilish
            </button>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentPage === 'home' && <Home navigate={navigate} />}
        {currentPage === 'treatments' && <Treatments />}
        {currentPage === 'specialists' && <Specialists />}
        {currentPage === 'stories' && <PatientStories />}
        {currentPage === 'journal' && <Journal />}
        {currentPage === 'clinic' && <ClinicInfo />}
      </main>

      {/* Subtle Marquee */}
      {currentPage === 'home' && (
        <div className="border-t border-zinc-100 py-8 overflow-hidden whitespace-nowrap flex items-center bg-zinc-50/50 mt-12 animate-reveal">
          <div className="flex animate-[marquee_20s_linear_infinite] gap-24 items-center text-zinc-400 font-semibold text-sm uppercase tracking-[0.2em]">
            {[...Array(8)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="hover:text-emerald-500 transition-colors cursor-pointer">Implantologiya</span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                <span className="hover:text-emerald-500 transition-colors cursor-pointer">Estetika</span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                <span className="hover:text-emerald-500 transition-colors cursor-pointer">Ortodontiya</span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-zinc-50 border-t border-zinc-200 py-12 text-center text-sm text-zinc-500 font-medium px-4 break-words relative z-20">
        <p>© 2026 Lumina Stomatologiyasi, Toshkent. Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  );
}

export default App;
