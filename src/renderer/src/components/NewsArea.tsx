import {Area,AreaHeader,AreaBody} from "./Area";
import {Speech} from "./Speech";

export default function NewsArea(){
    return(
        <Area>
            <AreaHeader>ニュース</AreaHeader>
            <AreaBody>
                <Speech/>
            </AreaBody>
        </Area>
    );
}