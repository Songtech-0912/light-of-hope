# Light of Hope Project Docs

## Development

Light of Hope uses the following dependencies:

- [Sass](https://sass-lang.com/)
- Iconicons, Heroicons, and Boxicons for icons
- [Just](https://github.com/casey/just)
- Python

The repository is structured as follows:

- `audio` for completed Light of Hope pieces
- `pieces` for the source MusicXML and PDF versions of the pieces
- `poems` for the Commandúleán and English source poems
- `scss` for all sass stylesheets
- `tools` for installing and managing project tools

To get started, simply clone the repository:

```sh
git clone https://Songtech-0912/light-of-hope.git && cd light-of-hope
```

Then, install dependencies:

```
cd tools/
python download-sass.py
```

Finally, in two separate terminal windows run:

```
just dev
just serve
```

Open up <http://localhost:8000/> and begin developing!
