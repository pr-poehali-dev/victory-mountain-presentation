import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type IconName = keyof typeof import("lucide-react");

const slides = [
  {
    id: 1,
    type: "cover",
    title: "Гора Победа",
    subtitle: "Высочайшая вершина Кыргызстана",
    meta: "Доклад ученика · 2026 год",
  },
  {
    id: 2,
    type: "info",
    title: "Общие сведения",
    icon: "Mountain",
    facts: [
      { label: "Высота", value: "7 439 м" },
      { label: "Расположение", value: "Тянь-Шань, Кыргызстан / Китай" },
      { label: "Первое восхождение", value: "1956 год (СССР)" },
      { label: "Координаты", value: "42°02′ с.ш., 79°58′ в.д." },
    ],
  },
  {
    id: 3,
    type: "photo",
    title: "Как выглядит вершина",
    image:
      "https://cdn.poehali.dev/projects/55c9871a-bd8a-4c94-9218-c821e85e9c77/files/1517bdde-25e2-4eac-a4e7-88ff91b0a2e8.jpg",
    caption: "Гора Победа — один из самых суровых семитысячников мира",
  },
  {
    id: 4,
    type: "history",
    title: "История открытия",
    icon: "BookOpen",
    points: [
      "Гора была открыта в 1943 году советскими топографами",
      "Первоначально её высота была определена неверно",
      "Официальное восхождение состоялось в 1956 году",
      "Экспедицию возглавил Виталий Абалаков",
      "Название «Победа» дано в честь победы в Великой Отечественной войне",
    ],
  },
  {
    id: 5,
    type: "danger",
    title: "Опасности и климат",
    icon: "CloudSnow",
    points: [
      "Температура зимой опускается до −60°C",
      "Постоянные лавины и снежные бури",
      "Зона вечных снегов начинается с 3 500 м",
      "Один из самых опасных семитысячников мира",
      "Высокий процент несчастных случаев среди альпинистов",
    ],
    accent: true,
  },
  {
    id: 6,
    type: "geo",
    title: "География",
    icon: "Globe",
    facts: [
      { label: "Горная система", value: "Центральный Тянь-Шань" },
      { label: "Хребет", value: "Кокшаал-Тоо" },
      { label: "Ледник", value: "Звёздочка (у подножия)" },
      { label: "Ближайший город", value: "Нарын (~250 км)" },
    ],
  },
  {
    id: 7,
    type: "interesting",
    title: "Интересные факты",
    icon: "Star",
    points: [
      "Победа входит в топ-10 самых высоких вершин СНГ",
      "С горы берёт начало ледник Звёздочка — один из крупнейших в Азии",
      "Альпинисты называют её «горой-убийцей» за высокую смертность",
      "Гора является символом Кыргызстана",
      "На вершине почти всегда бушует ураганный ветер",
    ],
  },
  {
    id: 8,
    type: "final",
    title: "Вывод",
    text: "Гора Победа — величественная и опасная вершина Центральной Азии. Она хранит в себе историю советских первопроходцев и остаётся одним из самых сложных испытаний для альпинистов всего мира.",
    icon: "Award",
  },
];

export default function Index() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(slides.length - 1, c + 1));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const slide = slides[current];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-sans">
      {/* Слайд */}
      <div className="w-full max-w-3xl bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden min-h-[480px] flex flex-col">
        {slide.type === "cover" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-12 py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="w-16 h-1 bg-gray-900 mb-10 rounded-full" />
            <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {slide.title}
            </h1>
            <p className="text-xl text-gray-500 mb-8">{slide.subtitle}</p>
            <span className="text-sm text-gray-400 uppercase tracking-widest">
              {slide.meta}
            </span>
            <div className="w-16 h-1 bg-gray-900 mt-10 rounded-full" />
          </div>
        )}

        {slide.type === "info" && (
          <div className="flex-1 flex flex-col px-12 py-10">
            <div className="flex items-center gap-3 mb-8">
              <Icon name={slide.icon ?? ""} size={24} className="text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-900">{slide.title}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 flex-1">
              {slide.facts?.map((f) => (
                <div key={f.label} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{f.label}</p>
                  <p className="text-lg font-semibold text-gray-900">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "photo" && (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-72 object-cover"
              />
            </div>
            <div className="px-12 py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{slide.title}</h2>
              <p className="text-gray-500">{slide.caption}</p>
            </div>
          </div>
        )}

        {(slide.type === "history" || slide.type === "danger" || slide.type === "interesting") && (
          <div className="flex-1 flex flex-col px-12 py-10">
            <div className="flex items-center gap-3 mb-8">
              <Icon name={slide.icon ?? ""} size={24} className={slide.accent ? "text-red-400" : "text-gray-400"} />
              <h2 className="text-2xl font-bold text-gray-900">{slide.title}</h2>
            </div>
            <ul className="flex flex-col gap-3 flex-1">
              {slide.points?.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${slide.accent ? "bg-red-400" : "bg-gray-900"}`} />
                  <span className="text-gray-700 leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {slide.type === "geo" && (
          <div className="flex-1 flex flex-col px-12 py-10">
            <div className="flex items-center gap-3 mb-8">
              <Icon name={slide.icon ?? ""} size={24} className="text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-900">{slide.title}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 flex-1">
              {slide.facts?.map((f) => (
                <div key={f.label} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{f.label}</p>
                  <p className="text-lg font-semibold text-gray-900">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "final" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-12 py-16">
            <Icon name={slide.icon ?? ""} size={40} className="text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{slide.title}</h2>
            <p className="text-gray-600 leading-relaxed text-lg max-w-xl">{slide.text}</p>
          </div>
        )}
      </div>

      {/* Навигация */}
      <div className="flex items-center gap-6 mt-6">
        <button
          onClick={prev}
          disabled={current === 0}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-gray-900" : "w-2 bg-gray-200 hover:bg-gray-400"}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <Icon name="ChevronRight" size={20} />
        </button>
      </div>

      <p className="mt-3 text-xs text-gray-400">
        {current + 1} / {slides.length}
      </p>
    </div>
  );
}