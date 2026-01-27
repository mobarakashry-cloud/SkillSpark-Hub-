// piTestnet.js

// استخدم node-fetch بطريقة تدعم require
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Pi Testnet Base URL
const BASE_URL = "https://testnet-api.minepi.com/v2"; // Testnet API
const SERVER_API_KEY = "tjiiuk6iskzpe6moycsm7ry14beehxklakunfhzxqogc8ft4puwal2yzaqdkgsb2"; // Server API Key
const APP_WALLET = "GDYL6X4XI6JEKXP4ZTOMJNZXXVE3FGE7T3VBG6U5AZXAV24XG3VK4QSU"; // App Wallet Address

// دالة تجريبية لإرسال دفعة
async function sendPayment(toUserId, amount) {
  try {
    const response = await fetch(`${BASE_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SERVER_API_KEY}`
      },
      body: JSON.stringify({
        from: APP_WALLET,  // المحفظة التجريبية للتطبيق
        to: toUserId,       // USER_PI_ID للتجربة
        amount: amount
      })
    });

    const data = await response.json();
    console.log("Payment Response:", data);
  } catch (err) {
    console.error("Error making payment:", err);
  }
}

// دالة لجلب رصيد المحفظة التجريبية للتطبيق
async function getAppBalance() {
  try {
    const response = await fetch(`${BASE_URL}/balances/${APP_WALLET}`, {
      headers: {
        "Authorization": `Bearer ${SERVER_API_KEY}`
      }
    });
    const data = await response.json();
    console.log("App Wallet Balance:", data);
  } catch (err) {
    console.error("Error fetching balance:", err);
  }
}

// نفذ التجربة
(async () => {
  await getAppBalance();
  // جرب ترسل 1 Test-Pi لأي USER_PI_ID (ضعه هنا)
  await sendPayment("USER_PI_ID_EXAMPLE", 1);
})();
