import "./index.css"

export const BackgroundLine = ({ className } : { className?: string }) =>(
    <svg className={`background-line ${className}`} xmlns="http://www.w3.org/2000/svg" width="978" height="1014" viewBox="0 0 978 1014" fill="none">
        <path d="M73 1C-7.39999 94.6 3.83334 247.333 19.5 312C28.3333 358.167 86.1 446.8 246.5 432C447 413.5 406.5 192 557 233.5C677.4 266.7 720.833 369.667 727.5 417C728.5 487.167 749.9 623.8 827.5 609C924.5 590.5 1021.5 709 953 742.5C884.5 776 814.5 841.5 761 804.5C707.5 767.5 570.5 650.5 452 757.5C333.5 864.5 233 953 183 923C143 899 45 981 1 1025" stroke="currentColor" stroke-width="2"/>
    </svg>
)