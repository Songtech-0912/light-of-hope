# Downloads sass and extracts it to ./sass
SASS_LINUX_URL = "https://github.com/sass/dart-sass/releases/download/1.58.1/dart-sass-1.58.1-linux-x64.tar.gz"
SASS_MACOS_URL = "https://github.com/sass/dart-sass/releases/download/1.58.1/dart-sass-1.58.1-macos-x64.tar.gz"
SASS_WIN_URL = "https://github.com/sass/dart-sass/releases/download/1.58.1/dart-sass-1.58.1-windows-x64.zip"

import os
import re
import tarfile
from zipfile import ZipFile
import requests
from sys import platform

def get_filename(r):
    d = r.headers['content-disposition']
    fname = re.findall("filename=(.+)", d)[0]
    return fname

url = ""

if platform == "linux" or platform == "linux2":
    url = SASS_LINUX_URL
elif platform == "darwin":
    url = SASS_MACOS_URL
elif platform == "win32":
    url = SASS_WIN_URL

r = requests.get(url)
filename = get_filename(r)
with open(filename, "wb") as f:
    f.write(r.content)

print(f"[INFO] Sass download in progress...")
print(f"[INFO] Downloaded sass to {filename}")

if platform in ("linux", "linux2", "darwin"):
    tar_file = tarfile.open(filename)
    print(f"[INFO] Extracting sass binary...")
    tar_file.extractall(".")
    tar_file.close()
    os.remove(filename)
else:
    with Zipfile(filename, "r") as zip:
        print(f"[INFO] Extracting sass binary...")
        zip.extractall()
    os.remove(filename)

print(f"[INFO] Done! Sass setup complete")


