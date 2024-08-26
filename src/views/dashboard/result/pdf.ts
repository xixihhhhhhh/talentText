import { nextTick } from 'vue';
import html2Canvas from 'html2Canvas';
import JsPDF from 'jspdf';

const pdf = new JsPDF('p', 'pt', 'a4'); // 创建一个新的 JsPDF 对象，设置纸张方向为纵向，单位为 pt，纸张大小为 A4
const a4Width = 595.28; // A4 纸张宽度（单位：pt）
const a4Height = 841.89; // A4 纸张高度（单位：pt）
const htmlPdf = {
  async getPdf(
    title: string,
    cover: HTMLElement,
    secondPage: HTMLElement,
    thirdPage: HTMLElement,
    page: HTMLElement,
  ) {
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
    html2Canvas(page, {
      allowTaint: true, // 允许跨域图像
      useCORS: true, // 使用 CORS 跨域请求
      dpi: window.devicePixelRatio * 4, // 将分辨率提高到特定的DPI 提高四倍
      background: '#FFFFFF', // 设置背景颜色为白色
      willReadFrequently: true, // 设置 willReadFrequently 属性为 true，用于优化性能
    }).then((canvas) => {
      // 未生成pdf的html页面高度
      let leftHeight = canvas.height;

      // 一页pdf显示html页面生成的canvas高度;
      const a4HeightRef = Math.floor((canvas.width / a4Width) * a4Height);

      let position = 0; // 当前页面的起始位置

      const pageData = canvas.toDataURL('image/jpeg', 1.0); // 获取 canvas 的 base64 数据

      const canvas1 = document.createElement('canvas') as HTMLCanvasElement; // 创建一个新的 canvas 元素
      let height; // 当前页面的高度
      pdf.setDisplayMode('fullwidth', 'continuous', 'FullScreen'); // 设置 PDF 的显示模式

      let index = 0; // 页码

      function createImpl(canvas: HTMLCanvasElement) {
        console.log(leftHeight, a4HeightRef); // 打印剩余高度和每页高度

        if (leftHeight > 0) {
          index++; // 页码加 1

          let checkCount = 0; // 用于判断是否到达页面底部

          if (leftHeight > a4HeightRef) {
            // 如果剩余高度大于每页高度，则需要分页
            let i = position + a4HeightRef; // 从当前位置开始，向下遍历
            for (i = position + a4HeightRef; i >= position; i--) {
              let isWrite = true; // 用于判断当前行是否可以写入
              for (let j = 0; j < canvas.width; j++) {
                const c: any = canvas.getContext('2d')?.getImageData(j, i, 1, 1).data; // 获取当前像素点的颜色值

                if (c[0] != 0xff || c[1] != 0xff || c[2] != 0xff) {
                  // 如果当前像素点不是白色，则表示当前行不能写入
                  isWrite = false;
                  break;
                }
              }
              if (isWrite) {
                // 如果当前行可以写入，则计数器加 1
                checkCount++;
                if (checkCount >= 1) {
                  // 如果计数器大于等于 10，则表示已经到达页面底部，退出循环
                  break;
                }
              } else {
                // 如果当前行不能写入，则计数器清零
                checkCount = 0;
              }
            }
            height = Math.round(i - position) || Math.min(leftHeight, a4HeightRef); // 计算当前页面的高度
            if (height <= 0) {
              height = a4HeightRef; // 如果高度小于等于 0，则设置为每页高度
            }
          } else {
            height = leftHeight; // 如果剩余高度小于每页高度，则当前页面高度为剩余高度
          }

          canvas1.width = canvas.width; // 设置 canvas1 的宽度
          canvas1.height = height; // 设置 canvas1 的高度

          console.log(index, 'height:', height, 'pos', position); // 打印页码、高度和起始位置

          const ctx = canvas1.getContext('2d'); // 获取 canvas1 的 2D 上下文
          ctx?.drawImage(canvas, 0, position, canvas.width, height, 0, 0, canvas.width, height); // 将 canvas 的内容绘制到 canvas1 上

          // const pageHeight = Math.round((a4Width / canvas.width) * height); // 计算当前页面的高度（单位：pt）
          if (position != 0) {
            pdf.addPage(); // 添加新的一页
          }
          pdf.addImage(
            canvas1.toDataURL('image/jpeg', 1.0), // 获取 canvas1 的 base64 数据
            'JPEG', // 设置图片类型为 JPEG
            10, // 设置图片的 x 坐标
            10, // 设置图片的 y 坐标
            a4Width, // 设置图片的宽度
            (a4Width / canvas1.width) * height, // 设置图片的高度
          );
          leftHeight -= height; // 更新剩余高度
          position += height; // 更新起始位置
          if (leftHeight > 0) {
            setTimeout(createImpl, 500, canvas); // 延迟执行 createImpl 函数，避免阻塞主线程
          } else {
            pdf.save(title + '.pdf'); // 保存 PDF 文件
          }
        }
      }

      // 当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < a4HeightRef) {
        pdf.addImage(pageData, 'JPEG', 0, 0, a4Width, (a4Width / canvas.width) * leftHeight); // 将 canvas 的内容绘制到 PDF 上
        pdf.save(title + '.pdf'); // 保存 PDF 文件
      } else {
        try {
          // pdf.deletePage(0); // 删除第一页
          setTimeout(createImpl, 0, canvas); // 延迟执行 createImpl 函数，避免阻塞主线程
        } catch (err) {
          // console.log(err); // 打印错误信息
        }
      }
    });
  },
};

export default htmlPdf;
