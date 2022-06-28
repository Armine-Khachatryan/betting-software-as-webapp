import React, {useState, useEffect} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Calendar from '../app/assets/images/calendar.png';
import "react-datepicker/dist/react-datepicker.css";
import classes from './Betting_table.module.css';


function Betting_table() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [info, setInfo] = useState([]);
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");

    const handleSortingChange = (accessor) => {
        const sortOrder =
            accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    };


    const handleSorting = (sortField, sortOrder) => {
        let arr = info[0]
        console.log(info[0])
        let arr1 = info.splice(1)
        console.log(sortField);

        const sorted = arr1.sort((a, b) => {
                  if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                );
            });

        arr = [arr, ...sorted]
        console.log(arr);
         setInfo(arr);
    };


    const handleSortingDate = () =>{
        let array = info.splice(1)
        console.log(array);
        console.log (array[0])
        console.log(endDate , "endDate")
        const resultDate = array.filter((item)=>{
            console.log(endDate , "endDate")
            if (new Date(item[0]).getTime() <= endDate.getTime() && new Date(item[0]).getTime() >= startDate.getTime()){
                return item[0]
            }
        })

        setInfo([info[0],...resultDate]);

    }


    useEffect(() => {
        axios.get(`https://xlsx-data.herokuapp.com/api/worksheet`).then(res => {
            console.log(res)
            let result = res.data;
            setInfo(result);
            console.log(result, "result");
        }).catch((e) => {
            console.log(e, "error")
        })
    }, []);
    return (
        <>
                <div className={classes.selectDivs}>
                    <div className={classes.searchInputSmallDiv}>
                        <label className={classes.labelSearchSmall} htmlFor="startDate" >Start Date</label>
                        <div className={classes.divForCalendar}>
                            <label htmlFor="startDate">
                                <img className={classes.calendarImg} src={Calendar} alt="calendar"/>
                            </label>
                            <DatePicker className={classes.inputSearchSmall}  name="startDate" id={'startDate'} selected={startDate} onChange={(date) => {
                                setStartDate(date)
                            }}/>
                        </div>
                    </div>
                    <div className={classes.searchInputSmallDiv}>
                        <label className={classes.labelSearchSmall} htmlFor="endDate" >End Date</label>
                        <div className={classes.divForCalendar}>
                            <label htmlFor="endDate">
                                <img className={classes.calendarImg} src={Calendar} alt="calendar"/>
                            </label>
                            <DatePicker className={classes.inputSearchSmall}   name="endDate" id={'endDate'} selected={endDate} onChange={(date) => setEndDate(date)}/>
                        </div>
                    </div>
                    <button className={classes.searchBtn} onClick={handleSortingDate}>Search</button>
                </div>

            <div className={classes.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            {info[0] && info[0].map((data, accessor) => (
                                    <th key={accessor}  onClick={() => handleSortingChange(accessor)}>{data}</th>
                            ))}
                        </tr>
                    </thead>
                   <tbody>
                        {info.length !== 0 && info.map((val, index) =>{
                            if (index !== 0){
                                return(
                        <tr>
                            {val.map((item, key) => (
                                <td>{item}</td>))
                            }

                        </tr>
                                )
                            }
                        })}
                   </tbody>
                </table>
            </div>
        </>
    )
}


export default Betting_table;