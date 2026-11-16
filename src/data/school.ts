// Facts for the homepage. Source: veon/client.json (company.*, facts B-F003, B-F008, socials). Nothing invented.
export const phone = {
  display: "+38 (067) 673 85 30",
  short: "+38 067 673 85 30",
  href: "tel:+380676738530",
  admin: "Катерина Балінська",
  hours: "Пн–Пт 10:00–18:00",
};

export const email = {
  address: "bauer.lviv@gmail.com",
  href: "mailto:bauer.lviv@gmail.com",
  trialHref: "mailto:bauer.lviv@gmail.com?subject=%D0%9F%D1%80%D0%BE%D0%B1%D0%BD%D0%B5%20%D1%82%D1%80%D0%B5%D0%BD%D1%83%D0%B2%D0%B0%D0%BD%D0%BD%D1%8F",
};

export const address = {
  place: "Ковзанка ТРЦ King Cross Leopolis",
  street: "вул. Стрийська, 30",
  locality: "с. Сокільники",
  region: "Львівська обл.",
  lat: 49.773519,
  lng: 24.00773,
  mapHref: "https://www.google.com/maps/search/?api=1&query=49.773519%2C24.00773",
};

export const socials = [
  { name: "Instagram", href: "https://www.instagram.com/bauer.school/" },
  { name: "Facebook", href: "https://www.facebook.com/bauer.school.lviv" },
  { name: "TikTok", href: "https://www.tiktok.com/@bauer.school" },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCl5D39og0_mA-JbLtvTslYg" },
  { name: "Telegram", href: "https://t.me/+nFcGMJmv8XRmZjRi", note: "канал новин «Bauer News»" },
] as const;

export const nav = [
  { href: "#groups", label: "Групи" },
  { href: "#trial", label: "Пробне" },
  { href: "#coaches", label: "Тренери" },
  { href: "#prices", label: "Ціни" },
  { href: "#contacts", label: "Контакти" },
] as const;

export const FUTURE = "Розділ у розробці";
