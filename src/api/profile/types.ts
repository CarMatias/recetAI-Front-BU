import { Notice } from "../../schemas/Notice";

export interface ProfileApi {
  postNewNotice(
    notice:string,
    day:string[],
    hour:string,
    id_user:string
  ):void;
  getNoticeByUser(
    id_user:string,
  ):Promise<Notice[] | undefined>;
}
