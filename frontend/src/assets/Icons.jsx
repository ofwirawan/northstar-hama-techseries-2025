export const FeatureShapeOne = ({ className, children }) => {
  return (
    <svg
      width="60px"
      height="60px"
      viewBox="0 0 126 126"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background shape */}
      <path
        d="M73.5687 4.90283C81.9169 -4.34881 97.229 2.00789 96.5961 14.4585V14.4595C96.1749 22.8877 103.112 29.8252 111.54 29.4038H111.541C123.765 28.7811 130.119 43.6085 121.517 52.0356L121.096 52.4312C114.838 58.0731 114.84 67.896 121.095 73.5679L121.096 73.5688C130.204 81.7864 124.187 96.7516 112.12 96.6138L111.54 96.5962L111.147 96.5815C102.897 96.3915 96.1813 103.244 96.5961 111.541V111.542C97.2286 123.959 81.9166 130.319 73.5677 121.096H73.5687C67.9269 114.838 58.1039 114.84 52.432 121.095L52.431 121.096C44.0829 130.348 28.7706 123.991 29.4037 111.541C29.8251 103.112 22.8875 96.175 14.4594 96.5962H14.4584C2.04064 97.229 -4.31888 81.918 4.90271 73.5688C11.1607 67.9269 11.159 58.1041 4.90369 52.4321L4.90271 52.4312C-4.3492 44.083 2.00768 28.7708 14.4584 29.4038H14.4594C22.8874 29.825 29.8249 22.8875 29.4037 14.4595V14.4585C28.7807 2.23425 43.6084 -4.11922 52.0355 4.48291L52.432 4.90381C58.1045 11.1598 67.8953 11.1598 73.5677 4.90381L73.5687 4.90283Z"
        fill="#7F8CAA"
        stroke="black"
      />

      {/* FileTextIcon in center (scaled down) */}
      <g transform="translate(38, 38) scale(2)">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" 
              fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2v4a2 2 0 0 0 2 2h4" 
              fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 9H8" 
              fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 13H8" 
              fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 17H8" 
              fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
};

export const FeatureShapeTwo = () => {
  return (
    <svg
      width="60px"
      height="60px"
      viewBox="0 0 126 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background shape */}
      <path
        d="M125.269 0.730469C113.515 41.4114 113.516 84.5875 125.269 125.269C84.5875 113.516 41.4114 113.515 0.730469 125.269C12.4834 84.5877 12.4834 41.4123 0.730469 0.731445C41.3807 12.4844 84.5873 12.4834 125.269 0.730469Z"
        fill="#7F8CAA"
        stroke="black"
      />

      {/* MessagesSquareIcon centered */}
      <g transform="translate(39, 39) scale(2)">
        <path
          d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
