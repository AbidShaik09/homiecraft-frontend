import React from 'react'
import ItemHolder from '../../components/itemHolder/ItemHolder'
import { Typography } from '@mui/material'

function Wishlist() {
  const items= [
    {
      id:'ITM0001',
      itemName:'Homemade purse',
      itemPrice:699,
      itemDescription: 'jhsdj d  dsvs ds s fdhfjhdsjf sd fsd fsdf sdfdsdhf df fd hfd  fdfd u hgdkj ngjdf ngiadfbv  asi bais hadfsbiasdh fiuhasdsiuf asrh fiash if hasiufhas f asdif hasiuhfiu ashfiuasf s uadfasdh oaudnosadfjoadf jo fad fiuah fiuah fiuahfu dh fdsjhf idusj fh',
      itemDimentions:{length:45,breadth:20,height:40},
      material: 'braded cloth',
      size:'M',
      displayImage:'https://th.bing.com/th/id/OIP.XRGxn1FE0x7XRpHRl96aXgHaGY?rs=1&pid=ImgDetMain'
    },
    {
      id:'ITM0001',
      itemName:'Homemade purse',
      itemPrice:699,
      itemDescription: 'jhsdj d  dsvs ds s fdhfjhdsjf sd fsd fsdf sdfdsdhf df fd hfd  fdfd u hgdkj ngjdf ngiadfbv  asi bais hadfsbiasdh fiuhasdsiuf asrh fiash if hasiufhas f asdif hasiuhfiu ashfiuasf s uadfasdh oaudnosadfjoadf jo fad fiuah fiuah fiuahfu dh fdsjhf idusj fh',
      itemDimentions:{length:45,breadth:20,height:40},
      material: 'braded cloth',
      size:'M',
      displayImage:'https://th.bing.com/th/id/OIP.XRGxn1FE0x7XRpHRl96aXgHaGY?rs=1&pid=ImgDetMain'
    },
    {
      id:'ITM0001',
      itemName:'Homemade purse',
      itemPrice:699,
      itemDescription: 'jhsdj d  dsvs ds s fdhfjhdsjf sd fsd fsdf sdfdsdhf df fd hfd  fdfd u hgdkj ngjdf ngiadfbv  asi bais hadfsbiasdh fiuhasdsiuf asrh fiash if hasiufhas f asdif hasiuhfiu ashfiuasf s uadfasdh oaudnosadfjoadf jo fad fiuah fiuah fiuahfu dh fdsjhf idusj fh',
      itemDimentions:{length:45,breadth:20,height:40},
      material: 'braded cloth',
      size:'M',
      displayImage:'https://th.bing.com/th/id/OIP.XRGxn1FE0x7XRpHRl96aXgHaGY?rs=1&pid=ImgDetMain'
    },
    {
      id:'ITM0001',
      itemName:'Homemade purse',
      itemPrice:699,
      itemDescription: 'jhsdj d  dsvs ds s fdhfjhdsjf sd fsd fsdf sdfdsdhf df fd hfd  fdfd u hgdkj ngjdf ngiadfbv  asi bais hadfsbiasdh fiuhasdsiuf asrh fiash if hasiufhas f asdif hasiuhfiu ashfiuasf s uadfasdh oaudnosadfjoadf jo fad fiuah fiuah fiuahfu dh fdsjhf idusj fh',
      itemDimentions:{length:45,breadth:20,height:40},
      material: 'braded cloth',
      size:'M',
      displayImage:'https://th.bing.com/th/id/OIP.XRGxn1FE0x7XRpHRl96aXgHaGY?rs=1&pid=ImgDetMain'
    },
    {
      id:'ITM0001',
      itemName:'Homemade purse',
      itemPrice:699,
      itemDescription: 'jhsdj d  dsvs ds s fdhfjhdsjf sd fsd fsdf sdfdsdhf df fd hfd  fdfd u hgdkj ngjdf ngiadfbv  asi bais hadfsbiasdh fiuhasdsiuf asrh fiash if hasiufhas f asdif hasiuhfiu ashfiuasf s uadfasdh oaudnosadfjoadf jo fad fiuah fiuah fiuahfu dh fdsjhf idusj fh',
      itemDimentions:{length:45,breadth:20,height:40},
      material: 'braded cloth',
      size:'M',
      displayImage:'https://th.bing.com/th/id/OIP.XRGxn1FE0x7XRpHRl96aXgHaGY?rs=1&pid=ImgDetMain'
    },
    {
      id:'ITM0001',
      itemName:'Homemade purse',
      itemPrice:699,
      itemDescription: 'jhsdj d  dsvs ds s fdhfjhdsjf sd fsd fsdf sdfdsdhf df fd hfd  fdfd u hgdkj ngjdf ngiadfbv  asi bais hadfsbiasdh fiuhasdsiuf asrh fiash if hasiufhas f asdif hasiuhfiu ashfiuasf s uadfasdh oaudnosadfjoadf jo fad fiuah fiuah fiuahfu dh fdsjhf idusj fh',
      itemDimentions:{length:45,breadth:20,height:40},
      material: 'braded cloth',
      size:'M',
      displayImage:'https://th.bing.com/th/id/OIP.XRGxn1FE0x7XRpHRl96aXgHaGY?rs=1&pid=ImgDetMain'
    },
    {
      id:'ITM0001',
      itemName:'Homemade purse',
      itemPrice:699,
      itemDescription: 'jhsdj d  dsvs ds s fdhfjhdsjf sd fsd fsdf sdfdsdhf df fd hfd  fdfd u hgdkj ngjdf ngiadfbv  asi bais hadfsbiasdh fiuhasdsiuf asrh fiash if hasiufhas f asdif hasiuhfiu ashfiuasf s uadfasdh oaudnosadfjoadf jo fad fiuah fiuah fiuahfu dh fdsjhf idusj fh',
      itemDimentions:{length:45,breadth:20,height:40},
      material: 'braded cloth',
      size:'M',
      displayImage:'https://th.bing.com/th/id/OIP.XRGxn1FE0x7XRpHRl96aXgHaGY?rs=1&pid=ImgDetMain'
    }
    
    
  ]

  return (
    <>
     <Typography gutterBottom variant="h3" component="div"
          sx={{ overflow: 'hidden', padding:'30px'}}>

            Wishlist

        </Typography>
        <ItemHolder items={items}/>
 
    </>
   
  )
}

export default Wishlist
