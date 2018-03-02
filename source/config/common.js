// @flow

const sales = {
  development: '0x57c1e3341aa84d44baf9b3ad92716ef22418f9e4',
  production: '0x99a09f0d85bc6e95e110348a8522f98443e31c4a',
};

export const realm = '5a7f5cf23f6b6b92b6fdd68a';
export const sale: string = sales[process.env.API] || sales.production;
export const contactEmail = 'dev@0v1se.com';
export const termsOfServiceURL = 'terms.url';
