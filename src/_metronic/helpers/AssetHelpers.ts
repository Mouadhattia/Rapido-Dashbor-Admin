export const toAbsoluteUrl = (pathname: string) => process.env.PUBLIC_URL + pathname
export function formatDate(stringDate:string |undefined):string |undefined {

    if(stringDate){
        const date = new Date(stringDate);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear().toString().slice(-2);
        const hour = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        return `${day}/${month}/${year} ${hour}:${minutes}`;
    }
 
    
}