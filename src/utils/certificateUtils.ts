
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
    
    // Make certificate visible temporarily for capture with less overhead
    certificateElement.style.display = "block";
    certificateElement.style.position = "fixed";
    certificateElement.style.top = "0";
    certificateElement.style.left = "0";
    certificateElement.style.zIndex = "-1000";
    
    // Reduced delay for faster execution
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const canvas = await html2canvas(certificateElement, {
      scale: 1.5, // Reduced scale for faster rendering
      logging: false, // Disable logging for better performance
      useCORS: true,
      backgroundColor: "#ffffff",
      allowTaint: true,
      foreignObjectRendering: false,
    });
    
    // Hide the certificate element again
    certificateElement.style.display = "none";
    certificateElement.style.position = "";
    certificateElement.style.zIndex = "";
    
    // Use lower quality JPEG for faster processing
    const imgData = canvas.toDataURL('image/jpeg', 0.8);
    
    // Create PDF with appropriate dimensions
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(fileName);
    
    toast.success("Certificate downloaded successfully");
  } catch (error) {
    toast.error("Failed to download certificate");
    console.error("Certificate download error:", error);
  } finally {
    setIsLoading(false);
  }
};
