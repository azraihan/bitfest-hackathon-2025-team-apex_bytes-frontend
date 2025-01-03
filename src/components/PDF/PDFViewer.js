import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import { Box, Button, Typography } from '@mui/material';
// import { Upload } from 'lucide-react';

// const FileUploadControls = ({ onFileSelect, isDragging, onDrop, onDragOver, onDragLeave }) => {
//   return (
//     <Box
//       sx={{
//         width: '100%',
//         padding: '32px',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: '16px',
//         borderBottom: '1px solid #e0e0e0',
//         backgroundColor: isDragging ? '#e3f2fd' : '#f5f5f5',
//         minHeight: '120px',
//         border: isDragging ? '2px dashed #2196f3' : 'none',
//         transition: 'all 0.2s ease'
//       }}
//       onDrop={onDrop}
//       onDragOver={onDragOver}
//       onDragLeave={onDragLeave}
//     >
//       <Button
//         variant="contained"
//         component="label"
//         startIcon={<Upload />}
//         sx={{ height: '42px' }}
//       >
//         Upload PDF
//         <input
//           type="file"
//           accept=".pdf"
//           onChange={onFileSelect}
//           hidden
//         />
//       </Button>
//       <Typography variant="body2" color="text.secondary">
//         or drag and drop PDF file here
//       </Typography>
//     </Box>
//   );
// };

function PDFViewer() {
  const viewerDiv = useRef(null);
  const [instance, setInstance] = useState(null);
  // const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    WebViewer({
      path: 'lib',
      fullAPI: true,
    }, viewerDiv.current).then(inst => {
      setInstance(inst);
    });
  }, []);

  // const handleDrop = async (e) => {
  //   e.preventDefault();
  //   setIsDragging(false);
    
  //   const files = e.dataTransfer.files;
  //   if (files.length > 0 && instance) {
  //     const file = files[0];
  //     await loadDocument(file);
  //   }
  // };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  //   setIsDragging(true);
  // };

  // const handleDragLeave = () => {
  //   setIsDragging(false);
  // };

  // const handleFileSelect = async (e) => {
  //   const file = e.target.files[0];
  //   if (file && instance) {
  //     await loadDocument(file);
  //   }
  // };

  // const loadDocument = async (file) => {
  //   const fileReader = new FileReader();
    
  //   fileReader.onload = async () => {
  //     const arrayBuffer = fileReader.result;
  //     await instance.Core.documentViewer.loadDocument(arrayBuffer, { filename: file.name });
  //   };
    
  //   fileReader.readAsArrayBuffer(file);
  // };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* <FileUploadControls 
        onFileSelect={handleFileSelect}
        isDragging={isDragging}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      /> */}
      
      <Box 
          ref={viewerDiv} 
          className="webviewer"
          sx={{ 
            width: '100%', 
            height: '100%'
          }}
      />
    </Box>
  );
}

export default PDFViewer;