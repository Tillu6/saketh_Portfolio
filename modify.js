// modify.js — apply Saketh's details across the project safely
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const exts = new Set([".js", ".jsx", ".ts", ".tsx", ".html", ".md", ".json"]);

const replacements = [
  [/hi, i'?m[^\n<]+/gi, "Hi, I'm Saketh
  [/cyber.?security[^\n<]+/gi, "Cyber Security Enthusiast | SOC Analyst | IT Help Desk
  [/https?:\/\/(?:www\.)?linkedin\.com\/[^\s"'<)]+/gi, "https://www.linkedin.com/in/saketh-poreddy-145a7315b/"],
  [/https?:\/\/(?:www\.)?github\.com\/[^\s"'<)]+/gi, "https://github.com/tillu6"],
  [/mailto:psakethreddy97@gmail.com"'<)]+/gi, "mailto:psakethreddy97@gmail.com"],
  [/https?:\/\/(?:www\.)?youtube\.com\/[^\s"'<)]+/gi, "https://www.youtube.com/@SakethReddyPoreddy-c9c"],
  [/\bresume\.pdf\b/gi, "cv.pdf"],
  [/\bcv\.pdf\b/gi, "cv.pdf"],
];


function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      // skip node_modules / build output
      if (name === "node_modules" || name === "dist" || name === "build") continue;
      walk(p);
    } else {
      const ext = path.extname(name).toLowerCase();
      if (!exts.has(ext)) continue;
      let txt = fs.readFileSync(p, "utf8");
      let changed = false;
      for (const [pat, rep] of replacements) {
        const newTxt = txt.replace(pat, rep);
        if (newTxt !== txt) { txt = newTxt; changed = true; }
      }
      if (changed) {
        fs.writeFileSync(p, txt, "utf8");
        console.log("Updated:", path.relative(ROOT, p));
      }
    }
  }
}

function ensureCV() {
  const candidates = ["public", "static", "assets"];
  const pdfBytes = Buffer.from("%PDF-1.4\n% Demo CV placeholder\n", "utf8");
  for (const d of candidates) {
    const dir = path.join(ROOT, d);
    try { fs.mkdirSync(dir, { recursive: true }); } catch {}
    const pdfPath = path.join(dir, "cv.pdf");
    if (!fs.existsSync(pdfPath)) {
      fs.writeFileSync(pdfPath, pdfBytes);
      console.log("Created:", path.relative(ROOT, pdfPath));
    }
  }
}

walk(ROOT);
ensureCV();
console.log("Done.");
