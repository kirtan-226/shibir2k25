# Define the application directory (change if needed)
APP_DIR="/home/ec2-user/shibir_backend"

# Navigate to the application directory
cd $APP_DIR || { echo "Directory not found! Exiting."; exit 1; }

# Fetch the latest changes from the remote repository
echo "Fetching latest changes from Git..."
git fetch origin || { echo "Git fetch failed! Exiting."; exit 1; }

# Pull the latest changes (change the branch name if needed)
echo "Pulling latest changes from Git..."
git pull origin master || { echo "Git pull failed! Exiting."; exit 1; }

# Install dependencies (if needed)
echo "Installing dependencies..."
npm install || { echo "NPM install failed! Exiting."; exit 1; }

# Rebuild (for TypeScript/NestJS applications)
echo "Building the application..."
npm run build || { echo "Build failed! Exiting."; exit 1; }

# Restart the application with PM2
echo "Restarting PM2 app..."
pm2 restart shibir_backend || { echo "PM2 restart failed! Exiting."; exit 1; }

echo "Deployment process completed successfully!"
