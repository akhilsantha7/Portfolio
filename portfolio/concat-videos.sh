#!/bin/bash
# Combines 1.mov and 2.mov into one video for the DHARAMIND overlay.
# Requires ffmpeg: install with  brew install ffmpeg
# Place 1.mov and 2.mov in this folder (portfolio/), then run: ./concat-videos.sh

set -e
if ! command -v ffmpeg &>/dev/null; then
  echo "ffmpeg is required. Install with: brew install ffmpeg"
  exit 1
fi
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

if [[ ! -f "1.mov" || ! -f "2.mov" ]]; then
  echo "Error: 1.mov and 2.mov must be in $(pwd)"
  exit 1
fi

echo "file '1.mov'" > concat-list.txt
echo "file '2.mov'" >> concat-list.txt

ffmpeg -y -f concat -safe 0 -i concat-list.txt -c copy dharamind-demo.mp4

rm -f concat-list.txt
echo "Done. Created dharamind-demo.mp4"
