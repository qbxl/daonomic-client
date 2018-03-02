// @flow

const sales = {
  development: '0xcb872dcc85ee14576a8c917d230ba00ca2f46150',
  production: '0xcb872dcc85ee14576a8c917d230ba00ca2f46150',
};

export const realm = '5a8c1b2ec6bcce780d2e9e22';
export const sale: string = sales[process.env.API] || sales.production;
export const contactEmail = 'support@trustwalletapp.com';
export const termsOfServiceURL =
  'https://trustwalletapp.com/assets/token_sale_terms.pdf';
