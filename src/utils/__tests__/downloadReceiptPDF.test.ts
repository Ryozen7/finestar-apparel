import { downloadReceiptPDF } from "../downloadReceiptPDF";
import jsPDF from "jspdf";

// mock jsPDF
jest.mock("jspdf", () => {
  return jest.fn().mockImplementation(() => ({
    setFontSize: jest.fn(),
    text: jest.fn(),
    save: jest.fn(),
  }));
});

describe("downloadReceiptPDF", () => {
  const mockDoc = {
    setFontSize: jest.fn(),
    text: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (jsPDF as unknown as jest.Mock).mockImplementation(() => mockDoc);
  });
  
  it("renders multiple items correctly", () => {
    const data = {
      date: "2026-01-01",
      subtotal: 200,
      discount: 0,
      finalTotal: 200,
      items: [
        {
          name: "Shirt",
          size: "M",
          color: "Red",
          price: 50,
          quantity: 2,
        },
        {
          name: "Pants",
          size: "L",
          color: "Blue",
          price: 100,
          quantity: 1,
        },
      ],
    };

    downloadReceiptPDF(data);

    expect(mockDoc.text).toHaveBeenCalledWith(
      expect.stringContaining("Shirt"),
      10,
      expect.any(Number)
    );

    expect(mockDoc.text).toHaveBeenCalledWith(
      expect.stringContaining("Pants"),
      10,
      expect.any(Number)
    );

    expect(mockDoc.save).toHaveBeenCalled();
  });
});