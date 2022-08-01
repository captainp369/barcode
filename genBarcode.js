//in pixel

const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const JsBarcode = require('jsbarcode');

function genBarcode(fileName,barcodeNum) {
    const width = 1428
    const height = 2540

    const canvas = createCanvas(width, height) //main canvas
    const canvas2 = createCanvas(width, height) //canvas for barcode
    const context = canvas.getContext('2d')

    context.fillStyle = '#fff' //white
    context.fillRect(0,0,1428,2540)

    context.fillStyle = '#000' //black

    const text1 = 'เงื่อนไขการใช้'

    const text2 = 'ใช้ได้ที่ เซ็นทรัล, มาร์คแอนด์สเปนเซอร์, มูจิ, เซ็นทรัล ฟู้ดฮอลล์, ท็อปส์, ซูเปอร์คุ้ม,\n\
อีทไทยโซนซูเปอร์มาร์เก็ต, Thai Favourites, เพาเวอร์บาย, ซูเปอร์สปอร์ต, บีทูเอส,\n\
โรบินสัน, ไทวัสดุ, บ้านแอนด์บียอน, มัทสึโมโตะ คิโยชิ, ออฟฟิศเมท และ ออโต้วัน\n\
(ยกเว้นร้านค่าเช่าพื้นที่, พื้นที่ศูนย์อาหาร และช่องทางออนไลน์)\n\
สอบถามรายละเอียดเพิ่มเติม กรุณาติดต่อ MAGIC Gift Card Call Center\n\
โทร 02 100 8777 จ – ศ 9:00 - 20:00 น. / ส – อา 10:30 - 20:00 น.\n\
หรือส่งอีเมล มาที่ cpmsupport@central.co.th ​'

    context.font = 'bold 47pt AngsanaUPC'
    context.fillText(text1, 20, 1920)
    context.font = '47pt AngsanaUPC'
    context.fillText(text2, 20, 2020)

    // line เงื่อนไข
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(20,1930);
    context.lineTo(255,1930);
    context.stroke();

    // line email
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(320,2470);
    context.lineTo(760,2470);
    context.stroke();

    loadImage('./EV_100-01.png').then(image => {
        context.drawImage(image, 14, 0, 1400, 1400) //central image
    
        JsBarcode(canvas2, barcodeNum, {font: 'Arial'}); //barcode
        context.drawImage(canvas2,114,1400,1200,360)
        
        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./'+fileName+'.png', buffer)
    })
}

module.exports = { genBarcode };
