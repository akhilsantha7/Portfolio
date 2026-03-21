#!/bin/bash
# Run this so the demo video can play (browsers often block video when opening index.html as file://)
cd "$(dirname "$0")"
echo "Opening http://localhost:8000 in your browser..."
echo "Press Ctrl+C to stop the server."
python3 -m http.server 8000
