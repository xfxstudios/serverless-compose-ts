echo "Compiling..."
tsc
cp -r ./dist/* ../app-layer/nodejs/node_modules/"$1"
rm -r ./dist
echo "Done"