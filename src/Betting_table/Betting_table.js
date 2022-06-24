import React, {useState, useEffect} from "react";
import axios from "axios";
import classes from './Betting_table.module.css';


function Betting_table() {

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
        let arr1 = info.splice(1)

        const sorted = arr1.sort((a, b) => {
               /*   console.log( a[sortField], 're');
                  console.log( b[sortField], 're');*/
                  if (a[sortField] === null) return 1;
               // if ( b[sortField] == info[0]) return;
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

        // if (sortField) {
        //     const sorted = info.sort((a, b) => {
        //         return (
        //         //     (b - a)
        //             a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
        //                 numeric: true,
        //             })
        //            * (sortOrder === "asc" ? 1 : -1)
        //         );
        //     });
         setInfo(arr);
    };



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
    )
}


export default Betting_table;