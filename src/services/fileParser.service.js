const mammoth = require("mammoth");

class FileParserService {
  // Extract text from PDF buffer
  static async parsePDF(buffer) {
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    return result.text;
  }

  // Extract text from DOCX buffer
  static async parseDOCX(buffer) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  // Auto-detect and parse from buffer
  static async parseResume(file) {
    const ext = file.originalname.split(".").pop().toLowerCase();
    let text = "";

    if (ext === "pdf") {
      text = await this.parsePDF(file.buffer);
    } else if (ext === "docx") {
      text = await this.parseDOCX(file.buffer);
    } else {
      throw new Error("Unsupported file format");
    }

    if (!text || text.trim().length < 50) {
      throw new Error(
        "Could not extract enough text from the resume. Please upload a valid resume."
      );
    }

    return text.trim();
  }
}

module.exports = FileParserService;
