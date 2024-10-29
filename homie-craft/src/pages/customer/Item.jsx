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
  const [quantity, setQuantity] = useState(1);
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
            purchaseMode: purchaseMode,
            quantity: quantity,
            status: "requested",
            price: craft[0].price * quantity,
            userMessage: userMessage,
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
      setPrice(0);
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
            borderBottom: "1px solid lightGray",
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
              justifyContent: "space-around",
            }}
          >
            <Container>
              <h3 style={capitalize}>{craft[0].name}</h3>
              <div class="d-flex gap-5">
                <h2>{"₹ " + craft[0].price}</h2>
              </div>
              <p class="mt-2" style={{ lineHeight: "1.5" }}>
                {craft[0].description}
              </p>
            </Container>
            <Container
              sx={{
                marginBottom: "10px",
                gap: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "initial",
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
                    Quantity:
                  </Typography>
                  <RemoveIcon
                    sx={{ color: "black", width: "15px" }}
                    type="button"
                    onClick={() => {
                      quantityHandler(quantity - 1);
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: "2px",
                      color: "black",
                      fontSize: "20px",
                    }}
                  >
                    {quantity}
                  </Typography>
                  <AddIcon
                    sx={{ color: "black", width: "15px" }}
                    type="submit"
                    onClick={() => {
                      quantityHandler(quantity + 1);
                    }}
                  />
                </div>
                <Typography sx={{ fontSize: "12px", color: "gray" }}>
                  Max Quantity: {craft[0].quantity}
                </Typography>
              </div>
              <ButtonPrimary
                style={{ width: "100%" }}
                name="Request Order"
                action={handleClickOpenHome}
                disabled={quantity == 0}
              />
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
          <Container
            sx={{
              maxWidth: { xs: "100%", lg: "50%" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>Purchase Options</h3>
            <Container
              sx={{
                gap: "20px",
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                  lg: "row",
                  xl: "row",
                },
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <ButtonPrimary
                style={{ width: "100%" }}
                name="Home Delivery"
                action={handleClickOpenHome}
              />
              {craft[0].pickUpFromCrafter == true ? (
                <ButtonPrimary
                  style={{ width: "100%" }}
                  name="Pick from Crafter"
                  action={handleClickOpenPick}
                />
              ) : (
                <ButtonPrimary disabled name="Pick Up From Crafter" />
              )}
            </Container>
          </Container>

          <Container>
            <h3 style={{ marginLeft: "40px" }}>Crafter Details:</h3>
            <Container
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column-reverse",
                  sm: "col",
                  md: "col",
                  lg: "col",
                },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Container>
                <div>
                  <div class="d-flex ">
                    <p>Crafter Name:</p>
                    <h5 style={capitalize}>{crafter.name}</h5>
                  </div>
                  <div class="d-flex">
                    House Number:<h5>{crafter.houseNumber}</h5>
                  </div>
                  <div class="d-flex">
                    City:<h5>{crafter.city}</h5>
                  </div>
                  <div class="d-flex">
                    State:<h5>{crafter.state}</h5>
                  </div>
                </div>
              </Container>

              <Container sx={{ alignSelf: "center" }}>
                {/* <img style={{width:'100px', height:'100px',maxHeight:'125px',maxWidth:'125px',objectFit:'cover',borderRadius:'50%',padding:'1px'}} src={crafter.profilePicUrl} alt="" class="w-10 h-10"/> */}
              </Container>
            </Container>
          </Container>
        </Container>

        <hr></hr>
        <Container>
          <Container sx={{ margin: "40px" }}>
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
          </Container>
          <Container
            sx={{
              borderRadius: "10px",
              boxShadow: "0px 0px 10px 0px",
              width: "70vw",
              marginBottom: "20px",
            }}
          >
            <Container>
              <Typography
                variant="h5"
                sx={{
                  paddingTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Comments
              </Typography>
            </Container>
            <hr />
            {comments.length === 0 ? (
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "10vh",
                }}
              >
                --No Comments--
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
              Your order request is successful!
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
