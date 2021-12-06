import React, { useState, useEffect  } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import axios from "axios";

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`
  };
}

export default function CategriesSelection({listInterest}) {
  const [itemData,setItemData]=useState ([])

  // let filterItem=[...itemData];

  
  

  const tag_list= ()=>{
    let user = JSON.parse(localStorage.getItem("user"))
    var formdata = new FormData();
    axios({
      method: 'GET',
      url: "http://127.0.0.1:8000/pinterest_app/api/v1/tags",
      headers:{'Authorization':user.Authorization},
    }).then((res) =>
      {
        let data=res.data.imgs
        setItemData(data)
        // for(var i = 0; i< res.data.imgs.length; i++)
        // {
        //     console.log(res.data.imgs[i])
            // itemData.push(res.data.imgs[i])
        // }
        console.log(itemData)
        
        
      })
      .catch((err) => console.log(err));
      // console.log(itemImg)
  }


  useEffect(()=>{
    tag_list()
  },[])

  const onclick =  (x)=>{
    console.log("before")
    console.log(itemData)
    let index = itemData.findIndex(item=>item.title==x);
    console.log(index)
    itemData.splice(index, 1); // remove 1 element from index 
    console.log("after")
    console.log(itemData)
    console.log(x)
    listInterest(x)
    const updated = itemData
    setItemData(updated)
     //filterItem = itemData.slice((item)=>item.title == x)
    //  setItemData([itemData:itemData])
    //  itemData=filterItem
    // console.log(filterItem)
    // return filterItem
  }

  useEffect(() => {
  },[])

  return (
    <ImageList
      sx={{
        width: 600,
        height: 300,
        transform: "translateZ(0)",
        
      }}
      rowHeight={200}
      gap={5}
    >
      {itemData.map((item,index) => {
        const cols = item.featured ? 2 : 1;
        const rows = item.featured ? 2 : 1;

        return (
          <ImageListItem key={index} cols={cols} rows={rows} >
            <img
              {...srcset(item.img, 300, 150, rows, cols)}
              alt={item.title}
              loading="lazy"
              
            />
            <ImageListItemBar 
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                height: 1
              }}
              title={item.title}
              key={index}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: "white" }}
                  aria-label={`star ${item.title}`}
                  onClick={()=>onclick(item.title)}
                >
                  <CheckBoxIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}

// let itemData = [
//   // {
//   //   img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
//   //   title: "Breakfast",
//   //   author: "@bkristastucchio"
//   // },
//   // {
//   //   img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
//   //   title: "Burger",
//   //   author: "@rollelflex_graphy726"
//   // },
//   // {
//   //   img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
//   //   title: "Camera",
//   //   author: "@helloimnik"
//   // },
//   // {
//   //   img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
//   //   title: "Coffee",
//   //   author: "@nolanissac"
//   // },
//   // {
//   //   img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
//   //   title: "Hats",
//   //   author: "@hjrc33"
//   // },
//   // {
//   //   img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
//   //   title: "Honey",
//   //   author: "@arwinneil"
//   // },
//   // {
//   //   img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
//   //   title: "Basketball",
//   //   author: "@tjdragotta"
//   // },
//   // {
//   //   img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
//   //   title: "Fern",
//   //   author: "@katie_wasserman"
//   // },
//   // {
//   //   img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
//   //   title: "Mushrooms",
//   //   author: "@silverdalex"
//   // },
//   // {
//   //   img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
//   //   title: "Tomato basil",
//   //   author: "@shelleypauls"
//   // },
//   // {
//   //   img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
//   //   title: "Sea star",
//   //   author: "@peterlaster"
//   // },
//   // {
//   //   img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
//   //   title: "Bike",
//   //   author: "@southside_customs"
//   // }
// ];
