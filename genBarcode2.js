// in cm
const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const JsBarcode = require('jsbarcode');

//1px = 0.02645833 cm;
//1 cm = 37.795276px;
const pxtocm = 0.37795276;
function genBarcode(fileName,barcodeNum) {
    const width = 1428 * pxtocm
    const height = 2540 * pxtocm

    const canvas = createCanvas(width, height) //main canvas
    const canvas2 = createCanvas(width, height) //canvas for barcode
    const context = canvas.getContext('2d')

    context.fillStyle = '#fff' //white
    context.fillRect(0,0,width,height)

    context.fillStyle = '#000' //black

    const text1 = 'เงื่อนไขการใช้'

    const text2 = 'ใช้ได้ที่ เซ็นทรัล, มาร์คแอนด์สเปนเซอร์, มูจิ, เซ็นทรัล ฟู้ดฮอลล์, ท็อปส์, ซูเปอร์คุ้ม,\n\
อีทไทยโซนซูเปอร์มาร์เก็ต, Thai Favourites, เพาเวอร์บาย, ซูเปอร์สปอร์ต, บีทูเอส,\n\
โรบินสัน, ไทวัสดุ, บ้านแอนด์บียอน, มัทสึโมโตะ คิโยชิ, ออฟฟิศเมท และ ออโต้วัน\n\
(ยกเว้นร้านค่าเช่าพื้นที่, พื้นที่ศูนย์อาหาร และช่องทางออนไลน์)\n\
สอบถามรายละเอียดเพิ่มเติม กรุณาติดต่อ MAGIC Gift Card Call Center\n\
โทร 02 100 8777 จ – ศ 9:00 - 20:00 น. / ส – อา 10:30 - 20:00 น.\n\
หรือส่งอีเมล มาที่ cpmsupport@central.co.th ​'

    context.font = 'bold 17.77pt AngsanaUPC'
    context.fillText(text1, 20* pxtocm, 1920* pxtocm)
    context.font = '17.77pt AngsanaUPC'
    context.fillText(text2, 20* pxtocm, 2020* pxtocm)

    // line เงื่อนไข
    context.strokeStyle = 'black';
    context.lineWidth = 5* pxtocm;
    context.beginPath();
    context.moveTo(20* pxtocm,1930* pxtocm);
    context.lineTo(255* pxtocm,1930* pxtocm);
    context.stroke();

    // line email
    context.strokeStyle = 'black';
    context.lineWidth = 2* pxtocm;
    context.beginPath();
    context.moveTo(320* pxtocm,2470* pxtocm);
    context.lineTo(760* pxtocm,2470* pxtocm);
    context.stroke();

    loadImage('./EV_100-01.png').then(image => {
        context.drawImage(image, 14* pxtocm, 0, 1400* pxtocm, 1400* pxtocm) //central image
    
        JsBarcode(canvas2, barcodeNum, {font: 'Arial'}); //barcode
        context.drawImage(canvas2,114* pxtocm,1400* pxtocm,1200* pxtocm,360* pxtocm)
        
        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./'+fileName+'.png', buffer)
    })
}

module.exports = { genBarcode };
