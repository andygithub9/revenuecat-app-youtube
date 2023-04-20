# Set Up

1. install expo-cli and init project
   https://www.revenuecat.com/blog/engineering/expo-in-app-purchase-tutorial/
2. install expo eas (Expo Application Services) cli
   https://github.com/expo/eas-cli
   tailwind.config.js 設定如下

   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./App.{js,jsx,ts,tsx}",
       "./screens/**/*.{js,jsx,ts,tsx}",
       "./components/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

3. install NativeWind，可以把 NativeWind 當成是 react native 版的 tailwind
   https://www.nativewind.dev/quick-starts/expo
4. 添加 Typescript 聲明檔
   https://www.nativewind.dev/getting-started/typescript
   create a new `app.d.ts` file
   ```ts
   /// <reference types="nativewind/types" />
   ```

# Expo Cli Start a development server

1. https://docs.expo.dev/more/expo-cli/?redirected#develop
   `npx expo start`
2. https://stackoverflow.com/questions/47709953/expo-change-default-ios-simulator
   shift+i 可以選 iOS 模擬器
3. 在 iOS 模擬器可以 control+command+z 開啟 debug console

# 如何將 Expo 連接到 Android 模擬器

https://docs.expo.dev/workflow/android-studio-emulator/
按照上面的文件安裝 Android Studio 後，Set up a virtual device，後開啟 Android 模擬器，在終端機輸入 `npx expo start`後，按下 a，就可以將 Expo 連接到 Android 模擬器了

# 目前 React Native 和 NativeWind 有時候會有些問題

當你發現 NativeWind 的樣式沒有生效的時候你可以先做以下動作

1. 不要用 SafeAreaView component 改用 View component，之後 NativeWind 生效之後可以再換回來
2. 關閉 VSCode 和模擬器再重開一次
3. start app 的時候把快取清掉 `npx expo start --clear`
4. 在模擬器中把 Expo 關掉，回到終端機再按一次 i，重開模擬器的 Expo

# 安裝 React Navigation ，用於在 app 中導航到不同屏幕，類似於瀏覽器的上下頁

在網絡瀏覽器中，您可以使用錨 ( `<a>`) 標記鏈接到不同的頁面。當用戶點擊鏈接時，URL 被推送到瀏覽器歷史堆棧。當用戶按下後退按鈕時，瀏覽器從歷史堆棧的頂部彈出該項目，因此活動頁面現在是之前訪問過的頁面。React Native 沒有像 Web 瀏覽器那樣的內置全局歷史堆棧的概念——這就是 React Navigation 的用武之地。

1. https://reactnavigation.org/docs/getting-started/#installation  
   `yarn add @react-navigation/native`
2. https://reactnavigation.org/docs/getting-started/#installing-dependencies-into-an-expo-managed-project  
   `npx expo install react-native-screens react-native-safe-area-context`  
   文件中有一項 Installing dependencies into a bare React Native project，**這個不需要安裝** 因為我們不是 bare React Native project，是 Expo managed project
3. https://reactnavigation.org/docs/getting-started#wrapping-your-app-in-navigationcontainer
4. https://reactnavigation.org/docs/getting-started#installation  
   `yarn add @react-navigation/native-stack`
5. https://reactnavigation.org/docs/hello-react-navigation#creating-a-native-stack-navigator

# 關於 React Navigation

1. screens 類型檢查 https://reactnavigation.org/docs/typescript/

# 注意事項

1. 用 SafeAreaView component 的時候要用 "react-native" 這個庫下面的
2. SafeAreaView 和 View 的差別在於 View 包含整個螢幕包括瀏海、相機鏡頭等地方，所以你的內容有可能被擋到。SafeAreaView 則是包含除了瀏海、相機鏡頭之外的範圍，所以你的內容比較不會被擋到
3. expo 內建 icon. see: https://docs.expo.dev/guides/icons/ and https://icons.expo.fyi/
4. 在 react native 所有元素預設都是 flex column

# connect apple app store

## set up

1. 使用 Apple Developer app 註冊 Apple Developer Program
2. 註冊須繳年費，身份認證，上傳身分證的步驟，有遇到問題，例如信用卡刷不過等可以聯絡 Apple Developer 的客服，https://developer.apple.com/ -> Support -> Contact us，或是直接訪問這個網址詢問問題 https://developer.apple.com/contact/#!/topic/select
3. Apple Developer Program 註冊完成後到 https://appstoreconnect.apple.com/  
   登入後才看得到畫面，否則看到的都是一片空白

## create test app for ipone physical device

https://docs.expo.dev/build/internal-distribution/

1. https://docs.expo.dev/build/internal-distribution/#configure-app-signing-credentials-for-ios  
   `eas device:create`  
   會產生一個 QRcode，用你的 iphone 掃描之後並下載他給的 profile，並照著他提供的設定到 setting -> VPN & Device Management 註冊他給的 profile  
   **_只有下載並安裝 provisioning profile 並開啟 Developer Mode 的 iphone 可以使用 iOS internal distribution build_**  
   **_如果你刪除了 eas 上面的專案要連同 app.json 的 eas:projectId 一起刪掉，他們是相關聯的_**
2. ipone 要開啟 Developer Mode
   1. 第 1 種方式 - 連接 mac 和 iphone 用 xcode 激活
      1. 要買 apple 的 develop program
      2. 把 mac, xcode 都更新到最新
      3. iphone 下載 Developer 並登入
      4. 拿條線連接 mac 和 iphone
      5. 在 xcode 點上方導覽列 window -> Device and Simulators
      6. 會看到顯示 Unavailable Device 並要你去 iphone 的 Settings -> Privacy & Security 打開 Developer Mode
      7. 如果沒有顯示可以多插拔幾次 iphone 看看
      8. 參考 https://developer.apple.com/documentation/xcode/enabling-developer-mode-on-a-device
   2. 第 2 種方式 - 直接下載 internal distribution builds 點擊激活
      https://docs.expo.dev/guides/ios-developer-mode/
      1. 在待會的第三步驟 `eas build --profile development --platform ios` 指令跑完之後會產生 QRCode，掃描 QRCode 之後直接下載 app 然後到 Settings -> Privacy & Security 打開 Developer Mode
3. 編譯 iOS app - iOS internal distribution build  
   **_只有下載並安裝 provisioning profile 並開啟 Developer Mode 的 iphone 可以使用 iOS internal distribution build_**
   https://docs.expo.dev/build/eas-json/#build-profiles  
   https://docs.expo.dev/build/setup/#build-for-app-stores  
   `eas build --profile development --platform ios`  
   執行命令後會出現 All credentials are ready to build @andygithub9/revenuecat-app-youtube (com.andygithub9.revenuecat2) 表示 eas 幫我們建立了 app store 的 Bundle ID  
   ***注意這個 Bundle ID 對 app store 是唯一鍵，所以不能用你之前用過的***  
   iOS 16 以上要安裝這個 build 要到 expo -> 專案 -> Builds -> 選擇你的 build -> 點擊 install -> 下面會有分享連結，用 iphone 輸入連結後下載並安裝 -> 安裝後到 app search 輸入專案名稱後就可以打開了
4. 到 https://appstoreconnect.apple.com/ -> 點擊左上角的加號會彈出 New App 的 modal -> 點擊 Bundle ID 會發現有我們這個專案的 Bundle ID  
   Bundle ID 可以在專案目錄底下的 app.json 找到
   ```json
   {
     "ios": {
       "bundleIdentifier": "in here"
     }
   }
   ```
5. 填寫 New App 的資訊
   1. Platforms: iOS
   2. Name: 自定義但是不能跟其他人的 App Name 重複
   3. Primary Language: 自己選
   4. Bundle ID: 選擇步驟四的 Bundle ID
   5. SKU: 自定義
   6. User Access: Full Access
   7. 點擊 Create
6. 點擊左側欄 Subscriptions ，記得視窗要拉寬一點否則會被藏起來
7. 在 Subscription Groups 點擊 Create 建立你的訂閱收費方案

# connect revenuecat

1. create revenuecat project，並完成基本設定
2. 點 revenuecat 左側欄 Products and pricing 下的 Products -> 點擊右上角 New -> 選擇你的專案 -> 這時候會看到要你輸入 Identifier，Identifier 在 app store connect -> 到 app store connect 左側欄 Subscriptions -> 點擊 Subscription Groups 下你創建的 Subscription -> 進去之後 Subscriptions 會有你建立的各種訂閱方案的 PRODUCT ID -> 回到 revenuecat 輸入 PRODUCT ID 點擊 create -> 點擊 revenuecat 左側欄 Offerings -> 點擊右上角 New -> 輸入自定義的 Identifier -> 點擊 ADD -> 點擊剛才創建的 Offering -> 點擊 Packages 旁邊的 New -> 選擇一個 Identifier -> 點擊 ADD -> 點擊剛才創建好的 Packages -> 點擊 Products 旁邊的 Attach -> 選擇你之前創建的 product -> 點擊 ATTACH  
   如果你有多個訂閱方案，例如月繳、季繳、年繳的話重複步驟 2 新增訂閱方案
3. 點擊 revenuecat 左側欄 Entitlement -> 點擊 New 在 Identifier 輸入字定義的名字 -> 點擊 ADD -> 點擊我們剛才創建的 Entitlement -> 點擊 Attach -> 選擇步驟 2 創建的 Products -> 點擊 ADD
4. 寫一個連接 revenuecat 的 custom hook ，參考 hooks/useRevenueCat.tsx  
   **_注意：Expo Go 不支持 revenuecat 的 'react-native-purchases' module，所以會出現錯誤：If you're trying to use a module that is not supported in Expo Go, you need to create a development build of your app. See https://docs.expo.dev/development/introduction/_**  
   意思是因為你有用到 Expo Go 沒有支持的模塊所以沒辦法用模擬器繼續必須使用真實物理設備安裝 app
5. 所以我們在 create test app for ipone physical device 這一節的第三步驟會在 Expo -> 選擇專案 -> Builds -> 找到我們產生的 iOS internal distribution build -> 點擊 Install 會彈出 QRCode -> 拿出你的 iphone 掃描 QRCode -> 在 iphone 點擊 install -> 在 iphone 的 App Library 搜尋 expo 的專案名稱，因為專案名稱就是我們下載的 app 安裝檔的名稱 -> 找到後點擊安裝
6. `eas device:create`  
   How would you like to register your devices? 選擇 Website  
   產生一個 QRcode，用你的 iphone 掃描之後並下載他給的 profile，並照著他提供的設定到 setting -> VPN & Device Management 註冊他給的 profile
7. `npx expo start` 用 iphone 掃描終端機出現的 QRCode，就可以開啟我們專案的 Development Build **_記得手機和電腦都要連同一個網路或 wifi_**，因為這段命令會在我們的電腦上開啟一個 server，我們必須將設備都連接到同一個網路上，手機才連的到電腦起的 server

# 生成 Android 檔案

1. `eas build -p android --profile preview` 生成 .apk 檔，用於開發
   https://docs.expo.dev/build-reference/apk/
2. `eas build --platform android` 生成 .aab 檔，用於生產環境並上架到 play 商店的檔案
   https://docs.expo.dev/build/setup/#build-for-app-stores
