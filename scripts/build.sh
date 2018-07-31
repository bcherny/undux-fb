rm -rf undux
git clone git@github.com:bcherny/undux.git
cd undux
yarn
sed -i '' 's/undux/undux-fb/g' package.json
rm README.md
cp ../README.md README.md
yarn publish
