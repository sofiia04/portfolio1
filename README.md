# Sofiia Vorona — Portfolio

## 📁 Project Structure

```
portfolio/
├── index.html          ← Main page (don't need to edit this)
├── works.json          ← ★ THE ONLY FILE YOU EDIT TO ADD WORKS ★
├── css/
│   └── style.css       ← All styles (BEM, pure CSS, mobile-first)
├── js/
│   └── gallery.js      ← Gallery engine (vanilla JS, no frameworks)
└── README.md
```

---

## ✅ How to Add a New Work

**You only need to edit `works.json`.**

### Step 1 — Get the Google Drive file ID

Open your file in Google Drive → Share → "Anyone with the link" → copy the URL.

The URL looks like:
```
https://drive.google.com/file/d/1abc123XYZ.../view
```
Your ID is the part between `/d/` and `/view`:
```
1abc123XYZ...
```

### Step 2 — Add one line to `works.json`

Open `works.json`, find the right category, and add a line:

```json
{ "id": "YOUR_GOOGLE_DRIVE_ID" }
```

#### With a title:
```json
{ "id": "YOUR_GOOGLE_DRIVE_ID", "title": "My Artwork Title" }
```

#### For a video:
```json
{ "id": "YOUR_GOOGLE_DRIVE_ID", "type": "video" }
```

#### For a video with title:
```json
{ "id": "YOUR_GOOGLE_DRIVE_ID", "type": "video", "title": "My Animation" }
```

### Example — adding a drawing to "rysunek":

```json
{
  "id": "rysunek",
  "label": { "pl": "Rysunek", "en": "Drawing" },
  "icon": "✦",
  "works": [
    { "id": "1bQBThmmv8gQuy73_Z9nl99g0a2FIkmd-" },
    { "id": "YOUR_NEW_FILE_ID_HERE" },     ← just add this line
    ...
  ]
}
```

**That's it. No coding needed.**

---

## 📂 Available Categories

| ID          | Polish      | English    |
|-------------|-------------|------------|
| `3d`        | 3D          | 3D         |
| `digital`   | Digital     | Digital    |
| `malarstwo` | Malarstwo   | Painting   |
| `rysunek`   | Rysunek     | Drawing    |
| `animacja`  | Animacja    | Animation  |
| `logo`      | Logo        | Logo       |
| `plakat`    | Plakat      | Poster     |
| `linoryt`   | Linoryt     | Linocut    |
| `rzezba`    | Rzeźba      | Sculpture  |
| `inne`      | Inne        | Other      |

---

## ➕ How to Add a New Category

In `works.json`, add a new object to the `categories` array:

```json
{
  "id":    "fotografia",
  "label": { "pl": "Fotografia", "en": "Photography" },
  "icon":  "◎",
  "works": [
    { "id": "YOUR_FILE_ID_1" },
    { "id": "YOUR_FILE_ID_2" }
  ]
}
```

The category will automatically appear in the nav filter and showcase.

---

## 🖼 Media Types Supported

| Type    | JSON value       | How it displays                  |
|---------|------------------|----------------------------------|
| Image   | `"type": "image"` (default) | Shown as `<img>`, lightbox on click |
| Video   | `"type": "video"` | Thumbnail + play badge, iframe in lightbox |

---

## 🌍 Languages

The site supports Polish (`pl`) and English (`en`). Static text is stored in `js/gallery.js` in the `STRINGS` object. Category labels are stored in `works.json` under each category's `"label"` field.

---

## 🚀 Deployment (GitHub Pages)

1. Push all files to your GitHub repo
2. Go to **Settings → Pages**
3. Source: `main` branch, root `/`
4. Your site is live at `https://yourusername.github.io/portfolio/`

**Important:** `works.json` must be in the **root** of the site (same folder as `index.html`).

---

## 🔧 Technical Notes

- **No frameworks** — pure HTML, CSS, JS
- **BEM naming** — `.gallery-item__img`, `.service-card__body`, etc.
- **Mobile-first** — breakpoints at 560px, 768px, 900px, 1200px
- **Lazy loading** — all images use `loading="lazy"`
- **Accessible** — semantic HTML, ARIA labels, keyboard navigation in lightbox
- **Custom cursor** — only on pointer devices (`pointer: fine`)
- **Prefers-reduced-motion** — all animations disabled if OS setting is on
