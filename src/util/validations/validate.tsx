import {number, ref, string} from 'yup';

import {NON_NUMBER_REGEX} from '../../constants/regex';
import {REQUIRED_ERROR, maxLengthString, minLengthString} from '../formError';

export const validateForm = () => {
  return {
    login: string().required(REQUIRED_ERROR),
    current_password: string().required(REQUIRED_ERROR),
    password: string().required(REQUIRED_ERROR),
    first_name: string()
      .required(REQUIRED_ERROR)
      .matches(NON_NUMBER_REGEX, '氏名(名)には数字以外を入力してください'),
    last_name: string()
      .required(REQUIRED_ERROR)
      .matches(NON_NUMBER_REGEX, '氏名(姓)には数字以外を入力してください」'),
    addition: string().max(50, '50文字以内で入力してください'),
    email: string().required(REQUIRED_ERROR).email('電子メールが無効です'),
    confirmPassword: string()
      .required(REQUIRED_ERROR)
      // .min(VALIDATE.minPassLength, trans("validate.minConfirmPassError"))
      // .max(VALIDATE.maxPassLength, trans("validate.maxConfirmPassError"))
      .oneOf(
        [ref('password'), null],
        'パスワードがパスワードと一致しないことを確認する',
      ),

    fullname: string()
      .required(REQUIRED_ERROR)
      .max(100, maxLengthString('フルネーム', 100)),
    phone: string()
      .required(REQUIRED_ERROR)
      .min(7, minLengthString('電話番号', 7))
      .max(11, maxLengthString('電話番号', 11)),
    prefix: string().required(REQUIRED_ERROR),
    is_volunteer: number().required(REQUIRED_ERROR),
    dob: string().required(REQUIRED_ERROR),
    location: string().required(REQUIRED_ERROR),
    language: string().required(REQUIRED_ERROR),
  };
};
