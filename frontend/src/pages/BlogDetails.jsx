import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const BlogDetails = () => {
    const { id } = useParams()
    const [blog, setBlog] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:8080/api/blogs/${id}`)
        .then((res) => setBlog(res.data))
        .catch((err) => console.log(err))
    }, [id])

    if(!blog) return <div>Loading...</div>
  return (
    <></>
  )
}

export default BlogDetails