cd front
rm -rf dist
echo 'Building front...'
ng build --prod --aot=false
cd ..
echo "Copy files to public..."
rm -rf ./back/public
cp -r ./front/dist ./back/public

git add .
git commit -m "Building sources commit"
git subtree push --prefix=back heroku master
echo "Done!"