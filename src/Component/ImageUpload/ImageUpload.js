import { Close, Delete, InsertPhoto, PhotoCamera } from "@mui/icons-material";
import { Button, Card, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const ImageUpload = ({ attachments,setImage ,image, thumbnail}) => {
  const [file, setFile] = useState([]);
  const [fileArr, setFileArr] = useState([]);

  function handleUpload(e) {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    setFile([...file, ...ImagesArray]);
    let filesArray = Object.entries(e.target.files).map((e) =>
      e
    );

    setFileArr(e.target.files);
  }

  useEffect(() => {
    setImage(fileArr)
  }, [fileArr]);
  useEffect(()=>{
    if(image?.length===0 && thumbnail?.length===0){
      setFile([]);
    }
  },[image, thumbnail])
  useEffect(()=>{    
    if(attachments!==undefined){
      var attachArr=attachments?.map((item)=>{
        return item?.url
      });
      setFile(attachArr);
    }
  },[attachments]);

  useEffect(() => {
    console.log(file,"file22222222222")
  }, [file]);

  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
    const f = fileArr.filter((item, index) => index !== e);
    setFileArr(f);
  }

  return (
    <form>
      <div className="form-group preview">
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {file.length > 0 &&
            file.map((item, index) => {
              return (

                <Grid item sm={2} key={item} style={{ height: "100px", width: "100%", position: "relative" }}>
                  <Card>
                    <img src={item} alt="" style={{ height: "100px", width: "100%", }} />
                    <Button type="button" onClick={() => deleteFile(index)} style={{
                      position: "absolute",
                      color: "red", right: "-15px", top: "10px"
                    }}>
                      <Delete />
                    </Button>
                  </Card>
                </Grid>

              );
            })}
        </Grid>
      </div>

      <Grid container sx={{ mt: 2 }}>
        <Grid item >
          {/* <input
          type="file"
          disabled={file.length === 5}
          className="file-control fileUpload"
          onChange={handleUpload}
          multiple
        /> */}
          <Button variant="contained" component="label" className="background-button">
            Add <InsertPhoto sx={{ ml: 2 }} />
            <input hidden accept="image/*" multiple type="file" onChange={handleUpload} />
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ImageUpload;
