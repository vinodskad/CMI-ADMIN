import { Box, Button, Card, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import InputTextField from '../../Component/InputTextField/InputTextField'
import { LettersRegex } from '../../app/HelperFunction'
import ImageUpload from "../../Component/ImageUpload/ImageUpload";
import AutoCompleteDropdown from "../../Component/Dropdown/AutoCompleteDropdown";
import axios from 'axios';
import { GetCategoryData, GetUnitData, ProductData } from './ProductSlice';
import { useDispatch, useSelector } from "react-redux";
import InputNumberField from '../../Component/InputNumberField/InputNumberField';
import ToastAlert from '../../Component/Alert/ToastAlert';
export const apiUrl = process.env.REACT_APP_URL;
const AddProduct = () => {
    const dispatch = useDispatch();
    const catList = useSelector(ProductData)?.getCategory;
    const unitList = useSelector(ProductData)?.getUnit;
    const categoryList = catList?.map((item, index) => ({
        name: item,
        id: index
    }));
    const accessToken = localStorage?.getItem("accessToken");
    const accessTokenJson = JSON?.parse(accessToken);
    const [productName, setProductName] = useState("");
    const [image, setImage] = useState("");
    const [thumbnail, setThumbnail] = useState('');
    const [description, setDescription] = useState("");
    const [material, setMaterial] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        dispatch(GetCategoryData());
        dispatch(GetUnitData());
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const FormData = require('form-data');
        let data = new FormData();
        data.append('productData', JSON.stringify({
            name: productName,
            description: description,
            material: material,
            color: color,
            size: size,
            minOrder: quantity,
            minOrderUnit: unit,
            category: category
        }));
        const imagFfiles = image ? [...image] : [];
        imagFfiles.forEach((file, i) => {
            data.append(`file`, file);
        });
        const thumbFiles = thumbnail ? [...thumbnail] : [];
        thumbFiles.forEach((file, i) => {
            data.append(`thumbnail`, file);
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${apiUrl}/`,
            headers: {
                'Authorization': `Bearer ${accessTokenJson}`,
                //...data.getHeaders()
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                ToastAlert("Product Added Successfully", "success");
                clearForm();
            })
            .catch((error) => {
                ToastAlert("Somthing went wrong", "error");
            });

    };
    const clearForm = () => {
        setProductName("");
        setDescription("");
        setMaterial("");
        setColor("");
        setSize("");
        setQuantity("");
        setUnit("");
        setCategory("");
        setImage([]);
        setThumbnail([]);
    }

    return (
        <>
            <Typography className="pageHeader">Add Product</Typography>
            <Card>
                <form onSubmit={handleSubmit} >
                    <Grid container spacing={1} sx={{ pl: 2, pr: 2, pt: 1 }}>
                        <Grid sm={6} item>
                            <label>Add Thumbnail</label>
                            <ImageUpload setImage={setImage} image={image} thumbnail={thumbnail} />
                        </Grid>
                        <Grid sm={6} item>
                            <label>Add Images</label>
                            <ImageUpload setImage={setThumbnail} image={image} thumbnail={thumbnail} />
                        </Grid>
                        <Grid sm={4} item >
                            <InputTextField
                                label="Product Name"
                                value={productName}
                                onChange={setProductName}
                                maxLength={LettersRegex}
                            //isRequired
                            />
                        </Grid>
                        <Grid sm={12} item >
                            <InputTextField
                                label="Description"
                                value={description}
                                onChange={setDescription}
                                maxLength={LettersRegex}
                                //isRequired
                                rows={3}
                                multiLine
                            />
                        </Grid>
                        <Grid sm={4} item >
                            <InputTextField
                                label="Material"
                                value={material}
                                onChange={setMaterial}
                                maxLength={LettersRegex}
                            //isRequired
                            />
                        </Grid>
                        <Grid sm={4} item >
                            <InputTextField
                                label="Color"
                                value={color}
                                onChange={setColor}
                                maxLength={LettersRegex}
                            //isRequired
                            />
                        </Grid>
                        <Grid sm={4} item >
                            <InputTextField
                                label="Size"
                                value={size}
                                onChange={setSize}
                                maxLength={LettersRegex}
                            //isRequired
                            />
                        </Grid>
                        <Grid sm={4} item >
                            <InputNumberField
                                label="Quantity"
                                value={quantity}
                                onChange={setQuantity}
                                maxLength={LettersRegex}
                            //isRequired
                            />
                        </Grid>
                        <Grid sm={4} item >
                            <AutoCompleteDropdown
                                label="Unit"
                                dataSet={unitList}
                                getOptionLabel="name"
                                selectedValue={unit}
                                getOptionValue="name"
                                onChange={setUnit}
                            //isRequired
                            />
                        </Grid>
                        <Grid sm={4} item >
                            <AutoCompleteDropdown
                                label="Category"
                                dataSet={categoryList}
                                getOptionLabel="name"
                                selectedValue={category}
                                getOptionValue="name"
                                onChange={setCategory}
                            //isRequired
                            />
                        </Grid>
                        <Grid sm={12} item sx={{ mb: 2 }} style={{ textAlign: "center" }}>
                            <Button
                                type="submit"
                                variant="outlined"
                                color="primary"
                                className="border-button"
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </>
    )
}

export default AddProduct