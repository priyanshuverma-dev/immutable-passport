import { config, passport } from "@imtbl/sdk";

const passportInstance = new passport.Passport({
  clientId: "v8z9guoHHStuTeybmudEV9g3m2cXG94r",
  baseConfig: new config.ImmutableConfiguration({
    environment: config.Environment.SANDBOX,
  }),

  redirectUri: "http://localhost:3000/callback",
  logoutRedirectUri: "http://localhost:3000",
  audience: "platform_api",
  scope: "openid offline_access email transact",
});

const logout = async () => await passportInstance.logout();

const provider = passportInstance.connectEvm();
const fetchAuth = async () => {
  try {
    const account = await provider.request({
      method: "eth_requestAccounts",
    });

    console.log("connected");
    console.log("acc", account);
  } catch (error) {
    console.log(error);
  } finally {
    window.location.reload();
  }
};

async function initiateTransaction() {
  try {
    const account = await passportInstance.getIdToken();

    const addresses = await provider.request({
      method: "eth_accounts",
      params: [{ idtoken: account }],
    });

    console.log(addresses); // ['0x...']
  } catch (error) {
    console.log(error);
  }
}

export { passportInstance, logout, fetchAuth, initiateTransaction };
