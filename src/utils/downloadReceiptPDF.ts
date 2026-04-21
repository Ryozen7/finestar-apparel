import jsPDF from "jspdf";

export function downloadReceiptPDF({
  date,
  subtotal,
  discount,
  finalTotal,
  items,
}: {
  date: string;
  subtotal: number;
  discount: number;
  finalTotal: number;
  items: Array<{
    name: string;
    size: string;
    color: string;
    price: number;
    quantity: number;
  }>;
}) {
  const doc = new jsPDF();
  let y = 10;
  doc.setFontSize(18);
  doc.text("Order Receipt", 10, y);
  y += 10;
  doc.setFontSize(12);
  doc.text(`Date: ${date}`, 10, y);
  y += 8;
  doc.text(`Total: $${subtotal.toFixed(2)}`, 10, y);
  y += 8;
  doc.text(`Discount: -$${discount.toFixed(2)}`, 10, y);
  y += 8;
  doc.text(`Final Total: $${finalTotal.toFixed(2)}`, 10, y);
  y += 12;
  doc.text("Items:", 10, y);
  y += 8;
  items.forEach((item, idx) => {
    doc.text(
      `${idx + 1}. ${item.name} (Size: ${item.size}, Color: ${item.color}) - $${item.price} x ${item.quantity}`,
      10,
      y,
    );
    y += 7;
  });
  doc.save("receipt.pdf");
}
