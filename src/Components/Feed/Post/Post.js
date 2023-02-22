import { Avatar } from '@mui/material'
import React from 'react'
import InputOption from '../InputOption/InputOption'
import './Post.css'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { forwardRef } from 'react';


const Post = forwardRef(({name,description,message,image,photoUrl}, ref) => {
  return (
    <div ref={ref} className='post'>
        {/* HEADER */}
        <div className="post__header">
            <Avatar src={photoUrl}>{description[0]}</Avatar>
            <div className="post__info">
                <h2>{name}</h2>
                <p>{description}</p>
            </div>
        </div>
        <div className='post__img'>
            {image && <img src={image} className='post__infoImg' alt="" /> }
        </div>
        <div className="post__body">
            
            <p>{message}</p>
        </div>
        <div className="post__buttons">
            <InputOption title="Like" color="gray" Icon={ThumbUpOutlinedIcon}/>
            <InputOption name="Comment" color="gray" Icon={ChatOutlinedIcon}/>
            <InputOption name="Share" color="gray" Icon={ShareOutlinedIcon}/>
            <InputOption name="Send" color="gray" Icon={SendOutlinedIcon}/>
        </div>
    </div>
  )
})

export default Post







