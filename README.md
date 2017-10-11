#Configurar Projeto
npm install angularfire2 firebase promise-polyfill --save 
ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="145387609344354" --variable APP_NAME="Memo­r­y­F­r­i­ends"

npm install --save @ionic-native/facebook
npm install ngx-facebook --save
npm install brmasker-ionic-3 --save

#Deploy App
Assinar app no android:

keytool -genkey -v -keystore my-release-key.keystore -alias Memo­r­y­F­r­i­ends -keyalg RSA -keysize 2048 -validity 10000

Mac
keytool -exportcert -alias Memo­r­y­F­r­i­ends -keystore my-release-key.keystore | openssl sha1 -binary | openssl base64
Windows
keytool -exportcert -alias MemoryFriends -keystore my-release-key.keystore | openssl sha1 -binary | openssl base64
keytool -exportcert -alias MemoryFriends -keystore my-release-key.keystore | "C:\Users\william.tempone\openssl\bin\openssl.exe" sha1 -binary | "C:\Users\william.tempone\openssl\bin\openssl.exe" base64

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk Memo­r­y­F­r­i­ends
$ANDROID_HOME/build-tools/25.0.2/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/Memo­r­y­F­r­i­ends.apk
C:\Users\william.tempone\AppData\Local\Android\sdk\build-tools\26.0.0\zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/Memo­r­y­F­r­i­ends.apk
adb -d install platforms/android/build/outputs/apk/Memo­r­y­F­r­i­ends.apk

#Deploy Browser
firebase deploy