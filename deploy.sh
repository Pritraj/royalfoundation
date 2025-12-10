#!/bin/bash

# Deploy Script for Royal Foundation / Ravi Nangre Website
# This script mimics the deployment workflow by:
# 1. Building the project locally to ensure no errors
# 2. Committing changes
# 3. Pushing to GitHub (which triggers the deploy.yml Action)

set -e # Exit on error

echo "🚀 Starting Deployment Process..."

# Step 1: Verification Build
echo "🛠️  Running verification build..."
npm run build
echo "✅ Build successful!"

# Step 2: Git Operations
echo "📦 Staging files..."
git add .

# Prompt for commit message
read -p "📝 Enter commit message (default: 'Deploy update'): " commit_msg
commit_msg=${commit_msg:-"Deploy update"}

echo "Cd Committing: '$commit_msg'"
git commit -m "$commit_msg"

# Step 3: Push to Main
echo "⬆️  Pushing to GitHub..."
git push origin main

echo "🎉 Changes pushed! GitHub Actions will now deploy to: https://royalfoundations.in"
echo "   Monitor status here: https://github.com/pritamrajput/royalfoundation/actions"
