import utils from '../helpers/utils'

it('Format Number (for currency)', () => {
  expect(utils.formatNumber(123456)).toEqual('123.456');
  expect(utils.formatNumber(0)).toEqual("0");
  expect(utils.formatNumber(2000000000)).toEqual("2.000.000.000");
  expect(utils.formatNumber(null)).toEqual("--");
});
