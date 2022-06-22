import React, {useState, useEffect} from "react";
import axios from "axios";
import classes from './Betting_table.module.css';


function Betting_table() {

    const [info, setInfo] = useState([]);

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
        <div className={classes.tableContainer}>
            <table>
                <tr>
                    {info[0] && info[0].map((data, index) => (
                            <th>{data}</th>
                    ))}
                </tr>
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
            </table>
        </div>
    )
}


export default Betting_table;