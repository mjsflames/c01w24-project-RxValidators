from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import os
from flask import Flask, request, jsonify

app = Flask(__name__)
PORT = 5000

# This function creates a pdf file (formatted the way the company wants it) based on the prescriber's code
def create_pdf(code, output_path):
    page = canvas.Canvas(os.path.join(output_path, f"PaRx-{code}.pdf"), pagesize=letter)
    page.setTitle(f"PaRx-{code}")
    page.setFont("Helvetica", 12)
    page.drawString(80, 700, "Name _______________________________________")
    page.drawString(80, 660, "Date ________________________________________")
    page.drawString(80, 610, "My Outdoor Activity Plan:")
    page.saveState()

    page.drawString(80, 200, "____________________________________")
    page.setFont("Helvetica", 9)
    page.drawString(80, 185, "Health Professional's Signature")

    page.restoreState() 
    page.drawString(80, 130, f"Prescription #: {code}   --  ___________________  --  ___________________")
    
    page.setFont("Helvetica", 9)
    page.drawString(280, 115, "(YYMMDD)")
    page.drawString(415, 115, "(Patient's Initials)")

    page.save()

@app.route('/generatePdf', methods=['POST'])
def generate_pdf():
    code = request.json.get('code')
    output_path = request.json.get('output_path')

    if not code or not output_path:
        return jsonify({'error': 'Invalid code or output path'}), 400

    create_pdf(code, output_path)
    return jsonify({'message': 'PDF generated successfully'}), 200

if __name__ == '__main__':
    app.run(port=PORT)
