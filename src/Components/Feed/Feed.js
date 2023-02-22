import React, { useEffect, useState } from 'react'
import './Feed.css'
import CreateIcon from '@mui/icons-material/Create';
import InputOption from './InputOption/InputOption';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Post from './Post/Post';
import { db, storage } from '../../firebase';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import FlipMove from 'react-flip-move'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';



const Feed = () => {
    const user = useSelector(selectUser)
    const [input,setInput] = useState("")
    const [posts,setPosts] = useState([])
    const [image,setImage] = useState(null)

    useEffect(() => {
        const coll_Ref = collection(db,"posts")
        const q = query(coll_Ref, orderBy("timeStamp","desc"))
        onSnapshot(q,(snapshot) => {
            setPosts(snapshot.docs.map(doc => ({
                id:doc.id,
                data:doc.data()
            })))
        })
    }, [posts]);

    /*
    useEffect(() => {
        const collectionRef = collection(db,"posts")
        getDocs(collectionRef).orderBy("timeStamp","desc").then(snapshot => {
            setPosts(snapshot.docs.map(doc => (
             {
                id:doc.id,
                data:doc.data()
             }
            )))
        })
    }, [posts]);
*/
    const sendPost = (e) => {
        e.preventDefault()
        const storageRef = ref(storage,`posts/${image.name}`)
        uploadBytes(storageRef,image)
        .then(() => {
            getDownloadURL(storageRef)
            .then(url => {
                const collRef = collection(db,"posts")
                addDoc(collRef,{
                name:user.displayName,
                description:user.email,
                message:input,
                photoUrl:user.photoURL,
                postImage:url,
                timeStamp:serverTimestamp()
                })
            })
        })        
        setInput("")
        setImage(null)
    }

  return (
    <div className='feed'>
        <div className="feed__inputContainer">
            <div className="feed__input">
                <CreateIcon/>
                
                <form>
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                    <button type='submit' onClick={sendPost}>Send</button>
                </form>
            </div>
            <div className="feed__inputOptions">
                <InputOption title="Photo" Icon={ImageIcon} color="70b5f9"/>
                <InputOption title="Video" Icon={SubscriptionsIcon} color="E7A33E"/>
                <InputOption title="Event" Icon={EventNoteIcon} color="C0CBCD"/>
                <InputOption title="Write Article" Icon={CalendarViewDayIcon} color="7FC15E"/>
            </div>
        </div>
        {/* Posts */}
        <FlipMove>
            {posts.map((post) => (
                <Post 
                key={post.id}
                name={post.data.name} 
                description={post.data.description}
                message={post.data.message}
                image={post.data.postImage}
                photoUrl={post.data.photoUrl}/>
            ))}
        </FlipMove>
        {/* or */}
            {/* {posts.map(({id,data:{name,description,message,photoUrl}}) => (
                <Post
                key={id}
                name={name}
                description={description}
                message={message}
                photoUrl={photoUrl}
                />
            ))} */}

    </div>
  )
}

export default Feed