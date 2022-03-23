
const ChevronDown = ()=> {
    return (
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 1792 1792">
        <path d="M996,1314.5c-55.2,55.2-139.5,55.2-194.8,0c-2.4-2.8-2.4-2.8-2.4-2.8L154.4,670.1c-52.4-55.2-52.4-139.2,0-194.4
        c55.2-52.8,139.5-52.8,194.4,0l549.7,552.1l547.2-546.9c52.4-52.4,139.5-52.4,192,0c52.4,52.8,52.4,139.5,0,192L996,1314.5z"/>
        </svg>
    );
}
const ChevronUp = ()=> {
    return (
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 1792 1792">
        <path d="M796,477.5c55.2-55.2,139.5-55.2,194.8,0c2.4,2.8,2.4,2.8,2.4,2.8l644.4,641.6c52.4,55.2,52.4,139.2,0,194.4
        c-55.2,52.8-139.5,52.8-194.4,0L893.6,764.2l-547.2,546.9c-52.4,52.4-139.5,52.4-192,0c-52.4-52.8-52.4-139.5,0-192L796,477.5z"/>
        </svg>
    );
}


const Chevron = (open : boolean) => {
    return (
        open ? <ChevronUp/> : <ChevronDown/>
    );
}

export default Chevron;