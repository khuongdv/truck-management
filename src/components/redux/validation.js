import dayjs from 'dayjs';

export const required = value => (value != null && `${value}`.length > 0 ? undefined : 'Vui lòng nhập trường này');
export const comboboxRequired = value => (value || value == 0 ? undefined : 'Vui lòng nhập trường này');
export const maxLength = max => value => (value && value.length > max ? `Vui lòng nhập tối đa ${max} ký tự` : undefined);
export const minLength = min => value => (value && value.length < min ? `Vui lòng nhập tối thiểu ${min} ký tự` : undefined);

export const number = value => (value && isNaN(Number(value)) ? 'Yêu cầu nhập định dạng số' : undefined);
export const integer = value => (value && !/^[0-9]+$/i.test(value) ? 'Yêu cầu nhập định dạng số nguyên' : undefined);

export const numberGt = number => value => (value && Number(value) <= number ? `Số nhập vào phải >${number}` : undefined);
export const numberGte = number => value => (value && Number(value) < number ? `Số nhập vào phải >=${number}` : undefined);
export const numberLte = number => value => (value && Number(value) > number ? `Số nhập vào phải <=${number}` : undefined);
export const minValue = min => value => (value && value < min ? `Yêu cầu nhập tối thiểu ${min} ký tự` : undefined);

export const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(value) ? 'Yêu cầu nhập đúng định dạng email' : undefined);

export const mobile = value => (value && !/^(0|84|\+84)?[1-9]\d{8,9}$/i.test(value) ? 'Yêu cầu nhập đúng định dạng số điện thoại' : undefined);
export const username = value =>
  value && !/^[A-Za-z0-9_]{4,20}$/i.test(value) ? 'Username chỉ chứa ký tự không dấu, chữ số và dấu _, từ 4 đến 20 ký tự' : undefined;
export const birthday = value => (value && dayjs(value).isAfter(dayjs()) ? 'Ngày sinh không được quá ngày hiện tại' : undefined);
export const url = value =>
  value && !/^((http|ftp|https):\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i.test(value)
    ? 'Yêu cầu nhập đúng định dạng url'
    : undefined;

export const httpsUrl = value =>
  value && !/^((https):\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i.test(value)
    ? 'Yêu cầu nhập đúng định dạng url(HTTPS)'
    : undefined;

const phoneNumber = value => (value && !/^(0|84|\+84)?[1-9]\d{8,9}$/i.test(value) ? 'Số điện thoại không hợp lệ!' : undefined);
const fax = value => (value && !/^(0|84|\+84)?[1-9]\d{8,9}$/i.test(value) ? 'Số fax không hợp lệ!' : undefined);
export const alphaNumberic = value => (value && !/^[A-Za-z0-9]{0,100}$/i.test(value) ? 'Giá trị chỉ được chứa chữ cái và chữ số' : undefined);

export const alphaNumberic2 = value =>
  value && !/^[A-Za-z0-9]{1}[A-Za-z0-9_\-]{0,50}$/i.test(value) ? 'Giá trị chỉ được chứa chữ cái, số, _ và -' : undefined;
export const password = value => (value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,50}$/g.test(value) ? 'Mật khẩu chỉ chứa chữ hoa chữ thường, chữ số và một số ký tự đặc biệt, có từ 6 ký tự trở lên' : undefined);
export const truckPlate = value => (value && !/^[0-9]{2}[A-Z]\-[0-9]{4,5}$/g.test(value) ? 'Biển số không đúng quy chuẩn. Ví dụ đúng: 29A-12345' : undefined);
export const selectMaxTen = value => value && value.length > 0 && value.length < 11 ? undefined : 'Không được chọn quá 10 cargo types';
export const dimension = value => {
  if (value && !/^\d*\.?\d+\-\d*\.?\d+\-\d*\.?\d+$/.test(value)){
    return 'Nhập kích thước cho đúng, ví dụ: 10-2-2'
  }
  let spl = value.split('-')
  if(parseInt(spl[0], 10) <= 0 || parseInt(spl[1], 10) <= 0 || parseInt(spl[2], 10) <= 0) {
    return 'Kích thước không thể bằng 0'
  }
  return undefined
};


const maxLength30 = maxLength(30);
const maxLength20 = maxLength(20);
const maxLength11 = maxLength(11);
const maxLength10 = maxLength(10);
const maxLength1500 = maxLength(1500);
const maxLength200 = maxLength(200);
const maxLength500 = maxLength(500);
const minLength6 = minLength(6);
const gt0 = numberGt(0);
const gt1 = numberGt(1);
const gte0 = numberGte(0);
const gte1 = numberGte(1);
const lte100 = numberLte(100);
export default {
  password,
  truckPlate,
  required,
  number,
  selectMaxTen,
  comboboxRequired,
  minValue,
  username,
  birthday,
  email,
  dimension,
  integer,
  mobile,
  url,
  httpsUrl,
  alphaNumberic,
  phoneNumber,
  fax,
  maxLength30,
  maxLength20,
  maxLength1500,
  maxLength200,
  maxLength500,
  maxLength11,
  maxLength10,
  minLength6,
  gt0,
  gt1,
  gte0,
  gte1,
  alphaNumberic2,
  lte100,
};
