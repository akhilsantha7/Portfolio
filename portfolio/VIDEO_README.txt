DHARAMIND demo video — get it playing in the portfolio

Browsers need MP4 (not .mov) to play the video in the page. Do ONE of the following:

OPTION A — One combined video (1.mov + 2.mov)
1. Go to https://cloudconvert.com/mov-to-mp4 (or freeconvert.com/mov-to-mp4)
2. Upload 1.mov, convert to MP4, download.
3. Upload 2.mov, convert to MP4, download.
4. Use https://www.videosoftware.com or similar to merge the two MP4s, OR
   if you have ffmpeg installed: run ./concat-videos.sh in this folder.
5. Save the final combined file as: dharamind-demo.mp4
6. Put dharamind-demo.mp4 in this folder (portfolio/).

OPTION B — Single video only (just 1.mov)
1. Go to https://cloudconvert.com/mov-to-mp4
2. Upload 1.mov, convert to MP4, download.
3. Rename the downloaded file to: dharamind-demo.mp4
4. Put it in this folder (portfolio/).

Then open the site (e.g. run ./serve.sh and go to http://localhost:8000) and click "View app demo". The video should play.
