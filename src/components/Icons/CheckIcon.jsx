export default ({fill, size, height, width, ...props}) => {
  return (
    <svg 
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
    <path 
      d="M4 12.6111L8.92308 17.5L20 6.5" 
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round" 
      strokeLinejoin="round"
      />
    </svg>
  )
}