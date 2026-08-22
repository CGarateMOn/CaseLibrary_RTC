// Full Case Library directory — hand-maintained, not part of the Sheets
// sync. Real Google Drive folder links.
const UNIVERSITIES = [
  {
    id: "uni-berkeley",
    name: "Berkeley Casebooks",
    url: "https://drive.google.com/drive/folders/1V6shFZyxzF2zBtEIlRJSNZsYQlcxsgNs?usp=share_link",
    note: "Carpeta completa con casebooks, PDFs individuales y otros materiales."
  },
  {
    id: "uni-columbia",
    name: "Columbia Casebooks",
    url: "https://drive.google.com/drive/folders/1uem2iQ5YoB0knHwBq852EYDU2cNmZ2aP?usp=share_link",
    note: "Carpeta completa con casebooks, PDFs individuales y otros materiales."
  },
  {
    id: "uni-cornell",
    name: "Cornell Casebooks",
    url: "https://drive.google.com/drive/folders/1yqSle9rXE8gx6FG0k_riT55K6GgaY3XT?usp=share_link",
    note: "Carpeta completa con casebooks, PDFs individuales y otros materiales."
  },
  {
    id: "uni-darden",
    name: "Darden Casebooks",
    url: "https://drive.google.com/drive/folders/1ZqjNGhEmnORmOAO2RejAJ3oKPCttU4In?usp=share_link",
    note: "Carpeta completa con casebooks, PDFs individuales y otros materiales."
  },
  {
    id: "uni-dartmouth",
    name: "Dartmouth Casebooks",
    url: "https://drive.google.com/drive/folders/1MxdnU-T52XM6w71kwnJf9fiYQ2YF6AVu?usp=share_link",
    note: "Carpeta completa con casebooks, PDFs individuales y otros materiales."
  },
  {
    id: "uni-deloitte",
    name: "Deloitte Case",
    url: "https://drive.google.com/drive/folders/12TdNxWjaoZYJPz-AhIrfPhkTcan0EOhI?usp=share_link",
    note: "Carpeta completa con casebooks, PDFs individuales y otros materiales."
  },
  {
    id: "uni-duke-fuqua",
    name: "Duke Fuqua Casebooks",
    url: "https://drive.google.com/drive/folders/1yX8hCTJK__0NJuXlXNBwhWAVG3GNz-Ys?usp=share_link",
    note: "Carpeta completa con casebooks, PDFs individuales y otros materiales."
  },
  {
    id: "uni-harvard",
    name: "Harvard Casebooks",
    url: "https://drive.google.com/drive/folders/1fCu6FDoKoNAvcxX4GpW__QiNnkiJYnIC?usp=share_link",
    note: "Carpeta completa con casebooks, PDFs individuales y otros materiales."
  },
  {
    id: "uni-kellogg",
    name: "Kellogg Casebooks",
    url: "https://drive.google.com/drive/folders/1iS9XR9NVWa_JH9xwCflu0EjjzG0a1r1g?usp=share_link",
    note: "Carpeta completa con casebooks, PDFs individuales y otros materiales."
  },
  {
    id: "uni-lbs",
    name: "LBS Casebooks",
    url: "https://drive.google.com/drive/folders/1sk5UpWr2ZjZ0Y75LXElHjNfqAYbxWQJH?usp=share_link",
    note: "Carpeta completa con casebooks, PDFs individuales y otros materiales."
  },
  {
    id: "uni-mccombs",
    name: "McCombs Casebooks",
    url: "https://drive.google.com/drive/folders/1eOK3XELw5mPCaUJmMxZkcdP00ZKSqGVT?usp=share_link",
    note: "Carpeta completa con casebooks, PDFs individuales y otros materiales."
  },
  {
    id: "uni-michigan",
    name: "Michigan Casebooks",
    url: "https://drive.google.com/drive/folders/1T9VRwUy8rgqLsAIn-W1qeFh_audOdu-k?usp=share_link",
    note: "Carpeta completa con casebooks, PDFs individuales y otros materiales."
  },
  {
    id: "uni-mit",
    name: "MIT Casebooks",
    url: "https://drive.google.com/drive/folders/1E0_dmAvsl-f7bJMj1aCA40o1oRF-6gdZ?usp=share_link",
    note: "Carpeta completa con casebooks, PDFs individuales y otros materiales."
  },
  {
    id: "uni-nyu-stern",
    name: "NYU Stern Casebooks",
    url: "https://drive.google.com/drive/folders/1bGJxp8FRAddRWbGNZ05iIEIFItmBHHyo?usp=share_link",
    note: "Carpeta completa con casebooks, PDFs individuales y otros materiales."
  },
  {
    id: "uni-stanford",
    name: "Stanford Casebooks",
    url: "https://drive.google.com/drive/folders/1WwEZWA-YBJ-LoKu3EFW2qMGIIt2muw8g?usp=share_link",
    note: "Carpeta completa con casebooks, PDFs individuales y otros materiales."
  },
  {
    id: "uni-ut-austin-mccombs",
    name: "UT Austin McCombs",
    url: "https://drive.google.com/drive/folders/1knrydrrH8lQIDpciRMC2TWp5iZPmE2q5?usp=share_link",
    note: "Carpeta completa con casebooks, PDFs individuales y otros materiales."
  },
  {
    id: "uni-wharton",
    name: "Wharton Casebooks",
    url: "https://drive.google.com/drive/folders/1lKWcmbq6Azqvd4qQ4vwKzdiXrGmN-EP6?usp=share_link",
    note: "Carpeta completa con casebooks, PDFs individuales y otros materiales."
  }
];

function getUniversities() {
  return Promise.resolve(UNIVERSITIES);
}
