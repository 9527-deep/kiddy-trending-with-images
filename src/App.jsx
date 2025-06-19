import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [tab, setTab] = useState('trending')
  const [data, setData] = useState([])
  const API = import.meta.env.VITE_API_BASE

  useEffect(() => {
    const endpoint = tab === 'trending' ? '/api/trending' : '/api/viral'
    axios.get(API + endpoint).then(res => setData(res.data.videos || []))
  }, [tab])

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>YouTube Kids Trending</h1>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setTab('trending')}>Trending</button>
        <button onClick={() => setTab('viral')} style={{ marginLeft: '10px' }}>Viral</button>
      </div>
      {data.map((v, i) => (
        <div key={i} style={{ marginBottom: '24px', borderBottom: '1px solid #ccc', paddingBottom: '16px' }}>
          {v.cover_url && (
            <img
              src={v.cover_url}
              alt={v.title}
              style={{ width: '100%', maxWidth: '360px', borderRadius: '8px', marginBottom: '8px' }}
            />
          )}
          <h3>{v.title}</h3>
          <p>Channel: {v.channel}</p>
          <p>Views: {v.views} Likes: {v.likes}</p>
          {v.followers && <p>Followers: {v.followers} Ratio: {Math.round(v.multiplier)}x</p>}
          <a href={v.video_url} target="_blank" rel="noreferrer">Watch</a>
        </div>
      ))}
    </div>
  )
}

export default App
