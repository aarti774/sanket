
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

export const downloadCertificateAsPDF = async (
  certificateElement: HTMLDivElement,
  fileName: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  if (!certificateElement) {
    toast.error("Certificate element not found");
    return;
  }

  try {
    setIsLoading(true);
    toast.info("Generating certificate...", { duration: 3000 });
    
    // Clone the element for rendering to avoid affecting the UI
    const clonedElement = certificateElement.cloneNode(true) as HTMLDivElement;
    document.body.appendChild(clonedElement);
    
    // Style for optimal rendering
    clonedElement.style.display = "block";
    clonedElement.style.position = "fixed";
    clonedElement.style.top = "0";
    clonedElement.style.left = "0";
    clonedElement.style.zIndex = "-9999";
    clonedElement.style.width = "800px";
    clonedElement.style.height = "600px";
    
    // Minimal delay - just enough for the DOM to update
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Use minimal settings for fastest rendering
    const canvas = await html2canvas(clonedElement, {
      scale: 1.2, // Lower scale for faster rendering
      logging: false, 
      useCORS: true,
      backgroundColor: "#ffffff",
      allowTaint: true,
      foreignObjectRendering: false,
      imageTimeout: 5000, // Lower timeout
      removeContainer: true, // Cleanup automatically
    });
    
    // Remove the cloned element from DOM
    document.body.removeChild(clonedElement);
    
    // Use lowest quality JPEG for fastest processing
    const imgData = canvas.toDataURL('image/jpeg', 0.7);
    
    // Create PDF with optimized settings
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true // Enable compression
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    
    // Use a more efficient save method
    pdf.save(fileName);
    
    toast.success("Certificate downloaded successfully");
  } catch (error) {
    toast.error("Failed to download certificate");
    console.error("Certificate download error:", error);
  } finally {
    setIsLoading(false);
  }
};
