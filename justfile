# shows this
default:
    @just -l

# run sass in dev mode
dev:
    ./tools/dart-sass/sass --watch scss/index.scss style.css

# server
serve:
    python3 -m http.server

# run sass in release mode
build:
  ./tools/dart-sass/sass --no-source-map scss/index.scss style.css

# generate songs and poems database
gen:
    python3 db-generator.py
