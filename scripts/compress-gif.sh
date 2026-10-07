#!/bin/bash
# Compress a thumbnail GIF by dropping frames (not colors), keeping playback speed.
# Usage: scripts/compress-gif.sh input.gif [output.gif] [keep-every-Nth, default 2]
# Requires gifsicle (brew install gifsicle).
set -euo pipefail

in="${1:?usage: compress-gif.sh input.gif [output.gif] [N]}"
out="${2:-$in}"
n="${3:-2}"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

frames=$(gifsicle --info "$in" | grep -c 'image #')
delay=$(gifsicle --info "$in" | grep -m1 -o 'delay [0-9.]*' | awk '{print $2}')
newdelay=$(awk -v d="$delay" -v n="$n" 'BEGIN{printf "%d", d*100*n}')
last=$((frames - 1))

# Flatten to one global palette so frames are independent, then drop frames.
gifsicle --colors=255 -U "$in" -o "$tmp/flat.gif" 2>/dev/null
gifsicle -U "$tmp/flat.gif" $(seq -f '#%g' 0 "$n" "$last") -o "$tmp/dropped.gif"
gifsicle -d"$newdelay" -O3 "$tmp/dropped.gif" -o "$tmp/out.gif"

before=$(stat -f%z "$in"); after=$(stat -f%z "$tmp/out.gif")
cp -f "$tmp/out.gif" "$out"
printf "%s: %d → %d frames, delay %ss → %d.%02ds, %.2f → %.2f MB\n" \
  "$out" "$frames" $(( (last / n) + 1 )) "$delay" $((newdelay/100)) $((newdelay%100)) \
  "$(awk -v b=$before 'BEGIN{print b/1048576}')" "$(awk -v a=$after 'BEGIN{print a/1048576}')"
