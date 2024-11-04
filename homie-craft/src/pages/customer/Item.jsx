import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonSecondary from "../../components/button/secondary/ButtonSecondary";
import ButtonPrimary from "../../components/button/primary/ButtonPrimary";
import ItemGallery from "../../components/gallerySection/ItemGallery";
import Button from "@mui/material/Button";
import axios from "axios";
import {
  Alert,
  capitalize,
  Container,
  Fab,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Comment from "../../components/comments/Comment";

function Item() {
  let { id } = useParams();
  const [craft, setCraft] = useState({});
  const [price, setPrice] = useState();
  const [crafter, setCrafter] = useState({});
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  let userType = localStorage.getItem("userType");
  const handleClickOpenHome = () => {
    if (localStorage.getItem("userType") == "customer") {
      setOpen(true);
      setPurchaseMode("Home Delivery");
    } else {
      window.location.href =
        "https://homiecraft.b2clogin.com/homiecraft.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_HomieCraftSignupSignIn&client_id=7fda49b9-5fc0-4022-961d-3b2920ee7717&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&scope=openid&response_type=code&prompt=login";
    }
  };
  const handleClickOpenPick = () => {
    if (localStorage.getItem("userType") == "customer") {
      setOpen(true);
      setPurchaseMode("Pick from crafter");
    } else {
      navigate("/login");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setUserMessage();
  };
  useEffect(() => {
    try {
      axios.get(`http://localhost:5265/crafts/${id}`).then((res) => {
        if (res.data.length > 0) {
          setCraft(res.data);
          setPrice(res.data[0].price);
          axios
            .get(`http://localhost:5265/crafter/${res.data[0].crafterId}`)
            .then((res) => {
              setCrafter(res.data);
            })
            .catch((e) => console.log(e));
        } else {
          navigate("/ItemNotFound");
        }
      });
      axios
        .get(`http://localhost:5122/Comment/${id}`)
        .then((res) => {
          const commentsData = res.data;
          setComments(commentsData);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log("Error occurred:", error);
    }

    try {
      axios.get("http://localhost:5122/Comment/" + id).then((res) => {
        var x = res.data;
        setComments(x);
      });
    } catch {
      console.log("Error Occured");
    }
  }, []);
  const [quantity, setQuantity] = useState(0);
  const [userMessage, setUserMessage] = useState();
  const [purchaseMode, setPurchaseMode] = useState();
  const quantityHandler = (newQuanity) => {
    if (newQuanity >= 0 && newQuanity <= craft[0].quantity)
      setQuantity(newQuanity);
  };

  const orderRequestHandler = () => {
    if (quantity > 0) {
      axios
        .post(
          `http://localhost:5265/orderrequest`,
          {
            userId: localStorage.getItem("id"),
            craftId: id,
            crafterId: craft[0].crafterId,
            purchaseMode: "Cash On Delivery",
            quantity: quantity,
            status: "requested",
            price: craft[0].price * quantity,
            userMessage:"",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          handleClick();
        });
      setOpen(false);
      setQuantity(0);
      setUserMessage();
    } else {
    }
  };
  const [openSnack, setSnackOpen] = React.useState(false);
  const [newComment, setNewComment] = useState("");
  const handleAddComment = async () => {
    try {
      var userId = localStorage.getItem("id");
      var user = await axios.get("http://localhost:5265/user/" + userId).then(
        (res) => {
          var x = res.data;
          return x;
        },
        axios.get("http://localhost:5122/Comment/" + id).then((res) => {
          var x = res.data;
          setComments(x);
        })
      );
      var nc = {
        id: "random",
        userId: userId,
        craftId: id,
        comment: newComment,
        userPic: user.profilePicURL,
      };
      axios.post("http://localhost:5122/Comment/", nc).then((res) => {
        var x = res.data;
        setNewComment("");
        var c = comments;
        axios.get("http://localhost:5122/Comment/" + id).then((res) => {
          var x = res.data;
          setComments(x);
        });
      });
    } catch {
      console.log("Error Occured");
    }
  };
  const handleClick = () => {
    setSnackOpen(true);
  };
  console.log(JSON.stringify(crafter));
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };
  const capitalize = {
    textTransform: "capitalize",
  };
  return craft.length > 0 ? (
    <>
      <Container sx={{ marginTop: 5 }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            padding: { xs: 0, sm: 1, md: 2, lg: 3, xl: 4 },
            marginBottom: "10px",
          }}
        >
          <Container
            sx={{ maxWidth: { xs: "100%", lg: "50%" }, marginBottom: "20px" }}
          >
            <ItemGallery images={craft[0].images} />
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Container>
            <div class="d-flex flex-column">
                  <Typography
                    sx={{
                      fontWeight: "2px",
                      color: "black",
                      fontSize: "25px",
                    }}
                  >
                    {craft[0].name}
                  </Typography>
                  <Typography sx={{ fontSize: "15px", color: "gray" }}>
                  Crafter: {crafter.name}
                </Typography>
                </div>
                <Typography
                    sx={{
                      fontWeight: "2px",
                      color: "black",
                      fontSize: "25px",
                    }}
                  >
                   {"₹ " + price.toLocaleString('en-IN')}
                  </Typography>
              {/* <h3 style={capitalize}>{craft[0].name}</h3>
                <h3>{"₹ " + craft[0].price}</h3>

              <div class="d-flex gap-5">
                
              </div> */}
              <div className="mt-2 " style={{fontWeight:"1", color: "gray"}}>
                {craft[0].description}
              </div>
            </Container>
            <Container
              sx={{
                marginBottom: "10px",
                gap: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="d-flex flex-column">
                <div class="d-flex gap-2 align-items-center">
                  <Typography
                    sx={{
                      fontWeight: "2px",
                      color: "black",
                      fontSize: "18px",
                      
                    }}
                  >
                    Quantity :
                  </Typography>
                  <IconButton sx={{padding:"0px"}} color="secondary" size="small" onClick={() => {
                      quantityHandler(quantity - 1);
                    }}> 
                  <RemoveIcon sx={{width:"12px"}}
                  />
                  </IconButton>

                 
                  <Typography
                    sx={{
                      fontWeight: "2px",
                      color: "black",
                      fontSize: "16px",
                    }}
                  >
                    {quantity}
                  </Typography>

                  <IconButton sx={{padding:"0px"}} color="secondary" size="small" onClick={() => {
                      quantityHandler(quantity + 1);
                    }}> 
                  <AddIcon sx={{width:"15px"}}
                  />
                  </IconButton>
                  
                </div>
                <Typography sx={{ fontSize: "12px", color: "gray" }}>
                Available Stock  : {craft[0].quantity}
                </Typography>
                <Typography sx={{ fontSize: "12px", color: "gray" }}>
                Payable Amount : {craft[0].price * quantity}
                </Typography>
                <Typography sx={{ fontSize: "12px", color: "gray" }}>
                Payment Method : Cash on delivery
                </Typography>
              </div>
              <div className="d-flex align-items-end">

              <Button
              variant="contained"
                sx={{padding: "5px 25px"}}
                style={{ width: "100%", }}
                onClick={orderRequestHandler}
                disabled={quantity == 0}
                >
                Order
                </Button>
                </div>
            </Container>
          </Container>
        </Container>
        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row", lg: "row" },
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
        </Container>
        <Container>
          {/* <Container sx={{ margin: "40px" }}>
            {userType == "customer" && (
              <Container>
                <Typography
                  variant="h6"
                  sx={{ marginLeft: "30px", marginBottom: "10px" }}
                >
                  Add Comment
                </Typography>
                <Container sx={{ display: "flex" }}>
                  <TextField
                    placeholder="Write your comments here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{
                      marginRight: "10px",
                      boxShadow: "0px 4px 4px -4px rgba(0, 0, 0, 0.5)",
                      borderRadius: "10px",
                    }}
                  />
                  <ButtonPrimary action={handleAddComment} name={"Comment"} />
                </Container>
              </Container>
            )}
          </Container> */}
          <Container
            sx={{
              borderRadius: "0px",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              {/* <Typography
                variant="h5"
                sx={{
                  fontSize: "25px",
                  paddingTop: "10px",
                  marginLeft: "6px",
                  display: "flex",
                  justifyContent: "initial",
                  alignItems: "center",
                }}
              >
                Comments
              </Typography> */}
              <Container sx={{ display: "flex", alignItems:"initial", margin:"20px 0px", maxHeight:"35px"}}>
                  <TextField
                    placeholder="Write your comments here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={{
                      marginRight: "10px",
                      padding:"0px 10px",
                      borderRadius: "10px",
                    }}
                  />
                  <ButtonPrimary action={handleAddComment} name={"comment"}/>
                </Container>
            </div>
            {comments.length === 0 ? (
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "10vh",
                }}
              >
                
              </Typography>
            ) : (
              comments.map((comment) => {
                return <Comment setComments={setComments} comment={comment} />;
              })
            )}
          </Container>
        </Container>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Typography
            id="alert-dialog-title"
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
              borderBottom: "1px solid",
              borderColor: "gray",
              textAlign: "center",
              fontSize: "25px",
            }}
          >
            {"Order Confirmation"}
          </Typography>
          <DialogContent sx={{ padding: "0px 20px" }}>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ padding: "0px" }}
            >
              <Container>
                <Typography
                  sx={{
                    fontWeight: "2px",
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  Payable Amount: {craft[0].price * quantity}
                </Typography>
              </Container>
              <TextField
                sx={{ marginY: "8px", marginLeft: "16px" }}
                id="outlined-basic"
                label="Custom Note.."
                variant="outlined"
                value={userMessage}
                onChange={(e) => {
                  setUserMessage(e.target.value);
                }}
              />
            </DialogContentText>
          </DialogContent>
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-around",
              marginY: "10px",
            }}
          >
            <ButtonSecondary action={handleClose} name="Cancel" />
            <ButtonPrimary
              autoFocus
              action={orderRequestHandler}
              name="Submit"
            />
          </Container>
        </Dialog>
        <div>
          <Snackbar
            open={openSnack}
            autoHideDuration={6000}
            onClose={handleSnackClose}
          >
            <Alert
              onClose={handleSnackClose}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Order request sent successfully!
            </Alert>
          </Snackbar>
        </div>
      </Container>
    </>
  ) : (
    <>
      <Stack spacing={1} width={"100vw"} height={"100vh"}>
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Stack>
    </>
  );
}

export default Item;
