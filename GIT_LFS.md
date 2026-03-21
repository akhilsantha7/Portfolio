# Git LFS for video files (`*.mp4`)

Large files like `portfolio/1.mp4` and `portfolio/2.mp4` are tracked with **[Git LFS](https://git-lfs.com/)** so the repo stays small and clones stay fast.

## One-time setup (per machine)

**macOS (Homebrew):**

```bash
brew install git-lfs
git lfs install
```

**Linux:** see [Installing Git LFS](https://github.com/git-lfs/git-lfs#installing).

Then in this repo (after `git lfs install` once globally):

```bash
cd /path/to/Resume
git lfs pull   # if you already have LFS pointers from a clone
```

## Adding or updating MP4s

Put `1.mp4`, `2.mp4`, etc. under `portfolio/`, then:

```bash
git add portfolio/1.mp4 portfolio/2.mp4 .gitattributes
git commit -m "Add demo videos"
git push
```

Git LFS will upload file contents to GitHub’s LFS storage when you push.

## If `*.mp4` was already committed *without* LFS

Rewrite history so those files become LFS objects:

```bash
git lfs install
git lfs migrate import --include="*.mp4" --everything
```

Then `git push --force-with-lease` (only if you’re sure no one else depends on old history).

## GitHub limits (free)

LFS includes **storage and bandwidth quotas** on free accounts. Check **Settings → Billing** (or your plan docs) on GitHub. If you hit limits, consider hosting videos on YouTube/Vimeo and embedding links instead.

## GitHub Pages deploy

The workflow **`.github/workflows/github-pages.yml`** uses `checkout` with **`lfs: true`** so the deployed site gets the real `.mp4` files, not LFS pointer text files.
