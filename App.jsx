import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import CalculateIcon from "@mui/icons-material/Calculate";
import LogoutIcon from "@mui/icons-material/Logout";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import WidgetsIcon from "@mui/icons-material/Widgets";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Button from "@mui/material/Button";
import WarningIcon from "@mui/icons-material/Warning";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));
const App = () => {
  const drawerWidth = 240;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [visibleDetailsIndex, setVisibleDetailsIndex] = useState(null);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };
  const handleViewDetails = (index) => {
    setVisibleDetailsIndex(visibleDetailsIndex === index ? null : index);
  };
  useEffect(() => {
    axios
      .get("http://test.api.boxigo.in/sample-data/")
      .then((response) => {
        if (response.data && response.data.Customer_Estimate_Flow) {
          setData(response.data.Customer_Estimate_Flow);
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {[
            { text: "My Moves", icon: LocalShippingIcon },
            { text: "My Profile", icon: PersonIcon },
            { text: "Get Quote", icon: CalculateIcon },
            { text: "Logout", icon: LogoutIcon },
          ].map((item, index) => (
            <ListItem onClick={() => handleListItemClick(index)} sx={{ paddingLeft: 2 }} key={item.text} disablePadding>
              <ListItemButton sx={{ borderLeft: selectedIndex === index ? "5px solid #ea580c" : "none" }}>
                <ListItemIcon>{<item.icon />}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 1 }}>
        <div className="text-xl font-semibold mb-6"> My Moves</div>
        {data && data.length > 0 && (
          <>
            {data.map((item, index) => (
              <Grid
                key={item.estimate_id}
                container
                spacing={2}
                sx={{ boxShadow: 3, padding: "16px", marginBottom: "20px" }}
              >
                <Grid item xs={12} md={12}>
                  <div className="topBox flex justify-between flex-wrap">
                    <div>
                      <div className="font-semibold text-sm">From</div>
                      <div className="text-sm max-w-desc">{item.moving_from}</div>
                    </div>
                    <IconButton
                      aria-label="forwardArrow"
                      sx={{
                        color: "#ea580c",
                        boxShadow: 3,
                        "&:hover": {
                          boxShadow: 6,
                        },
                      }}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                    <div>
                      <div className="font-semibold text-sm">To</div>
                      <div className="text-sm max-w-desc">{item.moving_to}</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold">Request#</div>
                      <div className="font-extrabold text-orange-600">{item.estimate_id}</div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={12}>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <HomeIcon sx={{ color: "#ea580c" }} className="mr-1" />
                      <Typography variant="body1" sx={{ fontSize: "14px" }}>
                        {item.property_size}
                      </Typography>
                    </div>
                    <div className="flex items-center">
                      <WidgetsIcon sx={{ color: "#ea580c" }} className="mr-1" />
                      <Typography variant="body1" sx={{ fontSize: "14px" }}>
                        {item.total_items}
                      </Typography>
                    </div>
                    <div className="flex items-center">
                      <LocationOnIcon sx={{ color: "#ea580c" }} className="mr-1" />
                      <Typography variant="body1" sx={{ fontSize: "14px" }}>
                        {item.distance}
                      </Typography>
                    </div>
                    <div className="flex items-center">
                      <DateRangeIcon sx={{ color: "#ea580c" }} className="mr-1" />
                      <Typography variant="body1" sx={{ fontSize: "14px" }}>
                        {dayjs(item.date_created).format("MMM DD YYYY [at] hh:mm A")}
                      </Typography>
                    </div>
                    <div className="flex items-center">
                      <CheckBoxIcon sx={{ color: "#ea580c" }} className="mr-1" />
                      <Typography variant="body1" sx={{ fontSize: "14px" }}>
                        is Flexible
                      </Typography>
                    </div>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleViewDetails(index)}
                      sx={{
                        color: "#ea580c",
                        border: visibleDetailsIndex === index ? "2px solid #1431dc" : "2px solid #ea580c",
                        textTransform: "capitalize",
                        "&:hover": {
                          border: visibleDetailsIndex === index ? "2px solid #1431dc" : "2px solid #ea580c",
                          backgroundColor: "rgba(234, 88, 12, 0.1)",
                        },
                      }}
                    >
                      {visibleDetailsIndex === index ? "Hide Move Details" : "View Move Details"}
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#ea580c",
                        textTransform: "capitalize",
                        "&:hover": {
                          backgroundColor: "#b45309",
                        },
                      }}
                    >
                      {item.custom_status}
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12} md={12}>
                  <div className="text-xs flex">
                    <WarningIcon sx={{ color: "#ea580c", fontSize: "16px", marginRight: "4px" }} />
                    <div>
                      <span className="font-semibold">Disclaimer:</span> Please update your move date before two days of
                      shifting
                    </div>
                  </div>
                </Grid>
                {visibleDetailsIndex === index && (
                  <React.Fragment>
                    <Grid item xs={12} md={12}>
                      <div className="flex items-center mb-4">
                        <div className="mr-4 text-sm font-bold">Inventory Details</div>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "#000000",
                            color: "white",
                            textTransform: "capitalize",
                            "&:hover": {
                              backgroundColor: "#b45309",
                            },
                          }}
                        >
                          Edit Inventory
                        </Button>
                      </div>

                      <Accordion className="mb-4">
                        <AccordionSummary
                          sx={{ backgroundColor: "#e5e5e5" }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <div className="flex heading-font color-orange">
                            <div className="mr-2">Living Room</div>
                            <div className="item-count">15</div>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="flex justify-between">
                            {item && item.items && item.items.inventory && item.items.inventory.length > 0 ? (
                              item.items.inventory.map((invItem) => (
                                <div key={invItem.id} className="inventory-item">
                                  <div>
                                    <strong>{invItem.displayName}</strong>
                                  </div>
                                  {invItem.category && invItem.category.length > 0 ? (
                                    <ul>
                                      {invItem.category.map((cat) => (
                                        <li key={cat.id}>{cat.displayName}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <div>No categories available</div>
                                  )}
                                </div>
                              ))
                            ) : (
                              <div>No inventory items available</div>
                            )}
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion className="mb-4">
                        <AccordionSummary
                          sx={{ backgroundColor: "#e5e5e5" }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <div className="flex heading-font color-orange">
                            <div className="mr-2">Bed Room</div>
                            <div className="item-count">6</div>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                            amet blandit leo lobortis eget.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion className="mb-4">
                        <AccordionSummary
                          sx={{ backgroundColor: "#e5e5e5" }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <div className="flex heading-font color-orange">
                            <div className="mr-2">Kitchen</div>
                            <div className="item-count">7</div>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                            amet blandit leo lobortis eget.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion className="mb-4">
                        <AccordionSummary
                          sx={{ backgroundColor: "#e5e5e5" }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <div className="flex heading-font color-orange">
                            <div className="mr-2">Bathroom</div>
                            <div className="item-count">4</div>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                            amet blandit leo lobortis eget.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <div className="flex items-center mb-6">
                        <div className="mr-4 text-sm font-bold">House Details</div>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "#000000",
                            color: "white",
                            textTransform: "capitalize",
                            "&:hover": {
                              backgroundColor: "#b45309",
                            },
                          }}
                        >
                          Edit House Details
                        </Button>
                      </div>
                      <div className="mb-2">
                        <div className="color-orange heading-font mb-4">Existing House Details</div>
                        <div className="flex flex-wrap justify-between">
                          <div>
                            <div className="heading-font">Floor No</div>
                            <div>{item.old_floor_no}</div>
                          </div>
                          <div>
                            <div className="heading-font">Elevator Available</div>
                            <div>{item.old_elevator_availability}</div>
                          </div>
                          <div>
                            <div className="heading-font">Packing Required</div>
                            <div>{item.packing_service}</div>
                          </div>
                          <div>
                            <div className="heading-font">Distance From Truck to door</div>
                            <div>{item.old_parking_distance}</div>
                          </div>
                          <div>
                            <div className="heading-font">Additional Information</div>
                            <div>{item.old_house_additional_info ? item.old_house_additional_info : "--"}</div>
                          </div>
                        </div>
                      </div>
                      <Divider />
                      <div className="mt-2">
                        <div className="color-orange heading-font mb-4">New House Details</div>
                        <div className="flex flex-wrap justify-between">
                          <div>
                            <div className="heading-font">Floor No</div>
                            <div>{item.new_floor_no}</div>
                          </div>
                          <div>
                            <div className="heading-font">Elevator Available</div>
                            <div>{item.new_elevator_availability}</div>
                          </div>
                          <div>
                            <div className="heading-font">Unpacking Required</div>
                            <div>{item.unpacking_service}</div>
                          </div>
                          <div>
                            <div className="heading-font">Distance From Truck to door</div>
                            <div>{item.new_parking_distance}</div>
                          </div>
                          <div>
                            <div className="heading-font">Additional Information</div>
                            <div>{item.new_house_additional_info ? item.new_house_additional_info : "--"}</div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </React.Fragment>
                )}
              </Grid>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default App;
