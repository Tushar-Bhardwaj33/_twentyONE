import { marked } from "marked";
import html2pdf from "html2pdf.js";
import { CopyIcon } from "./CopyButton";
import { DownloadIcon } from "./DownloadButton";

const pdfStyle: string = `<style>
        body {
          font-family: Arial, sans-serif;
          font-size: 14px;
          line-height: 1.7;
          color: #111827;
          padding: 20px;
          margin: 0;
        }
        h1 {
          font-size: 24px;
          font-weight: bold;
          margin-top: 30px;
          margin-bottom: 15px;
        }
        h2 {
          font-size: 20px;
          font-weight: bold;
          margin-top: 25px;
          margin-bottom: 10px;
        }
        h3 {
          font-size: 18px;
          font-weight: bold;
          margin-top: 20px;
          margin-bottom: 8px;
        }
        p {
          margin: 10px 0;
        }
        ul, ol {
          margin: 10px 0 10px 25px;
          padding-left: 0;
        }
        li {
          margin-bottom: 6px;
        }
        code {
          background-color: #f4f4f4;
          padding: 2px 4px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 13px;
        }
        pre {
          background-color: #f4f4f4;
          padding: 12px;
          border-radius: 6px;
          overflow-x: auto;
          margin: 15px 0;
          font-family: 'Courier New', monospace;
          font-size: 13px;
        }
        blockquote {
          margin: 15px 0;
          padding-left: 15px;
          border-left: 4px solid #d1d5db;
          color: #4b5563;
          font-style: italic;
        }
      </style>`
const transcript: string = `# Project Documentation

## ✨ Features

- Easy to write using Markdown
- Converts to styled PDF
- No text overlap
- Proper spacing, bullets, code blocks, and headings

## 🔧 Installation

1. Install dependencies using npm or yarn
2. Write your content in **Markdown**
3. Press "Download PDF"

## 💻 Code Example

\`\`\`ts
const greet = (name: string): string => {
  return \`Hello, \${name}!\`;
};
\`\`\`

## 📌 Notes

> This is a blockquote. Use it for important notes or quotes.

Thanks for using our Markdown to PDF converter!`

function DownloadAndCopyPdf({text} : {text: string}) {
    const downloadPdf = () => {
        const htmlContent = marked.parse(text);

        const element = document.createElement("div");
        element.innerHTML = `${pdfStyle}<div>${htmlContent}</div>`;
        const opt = {
            margin: 10,
            filename: "transcript.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        html2pdf().from(element).set(opt).save();
    };

    const copyToClipboard = (text: string) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Copied to clipboard!");
    };

    return (
        <div className="flex gap-4">
            <DownloadIcon
                onClick={downloadPdf}
                className="text-white"
            />
            <CopyIcon
                onClick={() => copyToClipboard(text)}
                className="text-white"
            />
            
        </div>
    );
};

export default DownloadAndCopyPdf;
