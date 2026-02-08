export type AchievementSlide =
  | {
      kind: "title";
      title: string;
      subtitle?: string;
      bg: string;
      accent: string;
      hero?: { src: string; width?: number; height?: number; opacity?: number };
      decor?: { src: string; corner?: "tl" | "tr" | "bl" | "br"; opacity?: number; rotate?: number };
      pattern?: { src: string; opacity?: number; scale?: number };
    }
  | {
      kind: "photos";
      title: string;
      text?: string;
      bg: string;
      accent: string;
      photos: string[];
      decor?: { src: string; corner?: "tl" | "tr" | "bl" | "br"; opacity?: number; rotate?: number };
      pattern?: { src: string; opacity?: number; scale?: number };
    }
  | {
      kind: "video";
      title: string;
      text?: string;
      bg: string;
      accent: string;
      video: { src: string; poster?: string };
      decor?: { src: string; corner?: "tl" | "tr" | "bl" | "br"; opacity?: number; rotate?: number };
      pattern?: { src: string; opacity?: number; scale?: number };
    }
  | {
      kind: "instagram";
      title: string;
      text?: string;
      bg: string;
      accent: string;
      photo?: string;
      url: string;
      decor?: { src: string; corner?: "tl" | "tr" | "bl" | "br"; opacity?: number; rotate?: number };
      pattern?: { src: string; opacity?: number; scale?: number };
    }
  | {
      kind: "blogger";
      title: string;
      bg: string;
      accent: string;
    }
  | {
      kind: "final";
      title: string;
      bg: string;
      accent: string;
    };

// Important: use real filenames in /public/assets (your folder already has a couple typos).
export const ACHIEVEMENT_SLIDES: AchievementSlide[] = [
  {
    kind: "title",
    title: "С днём рождения,\nЛерик!",
    subtitle: "Я сделал для тебя маленькую интерактивную открытку ✨",
    bg: "#f5dfc2",
    accent: "#c9746b",
    hero: { src: "/assets/gift.png", width: 720, height: 720, opacity: 1 },
  },
  {
    kind: "title",
    title: "Тебе сегодня 32",
    subtitle: "И это звучит безумно красиво",
    bg: "#e6f5f1",
    accent: "#7b9173",
    hero: { src: "/assets/cake.png", width: 720, height: 720, opacity: 1 },
  },
  {
    kind: "title",
    title: "И за это время ты:",
    bg: "#efd7fc",
    accent: "#6c99a3",
    hero: { src: "/assets/prize.png", width: 720, height: 720, opacity: 1 },
  },
  {
    kind: "photos",
    title: "Переехала в Москву\nи справилась со всеми трудностями",
    bg: "#c9746b",
    accent: "#c9746b",
    photos: ["/assets/moscow-1.jpg", "/assets/moscow-2.jpg", "/assets/moscow-3.png"],
    decor: { src: "/assets/bg-elemet-moscow.png", corner: "br", opacity: 0.16, rotate: -6 },
  },
  {
    kind: "photos",
    title: "Побывала в куче стран",
    bg: "#f7e3c3",
    accent: "#e3c08f",
    photos: [
      "/assets/countries-6.jpg",
      "/assets/countries-4.jpg",
      "/assets/countries-5.jpg",
      "/assets/countries-7.jpg",
      "/assets/countries-1.jpg",
      "/assets/countries-2.jpg",
      "/assets/country-3.jpg",
    ],
    pattern: { src: "/assets/pattern-5.png", opacity: 0.38, scale: 0.9 },
    decor: { src: "/assets/bg-map.png", corner: "tr", opacity: 0.16, rotate: 8 },
  },
  {
    kind: "photos",
    title: "Переехала во Вьетнам",
    bg: "#e3917f",
    accent: "#fac1ac",
    photos: [
      "/assets/vietnam-1.jpg",
      "/assets/vietnam-2.jpg",
      "/assets/vietnam-3.jpg",
      "/assets/vietnam-4.jpg",
    ],
    decor: { src: "/assets/vietnam-element.png", corner: "bl", opacity: 0.16, rotate: -10 },
  },
  {
    kind: "photos",
    title: "Выучила английский,\nбудучи учителем английского",
    bg: "#f2b957",
    accent: "#fcf2ca",
    photos: ["/assets/teacher.jpg", "/assets/teacher-2.jpg"],
    pattern: { src: "/assets/pattern-bg-design.png", opacity: 0.14, scale: 1.2 },
  },
  {
    kind: "video",
    title: "Стала графическим\nдизайнером",
    bg: "#dfeff6",
    accent: "#6c99a3",
    video: { src: "/assets/designer.mp4" },
    pattern: { src: "/assets/bg-pattern-design.png", opacity: 0.18, scale: 1.15 },
  },
  {
    kind: "video",
    title: "Поступила в университет\nи переехала в Португалию",
    bg: "#c5dbe2",
    accent: "#6c99a3",
    video: { src: "/assets/university.mp4" },
    decor: { src: "/assets/portgal-element.png", corner: "br", opacity: 0.16, rotate: 4 },
  },
  {
    kind: "video",
    title: "Стала мамой собаки",
    bg: "#deddcc",
    accent: "#7b9173",
    video: { src: "/assets/chapa.mp4" },
    decor: { src: "/assets/dog.png", corner: "bl", opacity: 0.18, rotate: -8 },
  },
  {
    kind: "blogger",
    title: "Стала блогером",
    bg: "#D598E3",
    accent: "#E8C6EE",
  },
  {
    kind: "photos",
    title: "И это всё ты",
    bg: "#f3d6c8",
    accent: "#c9746b",
    photos: ["/assets/lera-3.jpg", "/assets/lera-2.jpg", "/assets/lera-1.jpg"],
  },
  {
    kind: "final",
    title: "Готова продолжить?",
    bg: "#fff7f0",
    accent: "#c9746b",
  },
];


