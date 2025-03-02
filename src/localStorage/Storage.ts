const StoreItem = (Data : any) => {
     localStorage.setItem("Data",Data);
}

const ClearItem = ()=>{
     localStorage.removeItem("Data")
}