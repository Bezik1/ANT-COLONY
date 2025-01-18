import "./index.css"

export const PheromonIcon = ({ className, onClick, pheromonColor } : { className?: string | boolean, onClick?: () => void, pheromonColor: string }) =>(
    <svg
        className={`small-btn btn ${className}`}
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="18"
        viewBox="0 0 22 18"
        fill="none"
        style={{color: pheromonColor || "#de8181", transition: ".5s" }}
    >
        <path d="M18.428 12.4282C18.1488 12.149 17.7932 11.9587 17.406 11.8812L15.0185 11.4037C13.7101 11.1421 12.3519 11.324 11.1585 11.9207L10.8411 12.0793C9.64772 12.676 8.28948 12.8579 6.98113 12.5963L5.04938 12.2099C4.39366 12.0788 3.71578 12.284 3.24294 12.7569M6.9998 1H14.9998L13.9998 2V7.17157C13.9998 7.70201 14.2105 8.21071 14.5856 8.58579L19.5856 13.5858C20.8455 14.8457 19.9532 17 18.1714 17H3.82823C2.04642 17 1.15409 14.8457 2.41401 13.5858L7.41402 8.58579C7.78909 8.21071 7.9998 7.70201 7.9998 7.17157V2L6.9998 1Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)