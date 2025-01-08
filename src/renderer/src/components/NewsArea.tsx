import {Area,AreaHeader,AreaBody} from "./Area";
import {Speech} from "./Speech";

export default function NewsArea(){
    return(
        <Area>
            <AreaHeader>ニュース</AreaHeader>
            <AreaBody bg={"transparent"} shadow={"none"}>
                <Speech>
                    あいうえお
                </Speech>
            </AreaBody>
        </Area>
    );
}