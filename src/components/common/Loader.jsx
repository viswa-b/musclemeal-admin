import React from 'react'

export default function Loader({ fullPage = false }) {
  const style = fullPage ? {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '100vh', background: 'var(--bg)',
  } : {}

  return (
    <div style={style}>
      <div style={{
        width: 30, height: 30,
        border: '3px solid var(--bo)',
        borderTopColor: 'var(--P)',
        borderRadius: '50%',
        animation: 'spin .7s linear infinite',
      }}/>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}