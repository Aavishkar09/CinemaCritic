    import React, { useState, useEffect } from 'react';
    import { TextField, Button, Paper, Box, Typography } from "@mui/material";
    import './AddMovie.css';
    import upload_area from '../../assets/upload_area.svg';

    const AddMovie = ({ movie, onClose,URL}) => {
    const [cineDetail, setCineDetail] = useState({
        name: "",
        image: "",
        category: "",
        rating: "",
        year: "",
        duration: "",
        description: "",
        section: ""
    });

    const [image, setImage] = useState(null);

    useEffect(() => {
        if (movie) {
        setCineDetail(movie);
        setImage(movie.image || null);
        } else {
        // Reset form when movie is null
        setCineDetail({
            name: "",
            image: "",
            category: "",
            rating: "",
            year: "",
            duration: "",
            description: "",
            section: ""
        });
        setImage(null);
        }
    }, [movie]);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        if (["rating", "year", "duration"].includes(name)) {
        if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
            setCineDetail({ ...cineDetail, [name]: value });
        }
        } else {
        setCineDetail({ ...cineDetail, [name]: value });
        }
    };

    const imageHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
        setCineDetail({ ...cineDetail, image: file });
        setImage(file);
        }
    };

    const addCine = async () => {
        console.log(cineDetail);
        let responseData;
        let cine = { ...cineDetail };

        let formData = new FormData();
        formData.append('cine', image);

        await fetch(`${URL}/api/admin/upload`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
        }).then(resp => resp.json()).then(data => { responseData = data });

        if (responseData.success) {
        cine.image = responseData.image_url;
        console.log(cine);

        await fetch(`${URL}/api/admin/addcine`, {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(cine),
        }).then(res => res.json()).then(data => {
            data.success ? alert("Movie Added/Updated") : alert("Failed");
            onClose(); // Close form after submission
        });
        }
    };
    

    return (
        <Paper elevation={3} sx={{ padding: 3, maxWidth: 500, margin: "auto", mt: 5 }}>
        <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
            {movie ? "Edit Movie" : "Add Movie"}
        </Typography>

        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <label htmlFor="file-input">
            <img
                src={
                image
                    ? image instanceof File
                    ? URL.createObjectURL(image) // Show preview for new image
                    : image // Show existing URL when editing
                    : upload_area
                }
                alt="Upload Thumbnail"
                className="addproduct-thumbnail-img"
            />
            </label>
            <input type="file" onChange={imageHandler} name="image" id="file-input" hidden />

            <TextField label="Name" variant="outlined" name="name" value={cineDetail.name} onChange={changeHandler} fullWidth />
            <TextField label="Category" variant="outlined" name="category" value={cineDetail.category} onChange={changeHandler} fullWidth />
            <TextField label="Rating" variant="outlined" name="rating" value={cineDetail.rating} onChange={changeHandler} fullWidth />
            <TextField label="Year" variant="outlined" name="year" value={cineDetail.year} onChange={changeHandler} fullWidth />
            <TextField label="Duration" variant="outlined" name="duration" value={cineDetail.duration} onChange={changeHandler} fullWidth />
            <TextField label="Description" variant="outlined" name="description" value={cineDetail.description} onChange={changeHandler} multiline rows={3} fullWidth />
            <TextField label="Section" variant="outlined" name="section" value={cineDetail.section} onChange={changeHandler} fullWidth />

            <Button variant="contained" color="primary" onClick={addCine} fullWidth>
            {movie ? "Update Movie" : "Submit"}
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose} fullWidth>
            Cancel
            </Button>
        </Box>
        </Paper>
    );
    };

    export default AddMovie;
