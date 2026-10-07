# Submitting a Paper to the Website

When you have a new publication, submit it to the website by opening a pull request. This guide walks you through the process.

---

## Overview

1. Fork the repo (or pull latest if you already have a fork)
2. Create a paper JSON file
3. Add a thumbnail image (optional but strongly preferred)
4. Open a pull request
5. Abhinav reviews and merges -- the site auto-deploys

---

## Step 1: Create the Paper JSON

Create a new file at:

```
src/content/papers/{year}-{paper-id}.json
```

The filename starts with the paper's year, followed by a short, unique, lowercase, hyphenated identifier (e.g., `2024-eagles`, `2026-uplift`). The `paper-id` part must match the `"id"` field inside the JSON.

### Required Fields

```json
{
  "id": "your-paper-id",
  "title": "Your Paper Title",
  "authors": ["first-author-id", "second-author-id", "abhinav-shrivastava"],
  "venue": "CVPR",
  "year": 2026,
  "date": "2026-02"
}
```

The `date` field is the **acceptance notification month** in `YYYY-MM` format (e.g., `"2026-02"` for CVPR 2026 notifications in February). This controls the display order of papers within a year. Ask Abhinav if you're unsure.

### Optional Fields

```json
{
  "date": "2026-02",
  "tags": ["new", "oral"],
  "sortOrder": 0,
  "links": {
    "pdf": "https://arxiv.org/abs/XXXX.XXXXX",
    "webpage": "https://your-project-page.github.io/",
    "code": "https://github.com/your-org/your-repo",
    "video": "https://youtube.com/watch?v=...",
    "poster": "https://...",
    "dataset": "https://..."
  },
  "thumbnail": "https://your-project-page.github.io/teaser.png"
}
```

- `date`: Already included in required fields above. If omitted, the paper sorts to the end of its year.
- `sortOrder`: Optional number to control order within papers that share the same date. Lower numbers appear first. Most papers don't need this — only use it if Abhinav wants a specific paper to appear before others from the same conference.

If you omit other optional fields, they default to empty (no tags, no links, no thumbnail).

---

## Step 2: Author IDs

Each author entry is either a **string ID** (looked up from `src/data/people.json`) or a **name object** (for external co-authors).

**Lab members and frequent collaborators** are in `people.json` with kebab-case IDs (e.g., `"matt-gwilliam"`, `"kamal-gupta"`). Using their ID auto-links them to their website everywhere on the site.

**External co-authors** not in `people.json` use an inline name object. You can optionally include their URL.

Example with both:

```json
"authors": [
  "sharath-girish",
  "kamal-gupta",
  {"name": "Larry Davis", "url": "https://www.cs.umd.edu/people/lsdavis"},
  {"name": "Jane Doe"},
  "abhinav-shrivastava"
]
```

- `"sharath-girish"` and `"kamal-gupta"` → looked up from `people.json`, auto-linked to their websites, easy to maintain
- `{"name": "Larry Davis"}` → displayed with a link
- `{"name": "Jane Doe"}` → displayed as plain text (no link)
- `"abhinav-shrivastava"` → always include Abhinav (i.e., only submit papers with Abhinav)

If someone appears across 3+ papers, Abhinav will promote them to `people.json` so they're linked consistently.

---

## Step 3: Thumbnail

A thumbnail is **required** for every paper. It appears next to your paper on the publications page.

**Size: 400×248 pixels** (2x retina, golden ratio). This is the exact aspect ratio of the thumbnail box — your image will display edge-to-edge with no gray gaps.

**Format: GIF preferred** if you have an animated teaser (e.g., video results, method visualization). Otherwise use PNG or JPG.

**GIF file size: aim for under 2 MB.** Large GIFs slow down page load. The best levers are resizing to 400px wide and keeping the clip short. Don't reduce the color count — that visibly degrades quality. If your GIF is still over 2 MB, submit it anyway; we compress it on our end by dropping frames (`scripts/compress-gif.sh`).

**Add to the repo.** Place the image at `public/images/thumbnails/your-paper-id.gif` and reference it as:

```json
"thumbnail": "images/thumbnails/your-paper-id.gif"
```

Do **not** use external URLs (project pages, personal sites) — these break when students graduate or change hosting.

---

## Step 4: Tags

Use tags to highlight your paper. Common tags:

| Tag | When to use |
|-----|------------|
| `"new"` | Recently published (Abhinav will remove this after ~6 months) |
| `"oral"` | Oral presentation at the venue |
| `"spotlight"` | Spotlight presentation |
| `"best-paper"` | Best paper award |

---

## Step 5: Submit the PR

1. Commit your new file(s)
2. Push to your fork
3. Open a pull request against the `main` branch
4. In the PR description, briefly note the paper title and venue
5. **Wait for the green check ✅.** GitHub automatically runs a build check on your PR within ~1 minute. You'll see one of:
   - 🟡 yellow dot — still running, wait a moment
   - ✅ green check — your JSON is valid, ready for review
   - ❌ red X — something is broken (usually a JSON syntax error like a trailing comma, or a missing/misspelled author ID). Click **Details** to see the exact error, push a fix to your branch, and the check will re-run automatically.

**Please do not ping Abhinav until the check is green.** If you're stuck on a red X, the error message usually tells you the file and line to fix.

Once green, Abhinav will review the content and merge. The site auto-deploys after merge.

---

## Venues

Use short venue names, not full conference names:

| Use this | Not this |
|----------|----------|
| `CVPR` | `IEEE/CVF Conference on Computer Vision and Pattern Recognition` |
| `ICCV` | `International Conference on Computer Vision` |
| `ECCV` | `European Conference on Computer Vision` |
| `NeurIPS` | `Advances in Neural Information Processing Systems` |
| `ICML` | `International Conference on Machine Learning` |
| `ICLR` | `International Conference on Learning Representations` |
| `AAAI` | `AAAI Conference on Artificial Intelligence` |
| `WACV` | `Winter Conference on Applications of Computer Vision` |
| `BMVC` | `British Machine Vision Conference` |
| `ICRA` | `IEEE International Conference on Robotics and Automation` |
| `IROS` | `IEEE/RSJ International Conference on Intelligent Robots and Systems` |
| `CoRL` | `Conference on Robot Learning` |
| `3DV` | `International Conference on 3D Vision` |
| `ICIP` | `IEEE International Conference on Image Processing` |
| `SIGGRAPH Asia` | `ACM SIGGRAPH Asia` |
| `EMNLP` | `Empirical Methods in Natural Language Processing` |
| `EACL` | `European Chapter of the ACL` |

For workshops, use the workshop abbreviation followed by the parent conference: `FGVC Workshop, CVPR`. If the workshop name is unknown, use `CVPR Workshop`.
For journals, use the standard abbreviation: `TPAMI`, `IJCV`, `TIP`, etc.

---

## Complete Example

File: `src/content/papers/2024-eagles.json`

```json
{
  "id": "eagles",
  "title": "EAGLES: Efficient Accelerated 3D Gaussians with Lightweight EncodingS",
  "authors": ["sharath-girish", "kamal-gupta", "abhinav-shrivastava"],
  "venue": "ECCV",
  "year": 2024,
  "date": "2024-07",
  "tags": [],
  "links": {
    "pdf": "https://arxiv.org/abs/2312.04564",
    "webpage": "https://efficientgaussian.github.io/",
    "code": "https://github.com/Sharath-girish/efficientgaussian"
  },
  "thumbnail": "https://efficientgaussian.github.io/static/images/approach.png"
}
```

---

## Checklist

Before submitting your PR:

- [ ] File is at `src/content/papers/{year}-{paper-id}.json`
- [ ] `paper-id` part of filename matches the `"id"` field inside the JSON
- [ ] Lab members use IDs from `people.json`; other co-authors use `{"name": "..."}`
- [ ] `date` field included (acceptance notification month, `YYYY-MM` format)
- [ ] Venue is a short abbreviation (e.g., `CVPR`, not the full name)
- [ ] JSON is valid (no trailing commas, proper quoting)
- [ ] Thumbnail included (external URL or added to `public/images/thumbnails/`)
