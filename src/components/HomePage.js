import React from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import InputAdornment from '@material-ui/core/InputAdornment';
import { restaurantData } from "../restaurant"
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function HomePage() {

    const [searchData, setSearchData] = React.useState("");
    const [filter, setFilter] = React.useState("");
    const [order, setOrder] = React.useState("");
    const classes = useStyles();
    
    const compareVotes = (a, b) => {
        if (a["Votes"] < b["Votes"]) {
            return  order === "descending" ? 1 : order === "ascending" ? -1 : 1;
        }
        else if (a["Votes"] > b["Votes"]) {
            return  order === "descending" ? -1 : order === "ascending" ? 1 : -1;
        }
        else {
            return 0;
        }
    }
    
    const compareAvgCost = (a, b) => {
        if (a["Average Cost for two"] < b["Average Cost for two"]) {
            return  order === "descending" ? 1 : order === "ascending" ? -1 : -1;
        }
        else if (a["Average Cost for two"] > b["Average Cost for two"]) {
            return  order === "descending" ? -1 : order === "ascending" ? 1 : 1;
        }
        else {
            return 0;
        }
    }
    
    const compareRaiting = (a, b) => {
        if (a["Aggregate rating"] < b["Aggregate rating"]) {
            return  order === "descending" ? 1 : order === "ascending" ? -1 : 1;
        }
        else if (a["Aggregate rating"] > b["Aggregate rating"]) {
            return  order === "descending" ? -1 : order === "ascending" ? 1 : -1;
        }
        else {
            return 0;
        }
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    }

    const handleOrderChange = (e) => {
        setOrder(e.target.value);
    }

    const handleSearchData = (e) => {
        setSearchData(e.target.value);
    }

    const filterByRaiting = (obj) => {
        return obj.sort(compareRaiting);
    } 
    
    const filterByAverageCost = (obj) => {
        return obj.sort(compareAvgCost);
    }
    
    const filterByVotes = (obj) => {
        return obj.sort(compareVotes);
    } 

    let tempRestData = restaurantData.filter(item => 
        item["Restaurant Name"].toLowerCase().trim().includes(searchData) || item["Cuisines"].toLowerCase().trim().includes(searchData)
    )

    switch(filter) {
        case "raiting": tempRestData = filterByRaiting(tempRestData);
            break;
        case "avgCost": tempRestData = filterByAverageCost(tempRestData);
            break;
        case "votes": tempRestData = filterByVotes(tempRestData);
            break;
        default: break;  
    }

    return (
        <Box component="span" m={1}>
            <br />
           
            <Grid container spacing={3}>
               
                <Grid item xs={6}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            value={searchData}
                            onChange={(e) => handleSearchData(e)}
                            startAdornment={<InputAdornment position="start"> <SearchIcon color="grey" /> </InputAdornment>}
                            labelWidth={60}
                            placeholder={"Search By Restaurant Name and Cuisine"}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth variant="outlined" className={classes.margin}>
                        <InputLabel id="demo-simple-select-outlined-label">Filter</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={filter}
                            onChange={(e) => handleFilterChange(e)}
                            label="filter"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"raiting"}>Raiting</MenuItem>
                            <MenuItem value={"avgCost"}>Average Cost for Two</MenuItem>
                            <MenuItem value={"votes"}>Votes</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth variant="outlined" className={classes.margin}>
                        <InputLabel id="demo-simple-select-outlined-label">Order</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={order}
                            onChange={(e) => handleOrderChange(e)}
                            label="order"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"ascending"}>Ascending</MenuItem>
                            <MenuItem value={"descending"}>Descending</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={4}>
                {tempRestData.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image="default_restaurant.png"
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {card["Restaurant Name"]}
                                    </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={5}>
                                        <span style={{color: "grey"}}>Cuisines: </span>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <span>{card["Cuisines"]}</span>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={5}>
                                        <span style={{color: "grey"}}>Cost for Two: </span>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <span>{card["Average Cost for two"]}</span>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={5}>
                                        <span style={{color: "grey"}}>Votes: </span>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <span>{card["Votes"]}</span>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={5}>
                                        <span style={{color: "grey"}}>Raiting: </span>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <span>{card["Rating text"]}</span>&nbsp;&nbsp;&nbsp;
                                        <span>{card["Aggregate rating"]}</span>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}