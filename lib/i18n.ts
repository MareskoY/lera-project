export const LANG_COOKIE = "lang" as const;

export type Lang = "ru" | "en";

export const SUPPORTED_LANGS: readonly Lang[] = ["ru", "en"] as const;

export function normalizeLang(input: string | null | undefined): Lang | null {
  const v = (input ?? "").trim().toLowerCase();
  if (v === "ru" || v === "en") return v;
  return null;
}

type Primitive = string | number;
type Vars = Record<string, Primitive>;

function interpolate(template: string, vars?: Vars) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k: string) => {
    const v = vars[k];
    return v === undefined || v === null ? `{${k}}` : String(v);
  });
}

export const MESSAGES = {
  ru: {
    "meta.title": "С Днём рождения, Лерик",
    "meta.description": "Интерактивная открытка — история, расписание и подарки",

    "common.back": "Вернуться",
    "common.close": "Закрыть",
    "common.view": "Смотреть →",

    "nav.menu": "Меню",
    "nav.menuAria": "Меню",
    "nav.story": "История",
    "nav.schedule": "Расписание",
    "nav.gifts": "Подарки",

    "overlay.locked.title": "Закрыто пока что",

    "timeline.locked": "🔒 закрыто",

    "photos.prevAria": "Предыдущее фото",
    "photos.nextAria": "Следующее фото",

    "instagram.failed.text": "Встроенное видео не загрузилось — откроем в Instagram.",
    "instagram.failed.open": "Смотреть →",

    "ach.header": "Твой путь",
    "ach.videoBadge": "видео",
    "ach.soundOff": "🔇 звук",
    "ach.soundOn": "🔊 звук",
    "ach.soundHint.off": "Нажми «звук», если хочешь со звуком",
    "ach.soundHint.on": "Можно листать дальше — видео продолжит играть",
    "ach.placeholderReel": "Тут будет ещё один reel (добавишь ссылку позже).",
    "ach.continue": "Продолжить →",
    "ach.watchAgain": "Посмотреть ещё раз",
    "ach.swipeHint": "Свайпни влево → (или кнопками ниже)",
    "ach.back": "← Назад",
    "ach.next": "Далее →",
    "ach.toSchedule": "К расписанию →",

    "slides.0.title": "С днём рождения,\nЛерик!",
    "slides.0.subtitle": "Я сделал для тебя маленькую интерактивную открытку ✨",
    "slides.1.title": "Тебе сегодня 32",
    "slides.1.subtitle": "И это звучит безумно красиво",
    "slides.2.title": "И за это время ты:",
    "slides.3.title": "Переехала в Москву\nи справилась со всеми трудностями",
    "slides.4.title": "Побывала в куче стран",
    "slides.5.title": "Переехала во Вьетнам",
    "slides.6.title": "Выучила английский,\nбудучи учителем английского",
    "slides.7.title": "Стала графическим\nдизайнером",
    "slides.8.title": "Поступила в университет\nи переехала в Португалию",
    "slides.9.title": "Стала мамой собаки",
    "slides.10.title": "Стала блогером",
    "slides.11.title": "И это всё ты",
    "slides.12.title": "Готова продолжить?",

    "schedule.locked.title": "Сначала — история",
    "schedule.locked.desc":
      "Расписание откроется после того, как ты дойдёшь до конца «Твой путь».",
    "schedule.locked.back": "к истории",
    "schedule.title": "Расписание",
    "schedule.subtitle": "Появляется по времени (Португалия)",
    "schedule.flowers.title": "Цветы",
    "schedule.flowers.ok": "Я довольна",
    "schedule.flowers.complain": "Оставить жалобу",
    "schedule.flowers.accepted": "Жалоба принята. Мы срочно повышаем уровень романтики на +12% ✨",
    "schedule.prepare.title": "Подготовься",
    "schedule.lockedLabel": "(пока заблокировано)",
    "schedule.prepare.item1": "олд мани повседневная одежда",
    "schedule.prepare.item2": "купальник",
    "schedule.prepare.ready": "Я готова",
    "schedule.prepare.readyDone": "Готово ✓",
    "schedule.gifts.title": "Твои подарки",
    "schedule.gifts.subtitle": "Можно заглянуть, когда захочешь.",
    "schedule.gifts.open": "Посмотреть",
    "schedule.hotel.title": "Сегодня ты проведёшь день и ночь тут:",
    "schedule.hotel.unlockLabel": "откроется в {time} (PT) · осталось {left}",
    "schedule.hotel.now": "Сейчас в Португалии:",
    "schedule.hotel.opens": "Откроется:",
    "schedule.hotel.hide": "Скрыть блок отеля",
    "schedule.agenda.title": "Расписание",
    "schedule.day1": "13 февраля",
    "schedule.day2": "14 февраля",
    "schedule.agenda.checkin": "Заезд",
    "schedule.agenda.spa": "Спа",
    "schedule.agenda.dinner": "Ужин",
    "schedule.agenda.walkPhoto": "Прогулка и фотосессия",
    "schedule.agenda.breakfast": "Завтрак",
    "schedule.agenda.morningWalk": "Прогулка и утренняя фотосессия",
    "schedule.agenda.checkout": "Выезд",
    "schedule.agenda.spaValue": "баня / сауна / хаммам / джакузи до 18:30",
    "schedule.agenda.walkPhotoValue": "до 22:00",
    "schedule.agenda.morningWalkValue": "10:30",

    "gifts.locked.title": "Подарки ждут своего часа",
    "gifts.locked.desc": "Сначала досмотри «Твой путь» — и конверты откроются.",
    "gifts.locked.back": "к истории",
    "gifts.title": "Подарки",
    "gifts.subtitle": "Один конверт. Один пароль. Один сюрприз.",
    "gifts.passwordHint": "мой пароль",

    "envelope.opened": "Открыто ✓",
    "envelope.tapToOpen": "Нажми, чтобы открыть",
    "envelope.alreadyOpened": "Этот конверт уже открыт",
    "envelope.enterPassword": "Введи пароль и открой",
    "envelope.passwordPlaceholder": "Пароль…",
    "envelope.open": "Открыть",
    "envelope.errorWrong": "Неправильный пароль",
    "envelope.errorWrongWithHint": "Неправильно. Подсказка: {hint}",
    "envelope.done": "Готово ✓",
    "envelope.doneText": "Проверь свою почту — сертификат уже там.",
  },
  en: {
    "meta.title": "Happy birthday, Lerik",
    "meta.description": "An interactive card — story, schedule, and gifts",

    "common.back": "Back",
    "common.close": "Close",
    "common.view": "View →",

    "nav.menu": "Menu",
    "nav.menuAria": "Menu",
    "nav.story": "Story",
    "nav.schedule": "Schedule",
    "nav.gifts": "Gifts",

    "overlay.locked.title": "Locked for now",

    "timeline.locked": "🔒 locked",

    "photos.prevAria": "Previous photo",
    "photos.nextAria": "Next photo",

    "instagram.failed.text": "The embedded video didn’t load — let’s open it on Instagram.",
    "instagram.failed.open": "Open →",

    "ach.header": "Your journey",
    "ach.videoBadge": "video",
    "ach.soundOff": "🔇 sound",
    "ach.soundOn": "🔊 sound",
    "ach.soundHint.off": "Tap “sound” if you want audio",
    "ach.soundHint.on": "You can keep swiping — the video will keep playing",
    "ach.placeholderReel": "Another reel will be here (you’ll add the link later).",
    "ach.continue": "Continue →",
    "ach.watchAgain": "Watch again",
    "ach.swipeHint": "Swipe left → (or use the buttons below)",
    "ach.back": "← Back",
    "ach.next": "Next →",
    "ach.toSchedule": "To schedule →",

    "slides.0.title": "Happy birthday,\nLerik!",
    "slides.0.subtitle": "I made you a tiny interactive card ✨",
    "slides.1.title": "You are 32 today",
    "slides.1.subtitle": "And it sounds insanely beautiful",
    "slides.2.title": "And in that time you:",
    "slides.3.title": "Moved to Moscow\nand overcame every challenge",
    "slides.4.title": "Visited a bunch of countries",
    "slides.5.title": "Moved to Vietnam",
    "slides.6.title": "Learned English\nwhile teaching English",
    "slides.7.title": "Became a graphic\ndesigner",
    "slides.8.title": "Entered university\nand moved to Portugal",
    "slides.9.title": "Became a dog mom",
    "slides.10.title": "Became a blogger",
    "slides.11.title": "And that’s all you",
    "slides.12.title": "Ready to continue?",

    "schedule.locked.title": "Story first",
    "schedule.locked.desc": "The schedule will unlock once you reach the end of “Your journey”.",
    "schedule.locked.back": "to the story",
    "schedule.title": "Schedule",
    "schedule.subtitle": "Time-gated (Portugal time)",
    "schedule.flowers.title": "Flowers",
    "schedule.flowers.ok": "I’m happy",
    "schedule.flowers.complain": "Leave a complaint",
    "schedule.flowers.accepted": "Complaint accepted. Urgently increasing romance level by +12% ✨",
    "schedule.prepare.title": "Get ready",
    "schedule.lockedLabel": "(locked for now)",
    "schedule.prepare.item1": "old money casual outfit",
    "schedule.prepare.item2": "swimsuit",
    "schedule.prepare.ready": "I’m ready",
    "schedule.prepare.readyDone": "Done ✓",
    "schedule.gifts.title": "Your gifts",
    "schedule.gifts.subtitle": "You can peek whenever you want.",
    "schedule.gifts.open": "Open",
    "schedule.hotel.title": "Today you’ll spend the day and night here:",
    "schedule.hotel.unlockLabel": "opens at {time} (PT) · {left} left",
    "schedule.hotel.now": "Portugal time now:",
    "schedule.hotel.opens": "Opens at:",
    "schedule.hotel.hide": "Hide hotel block",
    "schedule.agenda.title": "Agenda",
    "schedule.day1": "February 13",
    "schedule.day2": "February 14",
    "schedule.agenda.checkin": "Check-in",
    "schedule.agenda.spa": "Spa",
    "schedule.agenda.dinner": "Dinner",
    "schedule.agenda.walkPhoto": "Walk & photoshoot",
    "schedule.agenda.breakfast": "Breakfast",
    "schedule.agenda.morningWalk": "Morning walk & photos",
    "schedule.agenda.checkout": "Check-out",
    "schedule.agenda.spaValue": "bath / sauna / hammam / jacuzzi until 18:30",
    "schedule.agenda.walkPhotoValue": "until 22:00",
    "schedule.agenda.morningWalkValue": "10:30",

    "gifts.locked.title": "Gifts are waiting",
    "gifts.locked.desc": "Finish “Your journey” first — then the envelopes will open.",
    "gifts.locked.back": "to the story",
    "gifts.title": "Gifts",
    "gifts.subtitle": "One envelope. One password. One surprise.",
    "gifts.passwordHint": "my password",

    "envelope.opened": "Opened ✓",
    "envelope.tapToOpen": "Tap to open",
    "envelope.alreadyOpened": "This envelope is already open",
    "envelope.enterPassword": "Enter the password and open it",
    "envelope.passwordPlaceholder": "Password…",
    "envelope.open": "Open",
    "envelope.errorWrong": "Wrong password",
    "envelope.errorWrongWithHint": "Wrong. Hint: {hint}",
    "envelope.done": "Done ✓",
    "envelope.doneText": "Check your email — the certificate is already there.",
  },
} as const;

export type MessageKey = keyof (typeof MESSAGES)["ru"];

export function t(lang: Lang, key: MessageKey, vars?: Vars): string {
  const table = MESSAGES[lang] ?? MESSAGES.ru;
  const template = table[key] ?? MESSAGES.ru[key] ?? key;
  return interpolate(template, vars);
}

