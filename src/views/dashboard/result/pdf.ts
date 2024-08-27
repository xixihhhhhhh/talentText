import { nextTick } from 'vue';
import html2Canvas from 'html2Canvas';
import JsPDF from 'jspdf';

const a4Width = 595.28; // A4 纸张宽度（单位：pt）
// const a4Height = 841.89; // A4 纸张高度（单位：pt）
const htmlPdf = {
  async getPdf(
    title: string,
    cover: HTMLElement,
    secondPage: HTMLElement,
    thirdPage: HTMLElement,
    page: HTMLElement,
  ) {
    const pdf = new JsPDF('p', 'pt', 'a4'); // 创建一个新的 JsPDF 对象，设置纸张方向为纵向，单位为 pt，纸张大小为 A4
    await nextTick();
    const coverCanvas = await html2Canvas(cover, {
      allowTaint: true, // 允许跨域图像
      useCORS: true, // 使用 CORS 跨域请求
      dpi: window.devicePixelRatio * 4, // 将分辨率提高到特定的DPI 提高四倍
      background: '#FFFFFF', // 设置背景颜色为白色
      willReadFrequently: true, // 设置 willReadFrequently 属性为 true，用于优化性能
    });
    const coverPageData = coverCanvas.toDataURL('image/jpeg', 1.0);
    const coverLeftHeight = coverCanvas.height;
    pdf.addImage(
      coverPageData,
      'JPEG',
      0,
      0,
      a4Width,
      (a4Width / coverCanvas.width) * coverLeftHeight,
    );
    pdf.addPage();
    const secondPageCanvas = await html2Canvas(secondPage, {
      allowTaint: true,
      useCORS: true,
      dpi: window.devicePixelRatio * 4, // 将分辨率提高到特定的DPI 提高四倍
      background: '#FFFFFF', // 设置背景颜色为白色
      willReadFrequently: true, // 设置 willReadFrequently 属性为 true，用于优化性能
    });
    const secondPagePageData = secondPageCanvas.toDataURL('image/jpeg', 1.0);
    const secondPageLeftHeight = secondPageCanvas.height;
    pdf.addImage(
      secondPagePageData,
      'JPEG',
      0,
      0,
      a4Width,
      (a4Width / secondPageCanvas.width) * secondPageLeftHeight,
    );
    pdf.addPage();
    const thirdPageCanvas = await html2Canvas(thirdPage, {
      allowTaint: true,
      useCORS: true,
      dpi: window.devicePixelRatio * 4, // 将分辨率提高到特定的DPI 提高四倍
      background: '#FFFFFF', // 设置背景颜色为白色
      willReadFrequently: true, // 设置 willReadFrequently 属性为 true，用于优化性能
    });
    const thirdPagePageData = thirdPageCanvas.toDataURL('image/jpeg', 1.0);
    const thirdPageLeftHeight = thirdPageCanvas.height;
    pdf.addImage(
      thirdPagePageData,
      'JPEG',
      0,
      0,
      a4Width,
      (a4Width / thirdPageCanvas.width) * thirdPageLeftHeight,
    );
    pdf.addPage();
    await html2Canvas(page, {
      allowTaint: true, // 允许跨域图像
      useCORS: true, // 使用 CORS 跨域请求
      dpi: window.devicePixelRatio * 4, // 将分辨率提高到特定的DPI 提高四倍
      background: '#FFFFFF', // 设置背景颜色为白色
      willReadFrequently: true, // 设置 willReadFrequently 属性为 true，用于优化性能
    }).then((canvas) => {
      const PageData = canvas.toDataURL('image/jpeg', 1.0);
      const PageLeftHeight = canvas.height;
      pdf.addImage(PageData, 'JPEG', 0, 0, a4Width, (a4Width / canvas.width) * PageLeftHeight);
      pdf.save(title + '.pdf'); // 保存 PDF 文件
      return Promise.resolve();
    });
  },
};

export default htmlPdf;
