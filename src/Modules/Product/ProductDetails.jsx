import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import './ProductDetails.css';
import { GetProductByIdData, ProductData } from './ProductSlice';
import { useParams } from 'react-router-dom';
import Carousel from "../../Component/Carousel/Carousel";
const useStyles = styled({
  root: {
    //maxWidth: 600,
    margin: 'auto',
    marginTop: 0,
    padding: 20,
  },
  image: {
    width: '100%',
    borderRadius: 8,
    marginBottom: 20,
  },
});

const ProductDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const productDetails = useSelector(ProductData)?.getDataById;
  const { id } = useParams();
  const lastIdNumber = id.match(/\d+$/)[0];
  const [images, setImages]=useState();

  useEffect(()=>{
    if(lastIdNumber){
    dispatch(GetProductByIdData(lastIdNumber))
    }
  },[]);
  useEffect(() => {
    if (productDetails) {
      setImages(productDetails?.attachment);
    }
  }, [productDetails]);
  return (
    <Card className={`product-card ${classes.root}`}>
        
    <CardContent>
    <Grid container spacing={3}>
              <Grid item sm={4}>
                <Card style={{ padding: "5px" }}>
                  <Carousel data={images} />
                </Card>
              </Grid>
        
        <Grid item sm={8}>
        <Card style={{ padding: "20px" }}>
      <Typography variant="h5" component="h2" className="product-name" gutterBottom>
        Product Name : {productDetails?.name}
      </Typography>
      <Typography variant="body2" className="product-description" color="textSecondary">
        <b>Description : </b>{productDetails?.description}
      </Typography>
      <Typography className="product-item" gutterBottom sx={{mt:2}}>
      <b>Color : </b>{productDetails?.color}
      </Typography>
      <Typography className="product-item" gutterBottom>
      <b>Material : </b>{productDetails?.material}
      </Typography>
      <Typography className="product-item" gutterBottom>
      <b> Size : </b>{productDetails?.material}
      </Typography>
      <Typography className="product-item" gutterBottom>
      <b>Minimum Order : </b>{productDetails?.minOrder}{productDetails?.minOrderUnit}
      </Typography>
      
      </Card>
     </Grid>
     </Grid>
    </CardContent>
  </Card>
  );
};

export default ProductDetails;
