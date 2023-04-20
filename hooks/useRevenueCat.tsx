import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases, {
  CustomerInfo,
  PurchasesOffering,
} from "react-native-purchases";

const APIKeys = {
  apple: "appl_CPgzGNEORAjvFKYLgWlwmOiMURv", // 在 revenuecat -> 導覽列點擊 Projects -> 點擊左側欄 API Keys -> 點擊 Public app-specific API keys 的 Key 的 Show key -> 點擊複製貼到這邊
  google: "your_revenuecat_google_api_key",
};

const typesOfMembership = {
  monthly: "proMonthly2",
  yearly: "ProYearly2",
};

function useRevenueCat() {
  // https://revenuecat.github.io/react-native-purchases-docs/5.7.0/interfaces/PurchasesOffering.html
  const [currentOffering, setCurrentOffering] =
    useState<PurchasesOffering | null>(null);

  // https://revenuecat.github.io/react-native-purchases-docs/5.3.2/interfaces/CustomerInfo.html
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

  console.log("customerInfo: ", customerInfo);
  const isProMember =
    customerInfo?.activeSubscriptions.includes(typesOfMembership.monthly) ||
    customerInfo?.activeSubscriptions.includes(typesOfMembership.yearly);

  useEffect(() => {
    const fetchData = async () => {
      // https://www.npmjs.com/package/react-native-purchases/v/2.2.0#2-initialize-an-rcpurchases-object
      Purchases.setDebugLogsEnabled(true);

      // 偵測設備的 OS 用不同的 configure
      console.log(Platform.OS);
      if (Platform.OS == "android") {
        await Purchases.configure({ apiKey: APIKeys.google });
      } else {
        await Purchases.configure({ apiKey: APIKeys.apple });
      }

      const offerings = await Purchases.getOfferings();
      const customerInfo = await Purchases.getCustomerInfo();

      setCustomerInfo(customerInfo);
      setCurrentOffering(offerings.current);
    };

    // fetchData().catch((error) => console.error(error));
    // fetch.catch() @param onrejected — The callback to execute when the Promise is rejected.
    // promise 被 reject 之後會執行裡面的 callback 所以可以傳入 console.error 這個 function 就可以了
    // 所以可以簡化成下面這行
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#description
    // Async functions always return a promise.
    const customerInfoUpdated = async (purchaserInfo: CustomerInfo) => {
      setCustomerInfo(purchaserInfo);
    };

    // 監聽用戶資訊更新，可能用戶訂閱或取消訂閱等動作
    Purchases.addCustomerInfoUpdateListener(customerInfoUpdated);
  }, []);

  return { currentOffering, customerInfo, isProMember };
}

export default useRevenueCat;
