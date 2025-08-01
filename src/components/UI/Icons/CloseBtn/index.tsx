import "./index.css"

export const CloseBtn = ({ className, onClick } : { className?: string, onClick?: () => void }) =>(
    <svg className={`${className}`} onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)