
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


export const Chevron = (open : boolean) => {
    return (
        open ? <ChevronUp/> : <ChevronDown/>
    );
}

export const Cog = () => {
    return (
      <svg fill="currentColor" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"/></svg>
    )
  }
  
export const getIconURL = (chain: string, address: string | undefined) => {
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chain.toLowerCase()}/assets/${address}/logo.png`
}

export const External = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="1rem" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
    )
}

export const LeftArrow = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="1rem" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
    )
}