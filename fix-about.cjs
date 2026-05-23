const fs = require("fs");
let content = fs.readFileSync("src/content/home.ts", "utf8");
const idx = content.indexOf("export const aboutContent");
if (idx === -1) { console.log("Not found"); process.exit(1); }
const newAbout = `export const aboutContent: AboutContent = {
  heading: ["I'm Shahzaib Mirza,", "a PK-based Developer"],
  columnTwo: [
    "I'm a full-stack web developer",
    "who builds scalable architecture,",
    "sharp interfaces, and AI-powered features.",
  ],
  columnThree: [
    "I work with founders and businesses",
    "to build fast, reliable web systems",
    "that grow with them.",
  ],
  bottomText: ["Let me help with a great visual", "solution for your business."],
  primaryImage: "",
  secondaryImage: "",
};
`;
content = content.substring(0, idx) + newAbout;
fs.writeFileSync("src/content/home.ts", content);
console.log("Done");
