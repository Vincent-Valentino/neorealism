import React from "react";
import {Pane, FileCard, FileUploader} from "evergreen-ui";

function FileUploaderSingleUploadDemo({desc}) {
  const [files, setFiles] = React.useState([])
  const [fileRejections, setFileRejections] = React.useState([])
  const handleChange = React.useCallback((files) => setFiles([files[0]]), [])
  const handleRejected = React.useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
  const handleRemove = React.useCallback(() => {
    setFiles([])
    setFileRejections([])
  }, [])
  return (
    <Pane maxWidth={654}>
      <FileUploader
        label={desc}
        description="Upload File"
        maxSizeInBytes={50 * 1024 ** 2}
        maxFiles={1}
        onChange={handleChange}
        onRejected={handleRejected}
        renderFile={(file) => {
          const { name, size, type } = file
          const fileRejection = fileRejections.find((fileRejection) => fileRejection.file === file)
          const { message } = fileRejection || {}
          return (
            <FileCard
              key={name}
              isInvalid={fileRejection != null}
              name={name}
              onRemove={handleRemove}
              sizeInBytes={size}
              type={type}
              validationMessage={message}
            />
          )
        }}
        values={files}
      />
    </Pane>
  )
}

export default FileUploaderSingleUploadDemo;