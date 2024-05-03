echo "Installing packages..."
npm install --quiet

echo "Transpiling..."
tsc

echo "Creating directory..."
mkdir ./nodejs

echo "Preparing files..."
cp package*.json nodejs/ && cd nodejs/ && npm ci --production
mv ../dist ./node_modules/"$1"
cd ../

# echo "Moving files to app-layer..."
# mkdir ../app-layer
# cp -r ./nodejs ../app-layer

# echo "Cleaning Directory..."
# rm -r ./nodejs
# echo "Done"