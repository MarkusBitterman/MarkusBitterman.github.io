{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "markusbitterman-github-io-dev";

  buildInputs = with pkgs; [
    # Node.js and npm for Eleventy (Nix shell pins Node.js 20.x; project requires >= 18)
    nodejs_20

    # Dart Sass for SCSS compilation
    dart-sass

    # Python for development tools (djLint installed via pip in shellHook)
    python3

    # Git for version control
    git
  ];

  shellHook = ''
    echo "🚀 Markus Bitterman GitHub Pages Dev Environment"
    echo "================================================"
    echo ""
    echo "Node version: $(node --version)"
    echo "npm version: $(npm --version)"
    echo "Sass version: $(sass --version)"
    echo "Python version: $(python --version)"
    echo ""

    # Set up a local Python virtual environment for djLint
    if [ ! -d ".venv" ]; then
      echo "📦 Setting up Python virtual environment..."
      python -m venv .venv
    fi
    source .venv/bin/activate

    # Install djLint if not present
    if ! command -v djlint &> /dev/null; then
      echo "📦 Installing djLint..."
      pip install -q djlint
    fi

    echo ""
    echo "📦 Installing npm dependencies..."
    npm install
    echo ""
    echo "✨ Ready to develop!"
    echo ""
    echo "Available commands:"
    echo "  npm start        - Start development server with watch mode"
    echo "  npm run build    - Build site for production"
    echo "  npm run clean    - Clean the _site directory"
    echo "  djlint --version - Check djLint version"
    echo ""
  '';
}
