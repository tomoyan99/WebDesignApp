import DatePicker, {DatePickerProps} from "react-datepicker";
import "./datePickerStyle.css";

function MyDatePicker(props: DatePickerProps) {
    return <DatePicker {...props}/>
}

export default MyDatePicker;
