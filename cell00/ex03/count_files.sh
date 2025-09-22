count=0

for item in *; do
  if [ -f "$item" ] || [ -d "$item" ]; then
    count=$((count + 1))
  fi
done

echo "$count"
