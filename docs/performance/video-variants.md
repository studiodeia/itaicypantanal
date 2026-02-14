# Hero Video Variants (Progressive Loading)

The hero video component now supports:

- `webm` + `mp4`
- `high` + `low` quality
- automatic low-quality preference on slow connections
- fallback to high quality when low file is missing

## Expected files

Put files in `client/public/` with these names:

Home hero:

- `hero-background.webm`
- `hero-background.mp4`
- `hero-background-low.webm`
- `hero-background-low.mp4`

Accommodations hero:

- `video-pronto-suave.webm`
- `Vídeo_Pronto_e_Suave.mp4` (already used as primary)
- `video-pronto-suave-low.webm`
- `video-pronto-suave-low.mp4`

## Suggested ffmpeg commands

Use your input file and generate optimized variants:

```powershell
# High WebM (VP9)
ffmpeg -i .\input.mp4 -c:v libvpx-vp9 -b:v 0 -crf 33 -an -row-mt 1 -threads 8 .\output-high.webm

# Low WebM (VP9)
ffmpeg -i .\input.mp4 -vf "scale=-2:720" -c:v libvpx-vp9 -b:v 0 -crf 40 -an -row-mt 1 -threads 8 .\output-low.webm

# High MP4 (H.264)
ffmpeg -i .\input.mp4 -c:v libx264 -preset slow -crf 23 -movflags +faststart -an .\output-high.mp4

# Low MP4 (H.264)
ffmpeg -i .\input.mp4 -vf "scale=-2:720" -c:v libx264 -preset slow -crf 30 -movflags +faststart -an .\output-low.mp4
```

## Notes

- Keep posters lightweight (`webp`) and visually close to first video frame.
- If low files are not present, the component automatically falls back to high.
- If low file exists but fails to load, runtime fallback switches to high.
