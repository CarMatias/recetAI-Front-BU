import {API_URL} from '..';
import axios from 'axios';
import { Notice } from '../../schemas/Notice';


class ProfileUserApi {
    async postNewNotice(notice: string, day: string[], hour: string, id_user: string) {
        try{
            const res = await axios.post(API_URL+'/newNotice',{data:{notice,day,hour,id_user}});
        }catch(e){
            console.log(e)
        }

    }
    async getNoticeByUser(id_user:string):Promise<Notice[] | undefined>{
        try {
            const res = await axios.post(API_URL+'/getnotice',{id_user})
            const notices:Notice[] = res?.data.map((n: { notice: any; hour: any; day: any; })=>({
                notice:n.notice,
                hour:n.hour,
                day:n.day,
            }))
            return notices
            console.log(await notices)
        } catch (error) {
            console.log(error)
        }
    }

}
export default new ProfileUserApi()