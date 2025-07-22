#!/bin/bash

# SPL Token Finder - Client Package Script
echo "📦 Preparing SPL Token Finder for client distribution..."

# Create distribution directory
mkdir -p dist-client
cd dist-client

# Copy essential files
cp -r ../src .
cp -r ../examples .
cp ../package.json .
cp ../package-lock.json .
cp ../tsconfig.json .
cp ../jest.config.js .
cp ../run.sh .
cp ../run.js .
cp ../README.md .
cp ../SETUP.md .
cp ../LICENSE .
cp ../.gitignore .

# Create a simple install script
cat > install.sh << 'EOF'
#!/bin/bash
echo "🚀 Setting up SPL Token Finder..."
echo "Installing dependencies..."
npm install
echo "Building project..."
npm run build
chmod +x run.sh
chmod +x run.js
echo "✅ Setup complete!"
echo ""
echo "Usage:"
echo "  ./run.sh                    # Interactive mode"
echo "  node run.js                 # Cross-platform interactive"
echo "  node dist/cli.js <address>  # Direct command"
echo ""
echo "Example:"
echo "  ./run.sh"
EOF

chmod +x install.sh

echo "✅ Client package created in dist-client/"
echo ""
echo "To share with client:"
echo "1. Zip the dist-client folder"
echo "2. Send to client with instructions to:"
echo "   - Extract the zip file"
echo "   - Run: chmod +x install.sh && ./install.sh"
echo "   - Use: ./run.sh" 