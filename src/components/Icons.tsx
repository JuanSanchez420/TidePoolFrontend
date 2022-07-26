import React from "react"

const ChevronDown = (props: React.SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      {...props}
      viewBox="0 0 1792 1792"
    >
      <path
        d="M996,1314.5c-55.2,55.2-139.5,55.2-194.8,0c-2.4-2.8-2.4-2.8-2.4-2.8L154.4,670.1c-52.4-55.2-52.4-139.2,0-194.4
        c55.2-52.8,139.5-52.8,194.4,0l549.7,552.1l547.2-546.9c52.4-52.4,139.5-52.4,192,0c52.4,52.8,52.4,139.5,0,192L996,1314.5z"
      />
    </svg>
  )
}
const ChevronUp = (props: React.SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      {...props}
      viewBox="0 0 1792 1792"
    >
      <path
        d="M796,477.5c55.2-55.2,139.5-55.2,194.8,0c2.4,2.8,2.4,2.8,2.4,2.8l644.4,641.6c52.4,55.2,52.4,139.2,0,194.4
        c-55.2,52.8-139.5,52.8-194.4,0L893.6,764.2l-547.2,546.9c-52.4,52.4-139.5,52.4-192,0c-52.4-52.8-52.4-139.5,0-192L796,477.5z"
      />
    </svg>
  )
}

export const Chevron = ({ open }: { open: boolean }) => {
  return open ? <ChevronUp /> : <ChevronDown />
}

export const Cog = (props: React.SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      fill="currentColor"
      {...props}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z" />
    </svg>
  )
}

export const getIconURL = (chain: string, address: string | undefined) => {
  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chain.toLowerCase()}/assets/${address}/logo.png`
}

export const External = (props: React.SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  )
}

export const LeftArrow = (props: React.SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  )
}

export const Search = (props: React.SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  )
}

export const Hamburger = (props: React.SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  )
}

export const Wallet = (props: React.SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      fill="currentColor"
      viewBox="0 0 501.333 501.333"
      stroke="currentColor"
      strokeWidth={2}
    >
      <g>
        <g>
          <path
            d="M448,41.6H22.4C9.6,41.6,0,51.2,0,64v373.333c0,12.8,9.6,22.4,22.4,22.4H448c29.867,0,53.333-23.467,53.333-52.267V94.934
                    C501.333,65.067,476.8,41.6,448,41.6z M455.467,298.667H274.134V201.6h181.333V298.667z M455.467,156.8h-204.8
                    c-12.8,0-22.4,9.6-22.4,22.4v142.933c0,12.8,9.6,22.4,22.4,22.4h204.8v62.933c0,4.267-3.2,7.467-7.467,7.467H44.8V87.466H448
                    c4.267,0,7.467,3.2,7.467,7.467V156.8z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M328.534,228.267h-7.467c-12.8,0-22.4,9.6-22.4,22.4c0,12.8,9.6,22.4,22.4,22.4h7.467c12.8,0,22.4-9.6,22.4-22.4
                    C350.934,237.867,341.334,228.267,328.534,228.267z"
          />
        </g>
      </g>
    </svg>
  )
}

export const Blob = (props: React.SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <svg viewBox="0 0 200 200" {...props} xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M39.8,-65.6C52.8,-61.3,65.6,-53.3,72.3,-41.7C78.9,-30.2,79.3,-15.1,80,0.3C80.6,15.8,81.3,31.6,72.8,39.9C64.3,48.2,46.5,48.9,32.8,57.6C19.1,66.2,9.6,82.6,-0.9,84.2C-11.4,85.7,-22.7,72.4,-33,61.8C-43.3,51.3,-52.5,43.4,-63.4,33.6C-74.3,23.7,-87,11.9,-89,-1.2C-91,-14.2,-82.4,-28.4,-74,-42.6C-65.6,-56.8,-57.4,-71,-45.1,-75.7C-32.8,-80.4,-16.4,-75.6,-1.5,-72.9C13.3,-70.3,26.7,-69.8,39.8,-65.6Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}
