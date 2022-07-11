a. How to set up the dev environment (React Native)
HERE ===> https://reactnative.dev/docs/environment-setup
b. How to export iOS and Android builds
1, android
STEP 1 (gen file.keystore): follow https://reactnative.dev/docs/signed-apk-android
STEP 2 (copy file.keystore): copy file.keystore to android/app and Increase versionCode in 'android/app/build.gradle'
STEP 3 (gen file aab and apk): open terminal project => cd android => "./gradlew assembleRelease" (note: apk) OR "./gradlew bundleRelease" (note: aab)
2, ios
STEP 1: Register bundleID and create app on apple Developer
STEP 2: click chose "Any IOS Device (arm64)" on tab simulator xcode and Increase version build
STEP 3: click Product => Archive => wait... => seclect app and click Distibute App
STEP 4: click "App Store Connect" => "Upload" if you want upload app to testFlight and apple store, click "Development" if you want export file app.ipa