import type {AuthState} from './auth';
import type {ChatState} from './chat';

export type User = {
  account_holder?: string;
  account_number?: string;
  account_type?: string;
  active: number;
  addition?: string;
  address: string;
  bank_name?: string;
  bank_number?: string;
  branch_name?: string;
  branch_number?: string;
  created: string;
  del_flag: number;
  first_name: string;
  first_name_kana: string;
  gendar: number;
  icon_image?: string;
  id: number;
  last_login_date: string;
  last_name: string;
  last_name_kana: string;
  late_night_salary_unit_price?: number;
  login_id: string;
  login_status: number;
  mail: string;
  modified: string;
  note?: string;
  notificaiton_setting: {mention_flag: string; show_message_flag: string};
  notification_channel: number;
  post_code: string;
  regular_salary_unit_price?: number;
  reserve1?: string;
  reserve2?: string;
  role_id: number;
  save_dir_name?: string;
  select_client_id: number;
  tel: string;
  ws_token?: string;
};

export type StateRedux = {
  auth: AuthState;
  chat: ChatState;
};
