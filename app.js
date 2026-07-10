/* ================= The Sweet Bar — menu, cart & checkout ================= */
"use strict";

/* ---------- Flavor palettes ---------- */
const FRUIT_FLAVORS = [
  ["Raspberry", "#e3305c"], ["Green Apple", "#9acd32"], ["Pineapple", "#f7d117"],
  ["Dragon Fruit", "#ff2e88"], ["Pomegranate", "#c0392b"], ["Mango", "#ffb300"],
  ["Passion Fruit", "#ff8c42"], ["Strawberry", "#fc5a8d"], ["Watermelon", "#ff6b6b"],
  ["Lychee", "#f8c8d4"], ["Peach", "#ffcba4"]
];

const SHAKE_FLAVORS = [
  ["Oreo", "#5a5a5a"], ["Caramel", "#c68e17"], ["Pistachio", "#93c572"],
  ["Vanilla", "#f3e5ab"], ["Strawberry", "#fc5a8d"], ["Chocolate", "#7b3f00"]
];

const SODA_BASES = [["Coca-Cola", "#3e2723"], ["Fanta", "#ff8f00"], ["Sprite", "#cdeccd"], ["Dr Pepper", "#6d1a2d"]];

const WAFFLE_ICECREAM = [
  ["Pistachio Almond", "#93c572"], ["Bubble Gum", "#ff9ecb"], ["Vanilla", "#f7f0d8"],
  ["Strawberry", "#fc5a8d"], ["Strawberry Cheesecake", "#f7a1b0"], ["Cookies & Cream", "#d9d4cf"],
  ["Cotton Candy", "#f3a5d7"], ["Chocolate", "#6b3e26"], ["Salted Caramel", "#c98f4e"],
  ["Espresso Madness", "#6f4e37"], ["Huckleberry", "#5a4fcf"], ["Huckleberry Cheesecake", "#9188d6"],
  ["Cookie Dough", "#d2a86e"], ["French Vanilla", "#f5e6b8"]
];

const ICECREAM_FLAVORS = [
  ["Strawberry", "#fc5a8d"], ["Strawberry Cheesecake", "#f7a1b0"], ["Huckleberry", "#5a4fcf"],
  ["Huckleberry Cheesecake", "#9188d6"], ["Cookies and Cream", "#d9d4cf"], ["Cookie Dough", "#d2a86e"],
  ["Chocolate", "#6b3e26"], ["Chocolate Chip Mint", "#98e2c6"], ["Chocolate Brownie", "#5a3825"],
  ["Vanilla", "#f7f0d8"], ["Almond Mocha Fudge", "#8a6a4f"], ["Espresso Madness", "#6f4e37"],
  ["Bubble Gum", "#ff9ecb"], ["Cotton Candy", "#f3a5d7"], ["Salted Caramel", "#c98f4e"],
  ["Rainbow Sorbet", "#ff9a56"], ["Pistachio Almond", "#93c572"], ["Rocky Road", "#7b5a44"]
];

const WAFFLE_TOPPINGS = ["Strawberry", "Blueberry", "Banana", "Pecan", "Almond", "Pistachio",
  "Caramel Sauce", "Chocolate Sauce", "Whipped Cream", "Oreo", "Biscoff", "Sprinkles", "Nutella"];

const ICECREAM_TOPPINGS = ["Gummy Bear", "Oreo", "Biscoff", "Whipped Cream", "Chocolate Sauce",
  "Caramel Sauce", "Nutella", "Sprinkles", "Almonds", "Peanuts"];

const VIRAL_FRUITS = [
  ["Strawberry", "#f4738f"], ["Mango", "#ffb300"], ["Peach", "#ffab7b"],
  ["Lime", "#a4d465"], ["Lemon", "#f7d842"], ["Grape", "#8e5aa8"]
];

/* ---------- SVG art ---------- */
function cupSVG(color, opts) {
  opts = opts || {};
  return '<svg viewBox="0 0 64 64">' +
    // striped straw
    '<g transform="rotate(14 37 14)"><rect x="35" y="1" width="5" height="22" rx="2.5" fill="#f26d8d"/>' +
    '<rect x="35" y="5" width="5" height="3.4" fill="#ffffff" opacity=".85"/><rect x="35" y="12" width="5" height="3.4" fill="#ffffff" opacity=".85"/></g>' +
    // cup body
    '<path d="M16 18 L48 18 L44 56 Q44 60 40 60 L24 60 Q20 60 20 56 Z" fill="#f2fafe" stroke="#bcdcef" stroke-width="1.5"/>' +
    // drink: lighter top layer over deeper bottom
    '<path d="M18 25 L46 25 L43.4 52 Q43.2 56 39.6 56 L24.4 56 Q20.8 56 20.6 52 Z" fill="' + color + '" opacity=".88"/>' +
    '<path d="M20.9 45 L43.2 45 L42.6 52 Q42.4 56 39.2 56 L24.8 56 Q21.6 56 21.4 52 Z" fill="#000000" opacity=".16"/>' +
    '<path d="M18 25 L46 25 L45.5 31 L18.5 31 Z" fill="#ffffff" opacity=".28"/>' +
    // ice cubes
    '<rect x="23" y="29" width="7.5" height="7.5" rx="2" fill="#ffffff" opacity=".55" transform="rotate(-10 26 33)"/>' +
    '<rect x="33.5" y="34" width="6.5" height="6.5" rx="2" fill="#ffffff" opacity=".5" transform="rotate(16 37 37)"/>' +
    '<rect x="26" y="40" width="5.5" height="5.5" rx="1.8" fill="#ffffff" opacity=".4" transform="rotate(-22 29 43)"/>' +
    // fizz bubbles
    '<circle cx="41" cy="30" r="1.1" fill="#ffffff" opacity=".8"/><circle cx="24" cy="38" r="1" fill="#ffffff" opacity=".7"/><circle cx="38" cy="49" r="1" fill="#ffffff" opacity=".6"/>' +
    // lid rim
    '<rect x="14" y="15" width="36" height="5.5" rx="2.75" fill="#ffffff" stroke="#bcdcef" stroke-width="1.2"/>' +
    "</svg>";
}

function shakeSVG(color) {
  return '<svg viewBox="0 0 64 64">' +
    // striped straw
    '<g transform="rotate(12 39 8)"><rect x="37" y="0" width="5" height="17" rx="2.5" fill="#2a8fd4"/>' +
    '<rect x="37" y="3.5" width="5" height="3" fill="#ffffff" opacity=".85"/><rect x="37" y="9.5" width="5" height="3" fill="#ffffff" opacity=".85"/></g>' +
    // whipped cream: puffs + swirl tip
    '<path d="M19 23 Q18 16 24 17 Q25 10 32 13 Q39 10 40 17 Q46 16 45 23 Z" fill="#fff8fb" stroke="#ecd2dc" stroke-width="1.2"/>' +
    '<path d="M30 13 Q32 8 34 12 Q35 9 32 6.5 Q29 9 30 13Z" fill="#fff8fb" stroke="#ecd2dc" stroke-width="1"/>' +
    // cherry with stem
    '<circle cx="32" cy="6.5" r="3" fill="#e8425a"/><circle cx="31" cy="5.6" r="0.9" fill="#ffc9d3"/>' +
    '<path d="M32 3.6 q2.4 -2 4 -.6" stroke="#5f8f3e" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
    // sprinkles on the cream
    '<rect x="23" y="18.5" width="3" height="1.3" rx=".6" fill="#f5b301" transform="rotate(-20 24 19)"/>' +
    '<rect x="37" y="18" width="3" height="1.3" rx=".6" fill="#8fce6d" transform="rotate(24 38 19)"/>' +
    '<rect x="30" y="15.5" width="3" height="1.3" rx=".6" fill="#59b7e8" transform="rotate(-8 31 16)"/>' +
    // glass
    '<path d="M17 24 L47 24 L43 56 Q43 60 39 60 L25 60 Q21 60 21 56 Z" fill="' + color + '"/>' +
    '<path d="M18.5 24 L45.5 24 L44.9 30 L19.1 30 Z" fill="#ffffff" opacity=".25"/>' +
    '<path d="M21.5 33 L24 54" stroke="#ffffff" stroke-width="2.4" opacity=".35" stroke-linecap="round"/>' +
    "</svg>";
}

function floatSVG() {
  return '<svg viewBox="0 0 64 64">' +
    // striped straw
    '<g transform="rotate(-14 26 10)"><rect x="23" y="2" width="5" height="18" rx="2.5" fill="#e8425a"/>' +
    '<rect x="23" y="6" width="5" height="3" fill="#ffffff" opacity=".85"/><rect x="23" y="12" width="5" height="3" fill="#ffffff" opacity=".85"/></g>' +
    // root beer glass
    '<path d="M17 22 L47 22 L43 56 Q43 60 39 60 L25 60 Q21 60 21 56 Z" fill="#5a3a1e"/>' +
    '<path d="M18.2 22 L45.8 22 L45 31 L19 31 Z" fill="#f7ecd7"/>' +
    // vanilla scoop bobbing on top
    '<circle cx="36" cy="18" r="8.5" fill="#fdf6e9" stroke="#e8d9bd" stroke-width="1.2"/>' +
    '<path d="M31.5 15 q2 -3.6 6 -3" stroke="#ffffff" stroke-width="1.8" fill="none" opacity=".8" stroke-linecap="round"/>' +
    // foam blobs
    '<circle cx="24" cy="21" r="4.4" fill="#f7ecd7"/><circle cx="29" cy="23.5" r="3.6" fill="#f7ecd7"/><circle cx="43" cy="23" r="3.2" fill="#f7ecd7"/>' +
    // rising bubbles
    '<circle cx="28" cy="39" r="1.8" fill="#8a6236"/><circle cx="37" cy="45" r="1.8" fill="#8a6236"/>' +
    '<circle cx="33" cy="35" r="1.2" fill="#a97b47"/><circle cx="25" cy="49" r="1.2" fill="#a97b47"/><circle cx="39" cy="52" r="1" fill="#a97b47"/>' +
    // glass shine
    '<path d="M21.5 34 L23.5 54" stroke="#ffffff" stroke-width="2.2" opacity=".22" stroke-linecap="round"/>' +
    "</svg>";
}

function energySVG(color) {
  return '<svg viewBox="0 0 64 64">' +
    // cup body
    '<path d="M16 18 L48 18 L44 56 Q44 60 40 60 L24 60 Q20 60 20 56 Z" fill="#f2fafe" stroke="#bcdcef" stroke-width="1.5"/>' +
    '<path d="M18 25 L46 25 L43.4 52 Q43.2 56 39.6 56 L24.4 56 Q20.8 56 20.6 52 Z" fill="' + color + '" opacity=".88"/>' +
    '<path d="M18 25 L46 25 L45.5 31 L18.5 31 Z" fill="#ffffff" opacity=".28"/>' +
    // fizz
    '<circle cx="24" cy="33" r="1.2" fill="#ffffff" opacity=".8"/><circle cx="40" cy="30" r="1" fill="#ffffff" opacity=".75"/><circle cx="26" cy="48" r="1" fill="#ffffff" opacity=".6"/><circle cx="40" cy="50" r="1.1" fill="#ffffff" opacity=".65"/>' +
    // lightning bolt
    '<path d="M34.5 27 L26 41 L31.5 41 L28.5 53 L39 37.5 L33.5 37.5 Z" fill="#fff34d" stroke="#e0a800" stroke-width="1.2" stroke-linejoin="round"/>' +
    // lid rim
    '<rect x="14" y="15" width="36" height="5.5" rx="2.75" fill="#ffffff" stroke="#bcdcef" stroke-width="1.2"/>' +
    "</svg>";
}

function waffleSVG(scoops) {
  const cols = scoops && scoops.length ? scoops : ["#f26d8d", "#8fce6d"];
  let art = '<svg viewBox="0 0 64 64">' +
    // waffle wrap (folded cone)
    '<path d="M32 62 L15 26 Q23 17 32 21 Q41 17 49 26 Z" fill="#e2a458"/>' +
    '<path d="M32 62 L15 26 Q23 17 32 21 Z" fill="#d6954a"/>';
  // raised bubbles, fewer as the cone narrows
  const rows = [
    [27, [19, 25.5, 32, 38.5, 45]],
    [34, [22, 28.5, 35, 41.5]],
    [41, [25.5, 32, 38.5]],
    [48, [28.5, 35.5]],
    [55, [32]]
  ];
  rows.forEach(function (row) {
    row[1].forEach(function (x) {
      art += '<circle cx="' + x + '" cy="' + row[0] + '" r="3" fill="#f0bd74"/>' +
        '<circle cx="' + (x - 0.9) + '" cy="' + (row[0] - 1) + '" r="1.2" fill="#f9d9a4"/>';
    });
  });
  // ice cream scoops nestled in the wrap
  const two = cols.length > 1;
  const s = two ? [[24.5, 14, 9.5], [40, 12.5, 9.5]] : [[32, 12, 10.5]];
  s.forEach(function (p, i) {
    const col = cols[Math.min(i, cols.length - 1)];
    art += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '" fill="' + col + '"/>' +
      '<path d="M' + (p[0] - p[2] * .55) + " " + (p[1] - p[2] * .35) + " q" + (p[2] * .3) + " " + (-p[2] * .55) + " " + (p[2] * .8) + ' 0" stroke="#ffffff" stroke-width="2" fill="none" opacity=".55" stroke-linecap="round"/>';
  });
  // chocolate drizzle + cherry
  art += '<path d="M20 10 Q26 4 33 7 Q40 3 46 9" stroke="#7b4a21" stroke-width="1.6" fill="none" opacity=".8" stroke-linecap="round"/>' +
    '<circle cx="' + (two ? 33 : 32) + '" cy="4.5" r="2.6" fill="#e8425a"/>' +
    '<path d="M' + (two ? 33 : 32) + ' 2.2 q2 -1.6 3.4 -.4" stroke="#5f8f3e" stroke-width="1.3" fill="none" stroke-linecap="round"/>';
  return art + "</svg>";
}

function dubaiSVG() {
  return '<svg viewBox="0 0 64 64">' +
    // clear cup with layers: chocolate base, kunafa middle, pistachio cream top
    '<path d="M17 22 L47 22 L43.5 56 Q43.5 60 39.5 60 L24.5 60 Q20.5 60 20.5 56 Z" fill="#f2fafe" stroke="#bcdcef" stroke-width="1.2"/>' +
    '<path d="M19.6 45 L44.4 45 L43.7 55.5 Q43.6 58.6 40 58.6 L24 58.6 Q20.4 58.6 20.3 55.5 Z" fill="#4a2a12"/>' +
    '<path d="M18.9 36 L45.1 36 L44.4 45.5 L19.6 45.5 Z" fill="#d9913e"/>' +
    '<path d="M20 38 h23 M20.5 40.5 h22 M21 43 h21" stroke="#b8752c" stroke-width="1.1"/>' +
    '<path d="M18.2 23 L45.8 23 L45 36.5 L19 36.5 Z" fill="#96c477"/>' +
    // pistachio crumbs
    '<circle cx="24" cy="27" r="1.3" fill="#5f8f3e"/><circle cx="33" cy="30" r="1.2" fill="#5f8f3e"/><circle cx="40" cy="26" r="1.3" fill="#5f8f3e"/><circle cx="28" cy="33" r="1" fill="#6faf4e"/>' +
    // strawberry halves on top
    '<path d="M23 22 Q23 14 28 13 Q33 14 33 22 Z" fill="#e8425a"/>' +
    '<path d="M33.5 22 Q33.5 15 38 14 Q42.5 15 42.5 22 Z" fill="#d63552"/>' +
    '<circle cx="26.5" cy="17.5" r=".8" fill="#ffd6de"/><circle cx="29.5" cy="19.5" r=".8" fill="#ffd6de"/><circle cx="37" cy="18" r=".8" fill="#ffc9d3"/>' +
    // whole strawberry with leaf crowning the cup
    '<path d="M29 10.5 Q29 4.5 32.8 4 Q36.6 4.5 36.6 10.5 Q32.8 13.5 29 10.5Z" fill="#e8425a" transform="rotate(-12 32 8)"/>' +
    '<path d="M31 3.5 q2 -2.4 4.4 -1.2" stroke="#5f8f3e" stroke-width="1.4" fill="none" stroke-linecap="round"/>' +
    // chocolate drizzle
    '<path d="M21 20 Q28 25.5 35 21 Q40 25 44 21.5" stroke="#5a3319" stroke-width="1.5" fill="none" opacity=".75" stroke-linecap="round"/>' +
    "</svg>";
}

function coneSVG(colors) {
  const cols = colors && colors.length ? colors : ["#f7f0d8"];
  const n = Math.min(cols.length, 3);
  const coneTop = 34;
  let art = '<svg viewBox="0 0 64 64">' +
    // waffle cone with lattice
    '<path d="M32 61 L20.5 ' + coneTop + ' h23 Z" fill="#dfa356"/>' +
    '<path d="M23 39 L38 ' + coneTop + ' M26.5 47 L42 ' + (coneTop + 1) + ' M30 55 L41 ' + (coneTop + 12) + '" stroke="#b97f3e" stroke-width="1.4"/>' +
    '<path d="M41 39 L26 ' + coneTop + ' M37.5 47 L22 ' + (coneTop + 1) + ' M34 55 L23 ' + (coneTop + 12) + '" stroke="#b97f3e" stroke-width="1.4"/>' +
    '<rect x="19.5" y="' + (coneTop - 2.4) + '" width="25" height="4" rx="2" fill="#c98844"/>';
  // scoops from bottom up, slightly offset for a hand-stacked look
  for (let i = 0; i < n; i++) {
    const cy = 27 - i * 10.5;
    const cx = 32 + (i === 1 ? -1.5 : i === 2 ? 1 : 0);
    const r = 10.5 - i * 1.2;
    art += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + cols[i] + '"/>' +
      '<path d="M' + (cx - r * .5) + " " + (cy - r * .3) + " q" + (r * .28) + " " + (-r * .5) + " " + (r * .75) + ' 0" stroke="#ffffff" stroke-width="1.8" fill="none" opacity=".55" stroke-linecap="round"/>';
  }
  // drip over the cone rim
  art += '<path d="M26 ' + (coneTop - 1) + ' q1 4 2.6 4 q1.6 0 1.6 -3.4" fill="' + cols[0] + '" stroke="none" opacity=".95"/>';
  return art + "</svg>";
}

function fruitSVG(color, name) {
  const leaf = '<path d="M32 13 Q36 5 42 8 Q38 15 32 13Z" fill="#6faf4e"/>';
  if (name === "Grape") {
    let g = '<svg viewBox="0 0 64 64">' + leaf;
    const pts = [[32, 20], [25, 27], [39, 27], [32, 34], [25, 41], [39, 41], [32, 48]];
    pts.forEach(function (p) { g += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="7.5" fill="' + color + '" stroke="#ffffff" stroke-opacity=".25"/>'; });
    return g + "</svg>";
  }
  return '<svg viewBox="0 0 64 64">' + leaf +
    '<path d="M32 14 Q50 18 48 36 Q46 52 32 54 Q18 52 16 36 Q14 18 32 14Z" fill="' + color + '"/>' +
    '<path d="M25 24 Q20 30 21 38" stroke="#ffffff" stroke-width="2.5" fill="none" opacity=".45" stroke-linecap="round"/>' +
    "</svg>";
}

/* ---------- Option group helpers ---------- */
function fruitFlavorGroup() {
  return { key: "flavor", label: "Choose your flavor", type: "single",
    choices: FRUIT_FLAVORS.map(function (f) { return { label: f[0], price: 0, color: f[1] }; }) };
}
function sizeGroup(m, l) {
  return { key: "size", label: "Choose a size", type: "single",
    choices: [{ label: "Medium", price: m, tag: "M" }, { label: "Large", price: l, tag: "L" }] };
}

/* ---------- Menu data ---------- */
const MENU = {
  drinks: [
    { id: "italian-soda", name: "Italian Soda", desc: "Sparkling, fruity and topped with cream — 11 flavors to pick from.",
      priceFrom: 6, basePrice: 0, art: function (s) { return cupSVG(pick(s, "flavor", "#fc5a8d")); }, artBg: "#fde8ef",
      groups: [fruitFlavorGroup(), sizeGroup(6, 8)] },
    { id: "energy-drink", name: "Flavored Energy Drink", desc: "A fruity boost of energy over ice, in your favorite flavor.",
      priceFrom: 6, basePrice: 0, art: function (s) { return energySVG(pick(s, "flavor", "#9acd32")); }, artBg: "#eef7e2",
      groups: [fruitFlavorGroup(), sizeGroup(6, 8)] },
    { id: "dirty-soda", name: "Dirty Soda", desc: "Your favorite soda base mixed with fruity syrups and cream.",
      priceFrom: 6, basePrice: 0, art: function (s) { return cupSVG(pick(s, "flavor", "#c0392b")); }, artBg: "#fdeee8",
      groups: [
        { key: "base", label: "Choose your base", type: "single",
          choices: SODA_BASES.map(function (b) { return { label: b[0], price: 0, color: b[1] }; }) },
        fruitFlavorGroup(), sizeGroup(6, 8)
      ] },
    { id: "lemonade", name: "Flavored Lemonade", desc: "Fresh-squeezed lemonade shaken with real fruit flavor.",
      priceFrom: 6, basePrice: 0, art: function (s) { return cupSVG(pick(s, "flavor", "#f7d117")); }, artBg: "#fdf7dd",
      groups: [fruitFlavorGroup(), sizeGroup(6, 8)] },
    { id: "fruit-tea", name: "Fruit Tea", desc: "Refreshing iced tea infused with your choice of fruit.",
      priceFrom: 6, basePrice: 0, art: function (s) { return cupSVG(pick(s, "flavor", "#ffb300")); }, artBg: "#fdf1dd",
      groups: [fruitFlavorGroup(), sizeGroup(6, 8)] },
    { id: "milkshake", name: "Milkshake", desc: "Thick, creamy and blended to order. Topped with whipped cream.",
      priceFrom: 8, basePrice: 0, art: function (s) { return shakeSVG(pick(s, "flavor", "#7b3f00")); }, artBg: "#f3e9df",
      groups: [
        { key: "flavor", label: "Choose your flavor", type: "single",
          choices: SHAKE_FLAVORS.map(function (f) { return { label: f[0], price: 0, color: f[1] }; }) },
        sizeGroup(8, 11)
      ] },
    { id: "rootbeer-float", name: "Root Beer Float", desc: "Classic root beer with a scoop of creamy vanilla ice cream.",
      priceFrom: 6, basePrice: 0, art: function () { return floatSVG(); }, artBg: "#f3e9df",
      groups: [sizeGroup(6, 8)] }
  ],
  waffles: [
    { id: "bubble-waffle", name: "Build Your Bubble Waffle", desc: "Crispy Hong Kong–style waffle, your ice cream, your toppings.",
      priceFrom: 9, basePrice: 4,
      art: function (s) { return waffleSVG(pickColors(s, "scoop-flavors", WAFFLE_ICECREAM)); }, artBg: "#fbeed7",
      groups: [
        { key: "base", label: "Step 1 · Choose your base", type: "single",
          choices: [{ label: "Original", price: 0, color: "#e0a35c" }, { label: "Chocolate", price: 0, color: "#6b3e26" }] },
        { key: "scoops", label: "Step 2 · How many scoops?", type: "single",
          choices: [{ label: "1 Scoop", price: 5, count: 1 }, { label: "2 Scoops", price: 7, count: 2 }] },
        { key: "scoop-flavors", label: "Pick your ice cream", type: "multi", maxFrom: "scoops", min: 1,
          choices: WAFFLE_ICECREAM.map(function (f) { return { label: f[0], price: 0, color: f[1] }; }) },
        { key: "toppings", label: "Step 3 · Add toppings", type: "multi", hint: "$1 each",
          choices: WAFFLE_TOPPINGS.map(function (t) { return { label: t, price: 1 }; }) }
      ] },
    { id: "dubai-choc", name: "Dubai Chocolate Strawberry", desc: "Fresh strawberries, pistachio kunafa crunch and rich chocolate. Our viral signature cup.",
      priceFrom: 17, basePrice: 17, badge: "Signature",
      art: function () { return dubaiSVG(); }, artBg: "#efe4d8", groups: [] }
  ],
  icecream: [
    { id: "scoop-icecream", name: "Hand-Scooped Ice Cream", desc: "18 house flavors, served in a cup or a crispy cone.",
      priceFrom: 7, basePrice: 0,
      art: function (s) { return coneSVG(pickColors(s, "flavors", ICECREAM_FLAVORS)); }, artBg: "#e4f2fb",
      groups: [
        { key: "vessel", label: "Cup or cone?", type: "single",
          choices: [{ label: "Cup", price: 0 }, { label: "Cone", price: 0 }] },
        { key: "scoops", label: "How many scoops?", type: "single",
          choices: [{ label: "1 Scoop", price: 7, count: 1 }, { label: "2 Scoops", price: 9, count: 2 }, { label: "3 Scoops", price: 11, count: 3 }] },
        { key: "flavors", label: "Choose your flavors", type: "multi", maxFrom: "scoops", min: 1,
          choices: ICECREAM_FLAVORS.map(function (f) { return { label: f[0], price: 0, color: f[1] }; }) },
        { key: "toppings", label: "Add toppings", type: "multi", hint: "$1 each",
          choices: ICECREAM_TOPPINGS.map(function (t) { return { label: t, price: 1 }; }) }
      ] }
  ]
};

/* Viral shape ice creams — one card each */
VIRAL_FRUITS.forEach(function (f) {
  MENU.icecream.push({
    id: "viral-" + f[0].toLowerCase(), name: f[0] + " Viral Ice Cream",
    desc: "The famous fruit-shaped ice cream — looks like a " + f[0].toLowerCase() + ", tastes amazing.",
    priceFrom: 8, basePrice: 8, badge: "Viral",
    art: function () { return fruitSVG(f[1], f[0]); }, artBg: "#eef6ff", groups: []
  });
});

const ALL_ITEMS = [].concat(MENU.drinks, MENU.waffles, MENU.icecream);

/* ---------- Helpers ---------- */
function $(id) { return document.getElementById(id); }
function money(n) { return "$" + (Math.round(n * 100) / 100).toFixed(2).replace(/\.00$/, ""); }

function pick(sel, key, fallback) {
  if (sel && sel[key] && sel[key].length) { return sel[key][0].color || fallback; }
  return fallback;
}
function pickColors(sel, key, palette) {
  if (sel && sel[key] && sel[key].length) {
    return sel[key].map(function (c) { return c.color; });
  }
  return [palette[0][1]];
}

/* ---------- Render menu ---------- */
let activeTab = "drinks";

/* Real photos live in images/ — cards fall back to the illustration
   automatically if a photo file is missing. */
const ITEM_PHOTOS = {
  "italian-soda": "images/italian-soda.jpg",
  "energy-drink": "images/energy-drink.jpg",
  "fruit-tea": "images/fruit-tea.jpg",
  "milkshake": "images/milkshake.jpg",
  "rootbeer-float": "images/rootbeer-float.jpg"
};

function itemVisual(item) {
  const photo = ITEM_PHOTOS[item.id];
  if (!photo) {
    return '<div class="item-art" style="background:' + item.artBg + '">' + item.art(null) + "</div>";
  }
  return '<div class="item-photo" data-item="' + item.id + '"><img src="' + photo + '" alt="' + item.name + '"></div>';
}

/* Swap a photo card back to the illustration if its image file is missing */
function wirePhotoFallbacks(root) {
  root.querySelectorAll(".item-photo img").forEach(function (img) {
    img.addEventListener("error", function () {
      const holder = img.parentElement;
      const item = ALL_ITEMS.find(function (i) { return i.id === holder.dataset.item; });
      if (!item) { return; }
      const art = document.createElement("div");
      art.className = "item-art";
      art.style.background = item.artBg;
      art.innerHTML = item.art(null);
      holder.replaceWith(art);
    });
  });
}

function itemCard(item) {
  const card = document.createElement("div");
  card.className = "menu-card";
  card.innerHTML =
    itemVisual(item) +
    "<h3>" + item.name + "</h3>" +
    '<p class="desc">' + item.desc + "</p>" +
    '<div class="price-row"><span class="price">' +
    (item.groups.length ? "from " : "") + money(item.priceFrom) +
    '</span><button class="add-btn" data-id="' + item.id + '">' +
    (item.groups.length ? "Customize" : "Add") + "</button></div>";
  return card;
}

function renderMenu() {
  const grid = $("menuGrid");
  grid.innerHTML = "";
  MENU[activeTab].forEach(function (item) { grid.appendChild(itemCard(item)); });
  wirePhotoFallbacks(grid);
}

function renderFavorites() {
  const favIds = ["dubai-choc", "bubble-waffle", "milkshake"];
  const labels = { "dubai-choc": "Signature", "bubble-waffle": "Best Seller", "milkshake": "Crowd Pleaser" };
  const grid = $("favGrid");
  favIds.forEach(function (id) {
    const item = ALL_ITEMS.find(function (i) { return i.id === id; });
    const card = document.createElement("div");
    card.className = "fav-card";
    card.innerHTML =
      '<span class="fav-badge">' + labels[id] + "</span>" +
      itemVisual(item) +
      "<h3>" + item.name + "</h3>" +
      "<p>" + item.desc + "</p>" +
      '<button class="add-btn" data-id="' + item.id + '">' +
      (item.groups.length ? "Customize · " : "Add · ") + (item.groups.length ? "from " : "") + money(item.priceFrom) + "</button>";
    grid.appendChild(card);
  });
  wirePhotoFallbacks(grid);
}

/* ---------- Google reviews ---------- */
/* The shop's Google listing is brand new and has no reviews yet.
   When reviews come in, paste them here and they will render automatically:
   { name: "Jane D.", rating: 5, text: "Best bubble waffle in the Gorge!", date: "July 2026" } */
const GOOGLE_REVIEWS = [];

const GOOGLE_MAPS_URL = "https://maps.google.com/?cid=8795033230289559132";

function renderReviews() {
  const grid = $("reviewGrid");
  if (!GOOGLE_REVIEWS.length) {
    grid.innerHTML =
      '<div class="review-card empty-reviews">' +
      '<div class="review-stars">☆☆☆☆☆</div>' +
      "<p>We just opened our Google page — your review could be the very first one! " +
      "Tell the world about your favorite treat and help other dessert lovers find us.</p>" +
      '<a class="text-link" href="' + GOOGLE_MAPS_URL + '" target="_blank" rel="noopener">Write the first review →</a></div>';
    return;
  }
  grid.innerHTML = "";
  GOOGLE_REVIEWS.forEach(function (r) {
    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML =
      '<div class="review-stars">' + "★".repeat(r.rating) + "☆".repeat(5 - r.rating) + "</div>" +
      "<p>“" + r.text + "”</p>" +
      '<div class="review-meta"><strong>' + r.name + "</strong>" + (r.date ? " · " + r.date : "") + "</div>";
    grid.appendChild(card);
  });
}

/* ---------- Item modal ---------- */
let currentItem = null;
let currentSel = {};   // groupKey -> array of selected choice objects
let currentQty = 1;

function groupMax(group) {
  if (!group.maxFrom) { return group.type === "single" ? 1 : Infinity; }
  const src = currentSel[group.maxFrom];
  if (src && src.length && src[0].count) { return src[0].count; }
  return 1;
}

function openItem(id) {
  const item = ALL_ITEMS.find(function (i) { return i.id === id; });
  if (!item) { return; }
  currentItem = item;
  currentQty = 1;
  currentSel = {};
  // preselect defaults: first choice of every single group, first choice of required multi groups
  item.groups.forEach(function (g) {
    if (g.type === "single") { currentSel[g.key] = [g.choices[0]]; }
    else if (g.min) { currentSel[g.key] = [g.choices[0]]; }
    else { currentSel[g.key] = []; }
  });
  renderModal();
  $("itemModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function renderModal() {
  const item = currentItem;
  let html =
    '<div class="modal-item-head">' +
    '<div class="item-art" style="background:' + item.artBg + '">' + item.art(currentSel) + "</div>" +
    "<div><h3>" + item.name + '</h3><p class="desc">' + item.desc + "</p></div></div>";

  item.groups.forEach(function (g) {
    const max = groupMax(g);
    let hint = g.hint || "";
    if (g.maxFrom) { hint = "pick up to " + max + (hint ? " · " + hint : ""); }
    html += '<div class="opt-group"><div class="opt-group-label">' + g.label +
      (hint ? '<span class="hint">' + hint + "</span>" : "") + '</div><div class="chip-row">';
    g.choices.forEach(function (c, idx) {
      const selected = (currentSel[g.key] || []).indexOf(c) !== -1;
      html += '<button type="button" class="chip' + (selected ? " selected" : "") + '" data-group="' + g.key + '" data-idx="' + idx + '">' +
        (c.color ? '<span class="swatch" style="background:' + c.color + '"></span>' : "") +
        c.label +
        (c.price ? ' <span class="chip-price">+' + money(c.price) + "</span>" : "") +
        "</button>";
    });
    html += "</div></div>";
  });

  $("modalBody").innerHTML = html;
  $("qtyVal").textContent = currentQty;
  updateModalPrice();
}

function unitPrice() {
  let total = currentItem.basePrice;
  currentItem.groups.forEach(function (g) {
    (currentSel[g.key] || []).forEach(function (c) { total += c.price || 0; });
  });
  return total;
}

function updateModalPrice() {
  $("modalPrice").textContent = money(unitPrice() * currentQty);
}

function onChipClick(groupKey, idx) {
  const group = currentItem.groups.find(function (g) { return g.key === groupKey; });
  const choice = group.choices[idx];
  let sel = currentSel[groupKey] || [];

  if (group.type === "single") {
    currentSel[groupKey] = [choice];
    // if a scoops-style group changed, trim any dependent multi groups
    currentItem.groups.forEach(function (g) {
      if (g.maxFrom === groupKey) {
        const max = groupMax(g);
        currentSel[g.key] = (currentSel[g.key] || []).slice(0, max);
        if (g.min && currentSel[g.key].length === 0) { currentSel[g.key] = [g.choices[0]]; }
      }
    });
  } else {
    const pos = sel.indexOf(choice);
    if (pos !== -1) {
      if (g_minOk(group, sel.length - 1)) { sel.splice(pos, 1); }
    } else {
      const max = groupMax(group);
      if (sel.length >= max) {
        if (max === 1) { sel = [choice]; }
        else { toast("You can pick up to " + max); currentSel[groupKey] = sel; renderModal(); return; }
      } else {
        sel.push(choice);
      }
    }
    currentSel[groupKey] = sel;
  }
  renderModal();
}

function g_minOk(group, newLen) {
  return !(group.min && newLen < group.min);
}

/* ---------- Cart ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem("sweetbar_cart") || "[]"); } catch (e) { cart = []; }

function saveCart() { localStorage.setItem("sweetbar_cart", JSON.stringify(cart)); }

function cartTotal() {
  return cart.reduce(function (s, it) { return s + it.unitPrice * it.qty; }, 0);
}
function cartCount() {
  return cart.reduce(function (s, it) { return s + it.qty; }, 0);
}

function addCurrentToCart() {
  // validate required multi groups
  for (let i = 0; i < currentItem.groups.length; i++) {
    const g = currentItem.groups[i];
    if (g.min && (currentSel[g.key] || []).length < g.min) {
      toast("Please pick at least " + g.min + " for “" + g.label + "”");
      return;
    }
  }
  const details = [];
  currentItem.groups.forEach(function (g) {
    const sel = currentSel[g.key] || [];
    if (sel.length) {
      details.push(sel.map(function (c) { return c.label; }).join(", "));
    }
  });
  const key = currentItem.id + "|" + details.join("|");
  const existing = cart.find(function (it) { return it.key === key; });
  if (existing) { existing.qty += currentQty; }
  else {
    cart.push({
      key: key, id: currentItem.id, name: currentItem.name,
      details: details, unitPrice: unitPrice(), qty: currentQty,
      art: currentItem.art(currentSel), artBg: currentItem.artBg
    });
  }
  saveCart();
  updateCartUI();
  closeItemModal();
  toast("Added to cart 🍦");
  $("cartBtn").classList.remove("bump");
  void $("cartBtn").offsetWidth;
  $("cartBtn").classList.add("bump");
}

function updateCartUI() {
  $("cartCount").textContent = cartCount();
  const box = $("cartItems");
  if (!cart.length) {
    box.innerHTML = '<div class="cart-empty"><div class="big">🛒</div><p>Your cart is empty.<br>Go treat yourself!</p></div>';
    $("checkoutBtn").disabled = true;
  } else {
    box.innerHTML = "";
    cart.forEach(function (it, i) {
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML =
        '<div class="cart-item-art" style="background:' + it.artBg + '">' + it.art + "</div>" +
        '<div class="cart-item-info"><h4>' + it.name + "</h4>" +
        '<div class="details">' + it.details.join(" · ") + "</div>" +
        '<button class="remove-link" data-i="' + i + '">Remove</button></div>' +
        '<div class="cart-item-side"><span class="price">' + money(it.unitPrice * it.qty) + "</span>" +
        '<div class="mini-qty"><button data-i="' + i + '" data-d="-1">−</button><span>' + it.qty +
        '</span><button data-i="' + i + '" data-d="1">+</button></div></div>';
      box.appendChild(row);
    });
    $("checkoutBtn").disabled = false;
  }
  $("cartTotal").textContent = money(cartTotal());
}

function changeQty(i, d) {
  cart[i].qty += d;
  if (cart[i].qty <= 0) { cart.splice(i, 1); }
  saveCart();
  updateCartUI();
}

/* ---------- Drawer / modal open-close ---------- */
function openCart() {
  $("cartDrawer").classList.add("open");
  $("overlay").classList.add("show");
}
function closeCart() {
  $("cartDrawer").classList.remove("open");
  $("overlay").classList.remove("show");
}
function closeItemModal() {
  $("itemModal").classList.remove("open");
  document.body.style.overflow = "";
}

/* ---------- Checkout ---------- */
/* Stripe: once the site is deployed, set this to the serverless endpoint —
   "/api/create-checkout" on Vercel, or "/.netlify/functions/create-checkout"
   on Netlify (see STRIPE-SETUP.md). While empty, online card payment stays disabled. */
const STRIPE_ENDPOINT = "";

function openCheckout() {
  closeCart();
  const body = $("checkoutBody");
  let rows = "";
  cart.forEach(function (it) {
    rows += '<div class="row"><span>' + it.qty + " × " + it.name + "</span><span>" + money(it.unitPrice * it.qty) + "</span></div>";
  });
  const stripeReady = !!STRIPE_ENDPOINT;
  body.innerHTML =
    '<form class="checkout-form" id="checkoutForm">' +
    "<h3>Pickup details</h3>" +
    '<p class="sub">Pay securely by card — we\'ll have your order ready for pickup at 151 SW 257th Dr, Troutdale.</p>' +
    '<div class="order-summary">' + rows +
    '<div class="row total"><span>Total</span><span>' + money(cartTotal()) + "</span></div></div>" +
    '<div class="form-field"><label for="cName">Your name</label><input id="cName" required placeholder="e.g. Alex"></div>' +
    '<div class="form-field"><label for="cPhone">Phone number</label><input id="cPhone" type="tel" required placeholder="(503) 555-0123"></div>' +
    '<div class="form-field"><label for="cTime">Pickup time</label><select id="cTime">' +
    '<option>As soon as possible</option><option>In 30 minutes</option><option>In 1 hour</option><option>In 2 hours</option></select></div>' +
    '<div class="form-field"><label for="cNotes">Notes (optional)</label><textarea id="cNotes" rows="2" placeholder="Allergies, special requests…"></textarea></div>' +
    (stripeReady ? "" :
      '<div class="checkout-notice">⚠️ Online payment isn\'t activated yet — orders can\'t be placed until Stripe setup is complete (see STRIPE-SETUP.md).</div>') +
    '<button type="submit" class="btn btn-primary btn-full" id="placeOrderBtn"' + (stripeReady ? "" : " disabled") + ">💳 Pay " + money(cartTotal()) + " with card</button>" +
    '<p class="muted small pay-note">Secure checkout powered by Stripe.</p>' +
    "</form>";
  $("checkoutModal").classList.add("open");
  document.body.style.overflow = "hidden";
  $("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();
    startStripeCheckout();
  });
}

function startStripeCheckout() {
  const btn = $("placeOrderBtn");
  btn.disabled = true;
  btn.textContent = "Redirecting to secure payment…";
  fetch(STRIPE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: cart.map(function (it) {
        return { name: it.name, details: it.details.join(" · "), unitPrice: it.unitPrice, qty: it.qty };
      }),
      customer: {
        name: $("cName").value.trim(),
        phone: $("cPhone").value.trim(),
        pickupTime: $("cTime").value,
        notes: $("cNotes").value.trim()
      }
    })
  }).then(function (r) { return r.json(); }).then(function (data) {
    if (data && data.url) { window.location.href = data.url; }
    else { throw new Error("no url"); }
  }).catch(function () {
    btn.disabled = false;
    btn.textContent = "Place order";
    toast("Online payment is unavailable right now — try pay at pickup.");
  });
}

function showPaymentSuccess() {
  $("checkoutBody").innerHTML =
    '<div class="confirm-box"><div class="big">🎉</div>' +
    "<h3>Payment received — thank you!</h3>" +
    "<p>Your order is confirmed and we're getting it ready.</p>" +
    "<p>Give your name at the counter when you arrive —<br>see you soon at 151 SW 257th Dr!</p>" +
    '<button class="btn btn-primary" id="doneBtn" style="margin-top:14px">Done</button></div>';
  $("checkoutModal").classList.add("open");
  document.body.style.overflow = "hidden";
  $("doneBtn").addEventListener("click", closeCheckout);
}

function closeCheckout() {
  $("checkoutModal").classList.remove("open");
  document.body.style.overflow = "";
}

/* ---------- Toast ---------- */
let toastTimer = null;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2200);
}

/* ---------- Events ---------- */
document.addEventListener("click", function (e) {
  const addBtn = e.target.closest(".add-btn");
  if (addBtn) { openItem(addBtn.dataset.id); return; }

  const chip = e.target.closest(".chip");
  if (chip && chip.dataset.group) { onChipClick(chip.dataset.group, Number(chip.dataset.idx)); return; }

  const qBtn = e.target.closest(".mini-qty button");
  if (qBtn) { changeQty(Number(qBtn.dataset.i), Number(qBtn.dataset.d)); return; }

  const rm = e.target.closest(".remove-link");
  if (rm) { cart.splice(Number(rm.dataset.i), 1); saveCart(); updateCartUI(); return; }

  const tab = e.target.closest(".tab");
  if (tab) {
    document.querySelectorAll(".tab").forEach(function (t) { t.classList.remove("active"); });
    tab.classList.add("active");
    activeTab = tab.dataset.tab;
    renderMenu();
  }
});

$("cartBtn").addEventListener("click", openCart);
$("closeCart").addEventListener("click", closeCart);
$("overlay").addEventListener("click", closeCart);
$("closeModal").addEventListener("click", closeItemModal);
$("closeCheckout").addEventListener("click", closeCheckout);
$("checkoutBtn").addEventListener("click", openCheckout);
$("qtyPlus").addEventListener("click", function () { currentQty++; $("qtyVal").textContent = currentQty; updateModalPrice(); });
$("qtyMinus").addEventListener("click", function () { if (currentQty > 1) { currentQty--; $("qtyVal").textContent = currentQty; updateModalPrice(); } });
$("addToCartBtn").addEventListener("click", addCurrentToCart);
$("itemModal").addEventListener("click", function (e) { if (e.target === this) { closeItemModal(); } });
$("checkoutModal").addEventListener("click", function (e) { if (e.target === this) { closeCheckout(); } });
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") { closeItemModal(); closeCheckout(); closeCart(); }
});

/* ---------- Init ---------- */
renderFavorites();
renderMenu();
renderReviews();
updateCartUI();

/* Returning from Stripe checkout */
(function () {
  const params = new URLSearchParams(window.location.search);
  if (params.get("order") === "success") {
    cart = [];
    saveCart();
    updateCartUI();
    showPaymentSuccess();
    history.replaceState(null, "", window.location.pathname);
  } else if (params.get("order") === "cancelled") {
    toast("Payment cancelled — your cart is still saved.");
    history.replaceState(null, "", window.location.pathname);
  }
})();

/* Mobile nav */
$("navToggle").addEventListener("click", function () {
  const open = $("siteNav").classList.toggle("open");
  this.setAttribute("aria-expanded", open ? "true" : "false");
});
document.querySelectorAll("#siteNav a").forEach(function (a) {
  a.addEventListener("click", function () {
    $("siteNav").classList.remove("open");
    $("navToggle").setAttribute("aria-expanded", "false");
  });
});

/* PWA service worker (enables offline use and future app-store packaging) */
if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("sw.js").catch(function () { /* non-fatal */ });
}
