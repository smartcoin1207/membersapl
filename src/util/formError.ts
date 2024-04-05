export const REQUIRED_ERROR = 'この項目は必須です';
export const maxLengthString = (label: string, length: number) =>
  `${label}は${length}文字以内で入力してください。`;
export const minLengthString = (label: string, length: number) =>
  `${label}は${length}文字以上で入力してください。`;
