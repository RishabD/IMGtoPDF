import io
import uuid
from flask import Flask, render_template, url_for, request, send_file
from datetime import timedelta
from PIL import Image


#Set up to start website
app = Flask(__name__)
app.secret_key = str(uuid.uuid4())
app.permanent_session_lifetime = timedelta(minutes=5)

@app.route('/')
def index():
   return render_template('index.html')


@app.route('/convert', methods = ['POST','GET'])
def convert():
   if request.method == 'POST':
      output = io.BytesIO();
      binary_data = []
      for file in request.files.getlist("file[]"):
         data = io.BytesIO()
         file.save(data)
         binary_data.append(data)
      img = Image.open(binary_data[0]).convert('RGB')
      imagelist = []
      for i in range(1, len(binary_data)):
         imagelist.append(Image.open(binary_data[i]).convert('RGB'))
      img.save(output,format = "PDF",save_all=True, append_images=imagelist)
      output.seek(0)
      return send_file(output, mimetype='application/pdf', as_attachment=True, attachment_filename='download.pdf')




if __name__ == '__main__':
   app.run(debug = True,threaded = True)
