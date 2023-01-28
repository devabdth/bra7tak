from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.lib.utils import ImageReader
from reportlab_qrcode import QRCodeImage
from reportlab.pdfbase.ttfonts import TTFont

# Initi Font Family
pdfmetrics.registerFont(TTFont('Raleway', 'Raleway-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Poppins', 'Poppins-Regular.ttf'))


import os
class InvoiceGenerator:
      def __init__(self, order: dict):
            self.order= order
            self.logo= ImageReader('logo.png')

      def generate_invoice(self):
            c = canvas.Canvas("{}.pdf".format(self.order['id']), pagesize=(210, 297), bottomup=0)
            c.setFillColorRGB(0.1, 0.1, 0.1)

            c.line(70, 22, 180, 22)
            c.line(5, 45, 195, 45)
            c.line(15, 120, 185, 120)
            c.line(35, 108, 35, 220)
            c.line(115, 108, 115, 220)
            c.line(135, 108, 135, 220)
            c.line(160, 108, 160, 220)
            c.line(15, 220, 185, 220)

            c.translate(10, 40)
            c.scale(1, -1)
            c.drawImage(self.logo, 0, 0, width=48, height=32, mask='auto')

            c.scale(1, -1)
            c.translate(-10, -40)

            QRCodeImage(self.order['policeNumber'], size=32).drawOn(c, 170, 10)


            c.setFont("Raleway", 10)
            c.drawCentredString(125, 20, "Bra7tak")
            c.setFont("Raleway", 8)
            c.drawCentredString(100, 55, "INVOICE")

            c.drawRightString(50, 70, "Invoice No. :")
            c.setFont("Poppins", 5)
            c.drawRightString(150, 70, str(self.order['policeNumber']))

            c.setFont("Raleway", 5)
            c.drawRightString(50, 80, "Date :")
            c.setFont("Poppins", 5)
            c.drawRightString(150, 80, self.order['placedIn'])

            c.setFont("Raleway", 5)
            c.drawRightString(50, 90, "Customer Name :")
            c.drawRightString(150, 90, self.order['userName'])

            c.drawRightString(50, 100, "Phone No. :")
            c.setFont("Poppins", 5)
            c.drawRightString(150, 100, self.order['userPhone'])

            # c.roundRect(15, 108, 170, 130, 10, stroke=1, fill=0)

            c.setFont("Raleway", 5)
            c.drawCentredString(75, 118, "Products")
            c.drawCentredString(125, 118, "Price")
            c.drawCentredString(148, 118, "Qty.")
            c.drawCentredString(173, 118, "Total")

            current_line= 130
            products= ["Product", "Product", "Product", "Product"]
            for product in products:
                  c.setFont("Poppins", 5)
                  c.drawCentredString(25, current_line, str(products.index(product)))
                  c.setFont("Raleway", 5)
                  c.drawCentredString(75, current_line, product)
                  c.setFont("Poppins", 5)
                  c.drawCentredString(125, current_line, str(100))
                  c.drawCentredString(148, current_line, str(current_line))
                  c.drawCentredString(173, current_line, str(100*current_line))
                  current_line+= 12


            c.showPage()
            c.save()

from datetime import datetime

InvoiceGenerator({
      'id': '0',
      'policeNumber': 10000000001,
      'userName': "User",
      "userPhone": "01093008313",
      "placedIn": str(datetime.now())
}).generate_invoice()